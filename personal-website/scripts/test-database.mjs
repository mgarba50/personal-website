import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";

export const ADMIN = "11111111-1111-4111-8111-111111111111";
export const BUYER = "22222222-2222-4222-8222-222222222222";
export const OTHER = "33333333-3333-4333-8333-333333333333";
export async function testDatabase() {
  const db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
    create schema auth; create schema storage;
    create table auth.users(id uuid primary key,email text);
    create table storage.buckets(id text primary key,name text,public boolean);
    create function auth.uid() returns uuid language sql stable as 'select nullif(current_setting(''request.jwt.claim.sub'',true),'''')::uuid';
    grant usage on schema public,auth to anon,authenticated,service_role;`);
  await db.exec(readFileSync("supabase/schema.sql", "utf8"));
  await db.exec(readFileSync("supabase/20261008_secure_content_storage.sql", "utf8"));
  await db.exec(readFileSync("supabase/20261030_g1_g2.sql", "utf8"));
  await db.query("insert into auth.users(id,email) values ($1,'admin@example.test'),($2,'buyer@example.test'),($3,'other@example.test')", [ADMIN,BUYER,OTHER]);
  await db.query("insert into app_user_roles(user_id,role) values($1,'admin'),($2,'buyer'),($3,'buyer')", [ADMIN,BUYER,OTHER]);
  return db;
}
export async function call(db, name, args, casts) {
  const placeholders = args.map((_, i) => `$${i+1}${casts?.[i] ? '::'+casts[i] : ''}`).join(",");
  const result = await db.query(`select public.${name}(${placeholders}) as result`, args);
  return result.rows[0].result;
}
export const orderInput = (patch = {}) => ({ request_key: randomUUID(), payload_hash: "a".repeat(64), access_hash: "b".repeat(64), user_id: BUYER, name: "Test Buyer", email: "buyer@example.test", phone: "08000000000", product_type: "book", product_slug: "the-modern-farmer", product_title: "The Modern Farmer", amount_minor: 350000, currency: "NGN", fulfilment_slugs: ["the-modern-farmer"], ...patch });

async function tests() {
  const db = await testDatabase();
  let assertions = 0;
  const ok = (v, message) => { assert(v, message); assertions++; };
  const reject = async (fn, pattern) => { await assert.rejects(fn, pattern); assertions++; };
  try {
    // Apply the additive migration twice; it must not recreate/delete existing records.
    await db.exec(readFileSync("supabase/20261030_g1_g2.sql", "utf8"));
    await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${BUYER}',false);`);
    let roles = await db.query("select role from app_user_roles");
    ok(roles.rows.length === 1 && roles.rows[0].role === "buyer", "RLS reveals only the caller's role");
    await reject(() => db.query("update app_user_roles set role='admin'"), /permission denied/);
    await reject(() => db.query("select * from manual_payment_proofs"), /permission denied/);
    await reject(() => call(db,"commerce_review_order",[randomUUID(),ADMIN,"approve","checked","BANK-1"]), /permission denied/);
    await db.exec("reset role; set role anon;");
    await reject(() => db.query("select * from commerce_orders"), /permission denied/);
    await reject(() => call(db,"commerce_create_order",[JSON.stringify(orderInput())],["jsonb"]), /permission denied/);
    await db.exec("reset role; set role service_role;");

    const input = orderInput();
    const order = await call(db,"commerce_create_order",[JSON.stringify(input)],["jsonb"]);
    const repeated = await call(db,"commerce_create_order",[JSON.stringify({...input,access_hash:"c".repeat(64)})],["jsonb"]);
    ok(order.id === repeated.id && repeated.amount_minor === 350000, "Idempotent order preserves authoritative price");
    await reject(() => call(db,"commerce_create_order",[JSON.stringify({...input,payload_hash:"d".repeat(64)})],["jsonb"]), /ORDER_CONFLICT/);
    const token = (char) => ({slug:"the-modern-farmer",path:"products/the-modern-farmer/digital-reader.pdf",token_hash:char.repeat(64)});
    await reject(() => call(db,"commerce_issue_links",[order.id,ADMIN,JSON.stringify([token("a")])],["uuid","uuid","jsonb"]), /PAYMENT_NOT_APPROVED/);
    const receipt = {amount_paid:"NGN 3,500",reference:"CUSTOMER-REF",path:order.id+"/receipt.pdf",filename:"receipt.pdf",content_type:"application/pdf",notes:"fixture"};
    await call(db,"commerce_submit_receipt",[order.id,JSON.stringify(receipt)],["uuid","jsonb"]);
    await reject(() => call(db,"commerce_submit_receipt",[order.id,JSON.stringify(receipt)],["uuid","jsonb"]), /ORDER_CLOSED/);
    await reject(() => call(db,"commerce_review_order",[order.id,BUYER,"approve","checked","BANK-1"]), /ACCESS_DENIED/);
    await reject(() => call(db,"commerce_review_order",[order.id,ADMIN,"approve","checked",null]), /ACCESS_DENIED/);
    const approved = await call(db,"commerce_review_order",[order.id,ADMIN,"approve","Bank credit matched","BANK-1"]);
    ok(approved.status === "payment_approved", "Only a reviewed receipt creates approved payment");
    await reject(() => call(db,"commerce_review_order",[order.id,ADMIN,"approve","checked","BANK-1"]), /ORDER_CLOSED/);
    await reject(() => call(db,"commerce_issue_links",[order.id,OTHER,JSON.stringify([token("a")])],["uuid","uuid","jsonb"]), /ACCESS_DENIED/);
    await call(db,"commerce_issue_links",[order.id,BUYER,JSON.stringify([token("a")])],["uuid","uuid","jsonb"]);
    ok(await call(db,"commerce_claim_download",["a".repeat(64),0]), "Approved owner can claim first link");
    ok(!await call(db,"commerce_claim_download",["a".repeat(64),0]), "A stale parallel claim loses atomically");
    ok(await call(db,"commerce_claim_download",["a".repeat(64),1]), "Second claim succeeds");
    ok(await call(db,"commerce_claim_download",["a".repeat(64),2]), "Third claim succeeds");
    ok(!await call(db,"commerce_claim_download",["a".repeat(64),3]), "Fourth claim denied");
    await call(db,"commerce_issue_links",[order.id,ADMIN,JSON.stringify([token("b")])],["uuid","uuid","jsonb"]);
    ok(!await call(db,"commerce_claim_download",["a".repeat(64),3]), "Reissue revokes old links");
    await call(db,"commerce_revoke_links",[order.id,ADMIN]);
    ok(!await call(db,"commerce_claim_download",["b".repeat(64),0]), "Explicit revocation denies access");
    await call(db,"commerce_issue_links",[order.id,ADMIN,JSON.stringify([token("c")])],["uuid","uuid","jsonb"]);
    await db.query("update download_tokens set expires_at=now()-interval '1 hour' where token_hash=$1",["c".repeat(64)]);
    ok(!await call(db,"commerce_claim_download",["c".repeat(64),0]), "Expired link denied");
    const second = await call(db,"commerce_create_order",[JSON.stringify(orderInput())],["jsonb"]);
    await call(db,"commerce_submit_receipt",[second.id,JSON.stringify({...receipt,path:second.id+"/receipt.pdf"})],["uuid","jsonb"]);
    await reject(() => call(db,"commerce_review_order",[second.id,ADMIN,"approve","checked","BANK-1"]), /PAYMENT_REFERENCE_USED/);
    const rejected = await call(db,"commerce_review_order",[second.id,ADMIN,"reject","No bank credit",null]);
    ok(rejected.status === "rejected", "Rejected receipt grants no access");
    await reject(() => call(db,"commerce_issue_links",[second.id,ADMIN,JSON.stringify([token("d")])],["uuid","uuid","jsonb"]), /PAYMENT_NOT_APPROVED/);
    for(let i=0;i<3;i++) await call(db,"commerce_rate_limit",["fixture-rate",3]);
    await reject(() => call(db,"commerce_rate_limit",["fixture-rate",3]), /RATE_LIMITED/);
    await db.exec("reset role;");
    const buckets = await db.query("select public from storage.buckets");
    ok(buckets.rows.length === 4 && buckets.rows.every(b=>b.public===false), "All four protected buckets stay private");
    const proof = await db.query("select status from manual_payment_proofs where commerce_order_id=$1",[order.id]);
    ok(proof.rows[0].status === "payment_approved", "Receipt and order approval agree");
    console.log(`Database checks passed: ${assertions} assertions using executed PostgreSQL migrations, RLS and transaction functions.`);
  } finally { await db.close(); }
}
if (process.argv[1]?.endsWith("test-database.mjs")) await tests();
