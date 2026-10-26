import assert from "node:assert/strict";
import { loadRegistry } from "./load-registry.mjs";

process.env.NEXT_PUBLIC_SUPABASE_URL = "https://commerce-test.invalid";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-only";
const { POST } = loadRegistry("app/api/manual-payment/route.ts");
const { GET } = loadRegistry("app/api/download/[token]/route.ts");
const originalFetch = globalThis.fetch;
let calls = [];
let record;
let claim = true;
globalThis.fetch = async (url, options = {}) => {
  calls.push({ url: String(url), options });
  if (String(url).includes("/storage/v1/object/authenticated/")) return new Response("%PDF-test");
  if (String(url).includes("/storage/")) return Response.json({});
  if (options.method === "PATCH") return Response.json(claim ? [record] : []);
  if (options.method === "POST") return Response.json({});
  return Response.json(record ? [record] : []);
};
const payment = (overrides = {}, receipt = new File(["%PDF-test"], "receipt.pdf", { type: "application/pdf" })) => {
  const data = new FormData();
  for (const [key, value] of Object.entries({ type: "book", slug: "the-modern-farmer", product: "The Modern Farmer", amountPaid: "NGN 3,500", orderNumber: "MA-BO-THE-TEST123", name: "Test Buyer", email: "test@example.com", phone: "123456789", reference: "TEST-REFERENCE", ...overrides })) data.set(key, value);
  data.set("receipt", receipt);
  return new Request("https://musaallama.com/api/manual-payment", { method: "POST", body: data });
};
try {
  for (const input of [{ type: "unknown" }, { slug: "missing" }, { slug: "the-desert-ceo" }, { amountPaid: "NGN 1" }, { product: "Other book" }]) {
    calls = [];
    assert.equal((await POST(payment(input))).status, 409);
    assert.equal(calls.length, 0, "Rejected payment must not reach storage");
  }
  assert.equal((await POST(payment({}, new File(["<html>bad</html>"], "receipt.pdf", { type: "application/pdf" })))).status, 400);
  assert.equal((await POST(payment({}, new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.pdf", { type: "application/pdf" })))).status, 400);
  assert.equal((await POST(payment())).status, 200);
  const saved = JSON.parse(calls.find((c) => c.url.includes("manual_payment_proofs")).options.body);
  assert.equal(saved.amount_paid, "NGN 3,500"); assert.equal(saved.status, "payment_submitted");
  const token = "x".repeat(43);
  const get = (value = token) => GET(new Request("https://musaallama.com/api/download/" + value), { params: Promise.resolve({ token: value }) });
  assert.equal((await get("bad")).status, 404);
  const valid = { product_slug: "the-modern-farmer", storage_path: "products/the-modern-farmer/digital-reader.pdf", expires_at: new Date(Date.now() + 60000).toISOString(), revoked_at: null, download_count: 0, max_downloads: 3 };
  for (const patch of [{ expires_at: "invalid" }, { expires_at: "2000-01-01" }, { revoked_at: "2026-01-01" }, { download_count: 3 }]) {
    record = { ...valid, ...patch }; assert.equal((await get()).status, 410);
  }
  record = { ...valid, storage_path: "source-vault/private.pdf" }; assert.equal((await get()).status, 403);
  record = valid; claim = false; assert.equal((await get()).status, 409);
  claim = true; calls = [];
  const response = await get(); assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /no-store/);
  assert.match(response.headers.get("content-disposition"), /attachment/);
  assert.equal(await response.text(), "%PDF-test");
  const update = calls.find((c) => c.options.method === "PATCH");
  assert.equal(new URL(update.url).searchParams.get("download_count"), "eq.0");
  assert.equal(new URL(update.url).searchParams.get("max_downloads"), "gt.0");
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  assert.equal((await get()).status, 503);
  console.log("Commerce regression checks passed: release gates, forged prices/products, receipt validation, pending review, token expiry/revocation/limits, storage binding, concurrent claims, private delivery and missing configuration.");
} finally { globalThis.fetch = originalFetch; }
