import { createHash, randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";

const [slug, email, orderNumber, hoursArg = "72"] = process.argv.slice(2);

if (!slug || !email || !orderNumber) {
  throw new Error(
    'Usage: node --env-file=.env.local scripts/issue-download-token.mjs <product-slug> <customer-email> <order-number> [hours]',
  );
}

const manifest = JSON.parse(
  await readFile(new URL("../secure-download-manifest.json", import.meta.url), "utf8"),
);

const storagePath = manifest.products[slug];

if (!storagePath) {
  throw new Error(`No secure delivery object is registered for "${slug}".`);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://musaallama.com").replace(/\/$/, "");

if (!supabaseUrl || !key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
  );
}

const hours = Math.max(1, Number(hoursArg) || 72);
const token = randomBytes(32).toString("base64url");
const tokenHash = createHash("sha256").update(token).digest("hex");
const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

const response = await fetch(`${supabaseUrl}/rest/v1/download_tokens`, {
  method: "POST",
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  },
  body: JSON.stringify({
    token_hash: tokenHash,
    product_slug: slug,
    customer_email: email,
    order_number: orderNumber,
    storage_path: storagePath,
    expires_at: expiresAt,
    max_downloads: 3,
    download_count: 0,
  }),
});

if (!response.ok) {
  throw new Error(await response.text());
}

console.log("Secure link created:");
console.log(`${siteUrl}/api/download/${token}`);
console.log(`Expires: ${expiresAt}`);
console.log("Maximum downloads: 3");
