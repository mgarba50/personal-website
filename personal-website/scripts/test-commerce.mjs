import assert from "node:assert/strict";
import { Module } from "node:module";
import { randomUUID } from "node:crypto";
import { testDatabase, ADMIN, BUYER, OTHER } from "./test-database.mjs";
import { loadRegistry } from "./load-registry.mjs";

process.env.NEXT_PUBLIC_SUPABASE_URL = "https://database.invalid";
process.env.NEXT_PUBLIC_SITE_URL = "https://www.musaallama.com";
process.env.SUPABASE_SERVICE_ROLE_KEY = "fixture-service-key";
process.env.COMMERCE_ENABLED = "true";
process.env.EMAIL_PROVIDER = "resend";
process.env.RESEND_API_KEY = "fixture-no-real-mail";
const db = await testDatabase();
await db.exec("set role service_role");
const originalLoad = Module._load, originalFetch = globalThis.fetch;
let user = null, jar = new Map(), sent = [], mailAccepted = true, badSignedUrl = false, assertions = 0;
const storage = new Map();
const client = {
  auth: { getUser: async () => ({ data: { user }, error: null }) },
  from: () => ({ select: () => ({ eq: (_, id) => ({ maybeSingle: async () => ({ data: (await db.query("select role from app_user_roles where user_id=$1",[id])).rows[0] || null, error: null }) }) }) }),
};
Module._load = function(name, ...args) {
  if(name === "server-only") return {};
  if(name === "next/headers") return { cookies: async () => ({ get: key => jar.has(key) ? {value:jar.get(key)} : undefined }) };
  if(name.endsWith("/lib/supabase-server")) return { serverSupabase: async () => client };
  return originalLoad.call(this,name,...args);
};
globalThis.fetch = async (input, options={}) => {
  const url = new URL(String(input));
  if(url.origin === "https://api.resend.com") { sent.push(JSON.parse(options.body)); return Response.json(mailAccepted?{id:"fixture-mail-id"}:{message:"fixture outage"},{status:mailAccepted?200:503}); }
  assert.equal(url.origin,"https://database.invalid","Tests must never call a real service");
  try {
    if(url.pathname.startsWith("/rest/v1/rpc/")) {
      const name=url.pathname.split("/").pop(); assert.match(name,/^commerce_[a-z_]+$/);
      const values=JSON.parse(options.body), keys=Object.keys(values);
      const params=keys.map((key,i)=>`${key}=>$${i+1}${["p_order","p_receipt","p_links"].includes(key)?"::jsonb":""}`);
      const args=keys.map(key=>["p_order","p_receipt","p_links"].includes(key)?JSON.stringify(values[key]):values[key]);
      return Response.json((await db.query(`select ${name}(${params.join(",")}) as result`,args)).rows[0].result);
    }
    if(url.pathname.startsWith("/rest/v1/")) {
      const table=url.pathname.split("/").pop(); assert(["commerce_orders","manual_payment_proofs","download_tokens"].includes(table));
      let columns=url.searchParams.get("select") || "*"; assert(columns==="*" || /^[a-z_,]+$/.test(columns));
      const conditions=[],args=[];
      for(const [key,value] of url.searchParams) if(value.startsWith("eq.")) { assert.match(key,/^[a-z_]+$/);args.push(value.slice(3));conditions.push(`${key}::text=$${args.length}`); }
      return Response.json((await db.query(`select ${columns} from ${table}${conditions.length?" where "+conditions.join(" and "):""} limit 100`,args)).rows);
    }
    if(url.pathname.startsWith("/storage/v1/object/sign/")) return Response.json({signedURL:badSignedUrl?"https://unexpected.invalid/file.pdf":url.pathname.replace("/storage/v1","")+"?token=short-lived-fixture"});
    if(options.method === "DELETE") { for(const prefix of JSON.parse(options.body).prefixes) for(const key of storage.keys()) if(key.endsWith(prefix)) storage.delete(key);return Response.json({}); }
    if(url.pathname.startsWith("/storage/v1/object/") && options.method === "POST") { storage.set(url.pathname,options.body);return Response.json({}); }
    throw new Error("Unexpected mocked service path: "+url.pathname);
  } catch(error) { return Response.json({message:error.message},{status:400}); }
};
const actor = id => ({id,email:id===ADMIN?"admin@example.test":id===BUYER?"buyer@example.test":"other@example.test",email_confirmed_at:new Date().toISOString(),user_metadata:{name:"Fixture",role:"admin"}});
const base="https://www.musaallama.com";
const request = (path,body,origin=base) => new Request(base+path,{method:"POST",headers:{...(origin?{Origin:origin}:{}),...(body instanceof FormData?{}:{"Content-Type":"application/json"})},body:body instanceof FormData?body:JSON.stringify(body)});
const equal = (a,b,message) => {assert.equal(a,b,message);assertions++;};
try {
  const auth=loadRegistry("lib/auth.ts"), security=loadRegistry("lib/request-security.ts"), checkout=loadRegistry("lib/checkout.ts"), returns=loadRegistry("lib/auth-config.ts");
  const orders=loadRegistry("app/api/orders/route.ts"), receipts=loadRegistry("app/api/manual-payment/route.ts"), download=loadRegistry("app/api/download/[token]/route.ts"), review=loadRegistry("app/api/admin/orders/[id]/route.ts"), customer=loadRegistry("app/api/customer/orders/[id]/downloads/route.ts"), receiptGet=loadRegistry("app/api/admin/receipts/[id]/route.ts");
  equal(await auth.getCurrentUser(),null);
  user=actor(BUYER); equal((await auth.getCurrentUser()).role,"buyer","Metadata cannot grant admin");
  user.email_confirmed_at=null; equal(await auth.getCurrentUser(),null,"Unconfirmed email has no authenticated account access");
  user=actor(ADMIN); equal((await auth.getCurrentUser()).role,"admin");
  for(const value of ["https://evil.invalid","//evil.invalid","/\\evil.invalid","/api/delete","/admin/../auth/callback"]) equal(returns.safeReturnPath(value),"/dashboard");
  equal(returns.safeReturnPath("/admin/orders/123"),"/admin/orders/123");
  for(const [type,slug] of [["unknown","the-modern-farmer"],["book","missing"],["book","the-desert-ceo"],["course","chinese-for-importers"],["membership","gold-circle"],["bundle","agro-starter-bundle"]]) equal(checkout.findCheckoutProduct(type,slug).purchasable,false);
  equal(checkout.findCheckoutProduct("book","the-modern-farmer").amountMinor,350000);
  equal(checkout.moneyMinor("-2"),null); equal(checkout.moneyMinor("1.001"),null);
  await assert.rejects(()=>security.limitedBody(request("/api/orders",{big:"x".repeat(1000)}),20),error=>error.status===413); assertions++;
  user=actor(BUYER);
  const input={type:"book",slug:"the-modern-farmer",requestKey:randomUUID(),name:"Fixture Buyer",email:"forged@example.test",phone:"08000000000",amount:"NGN 1",role:"admin"};
  equal((await orders.POST(request("/api/orders",input,"https://evil.invalid"))).status,403);
  delete process.env.COMMERCE_ENABLED; equal((await orders.POST(request("/api/orders",input))).status,503);process.env.COMMERCE_ENABLED="true";
  for(const patch of [{type:"unknown"},{slug:"missing"},{slug:"the-desert-ceo"}]) equal((await orders.POST(request("/api/orders",{...input,...patch}))).status,409);
  const created=await orders.POST(request("/api/orders",input)); equal(created.status,200);
  const order=(await created.json()).order;
  equal(order.amount,"NGN 3,500","Client amount is ignored");
  const cookie=created.headers.get("set-cookie").match(/ma_checkout=([^;]+)/)[1]; jar.set("ma_checkout",decodeURIComponent(cookie));
  assert.match(created.headers.get("set-cookie"),/HttpOnly/i);assertions++;
  equal((await orders.GET()).status,200);
  const stored=(await db.query("select * from commerce_orders where id=$1",[order.id])).rows[0];
  equal(stored.email,"buyer@example.test","Verified account email is authoritative");
  equal(stored.status,"pending_payment");
  const repeated=await orders.POST(request("/api/orders",input)); equal((await repeated.json()).order.id,order.id);
  jar.set("ma_checkout",decodeURIComponent(repeated.headers.get("set-cookie").match(/ma_checkout=([^;]+)/)[1]));
  user=actor(OTHER);equal((await orders.GET()).status,403);user=actor(BUYER);
  const receiptForm=(file=new File(["%PDF-fixture"],"receipt.pdf",{type:"application/pdf"}))=>{const f=new FormData();f.set("reference","CUSTOMER-REF");f.set("amountPaid","3500");f.set("notes","fixture only");f.set("receipt",file);return f;};
  equal((await receipts.POST(request("/api/manual-payment",receiptForm(new File(["bad"],"bad.pdf",{type:"application/pdf"}))))).status,400);
  equal((await receipts.POST(request("/api/manual-payment",receiptForm(new File([new Uint8Array(4*1024*1024+1)],"large.pdf",{type:"application/pdf"}))))).status,400);
  equal((await receipts.POST(request("/api/manual-payment",receiptForm()))).status,200);
  equal((await receipts.POST(request("/api/manual-payment",receiptForm()))).status,409);
  const proof=(await db.query("select * from manual_payment_proofs where commerce_order_id=$1",[order.id])).rows[0];
  equal(proof.status,"payment_submitted");equal(storage.size,1);
  const reviewRequest=(action,patch={})=>{const f=new FormData();for(const [k,v] of Object.entries({action,note:"Actual bank credit checked",bankVerified:"yes",bankReference:"BANK-FIXTURE-1",verifiedAmount:"3500",...patch}))f.set(k,v);return request(`/api/admin/orders/${order.id}`,f);};
  const context={params:Promise.resolve({id:order.id})};
  user=null;equal((await review.POST(reviewRequest("approve"),context)).status,401);
  user=actor(BUYER);equal((await review.POST(reviewRequest("approve"),context)).status,403);
  equal((await customer.POST(request("/api/customer/orders/x/downloads",{}),context)).status,409);
  user=actor(ADMIN);
  equal((await review.POST(reviewRequest("approve",{bankVerified:"no"}),context)).status,400);
  equal((await review.POST(reviewRequest("approve",{verifiedAmount:"1"}),context)).status,400);
  equal((await review.POST(reviewRequest("approve"),context)).status,303);equal(sent.length,1);
  equal((await review.POST(reviewRequest("approve"),context)).status,409);equal(sent.length,1);
  const token=sent[0].text.match(/\/api\/download\/([A-Za-z0-9_-]{43})/)[1];
  const get=(t=token)=>download.GET(new Request(base+"/api/download/"+t),{params:Promise.resolve({token:t})});
  equal((await get("bad")).status,404);
  badSignedUrl=true;equal((await get()).status,503);
  equal((await db.query("select download_count from download_tokens where commerce_order_id=$1",[order.id])).rows[0].download_count,0,"Invalid storage response must not consume a download");badSignedUrl=false;
  for(let i=0;i<3;i++){const response=await get();equal(response.status,303);assert.match(response.headers.get("location"),/^https:\/\/database.invalid\/storage\/v1\/object\/sign\//);assert.match(response.headers.get("cache-control"),/no-store/);assertions+=2;}
  equal((await get()).status,410);
  user=actor(OTHER);equal((await customer.POST(request("/api/customer/orders/x/downloads",{}),context)).status,403);
  user=actor(BUYER);const own=await customer.POST(request("/api/customer/orders/x/downloads",{}),context);equal(own.status,200);const ownToken=(await own.json()).links[0].href.split("/").pop();
  equal((await get(token)).status,410);equal((await get(ownToken)).status,303);
  user=actor(ADMIN);mailAccepted=false;equal((await review.POST(reviewRequest("resend"),context)).status,303);
  const failed=(await db.query("select delivery_status from commerce_orders where id=$1",[order.id])).rows[0];equal(failed.delivery_status,"failed");
  equal((await review.POST(reviewRequest("revoke"),context)).status,303);
  const receiptCtx={params:Promise.resolve({id:proof.id})};equal((await receiptGet.GET(new Request(base),receiptCtx)).status,303);
  user=actor(BUYER);equal((await receiptGet.GET(new Request(base),receiptCtx)).status,403);
  console.log(`Commerce and access checks passed: ${assertions} assertions; real PostgreSQL state behind mocked Auth, private storage and sender boundaries. No real email sent.`);
} finally { globalThis.fetch=originalFetch;Module._load=originalLoad;await db.close(); }
