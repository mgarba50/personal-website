import assert from "node:assert/strict";
import { loadRegistry } from "./load-registry.mjs";

const base = process.argv[2] ?? "http://127.0.0.1:3100";
const sitemap = loadRegistry("app/sitemap.ts").default();
const { books } = loadRegistry("lib/canon-books.ts");
const urls = [...new Set(["/", "/academy", "/corporate", "/inner-circle", "/al-maqam", ...sitemap.map((e) => new URL(e.url).pathname), ...books.map((b) => `/books/${b.slug}`)])];
const errors = [];
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < urls.length) {
    const url = urls[next++];
    const response = await fetch(base + url, { signal: AbortSignal.timeout(30000) });
    const html = await response.text();
    if (response.status !== 200 || !html.includes("<h1")) errors.push(`${url}: ${response.status}, heading=${html.includes("<h1")}`);
  }
}));
for (const url of ["/academy/missing", "/academy/leadership-strategy/missing", "/inner-circle/writings/missing", "/corporate/services/missing", "/al-maqam/missing"]) assert.equal((await fetch(base + url)).status, 404, url);
const released = await (await fetch(base + "/checkout?type=book&slug=the-modern-farmer")).text();
assert(released.includes("Submit payment proof") && released.includes("NGN 3,500"));
for (const slug of ["the-desert-ceo", "missing"]) {
  const html = await (await fetch(base + `/checkout?type=book&slug=${slug}`)).text();
  assert(!html.includes("Submit payment proof") && !html.includes("2083408157"), `Payment enabled for ${slug}`);
}
assert.equal((await fetch(base + "/api/download/invalid")).status, 404);
if (errors.length) throw new Error(errors.join("\n"));
console.log(`Production smoke checks passed: ${urls.length} public/legacy routes, unknown-slug 404s, released/unreleased checkout and invalid download tokens.`);
