import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { loadRegistry } from "./load-registry.mjs";

const { academyProducts: products, academyTopics: topics } = loadRegistry("content/academy.ts");
const { innerEntries, innerCollections } = loadRegistry("content/inner-circle.ts");
const { diwanEntries } = loadRegistry("content/diwan.ts");
const { corporateServices } = loadRegistry("content/corporate.ts");
const { diwanCanon } = loadRegistry("lib/diwan-canon.ts");
const { books } = loadRegistry("lib/canon-books.ts");
const content = loadRegistry("lib/content.ts");
const { findCheckoutProduct, canPurchaseBook } = loadRegistry("lib/checkout.ts");
const config = loadRegistry("next.config.ts").default;
const redirects = await config.redirects();
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const pages = walk("app").filter((f) => f.endsWith("page.tsx"));
const routes = new Set(pages.filter((f) => !f.includes("[")).map((f) => "/" + f.replaceAll("\\", "/").replace(/^app\//, "").replace(/\/?page.tsx$/, "")));
const add = (prefix, entries) => entries.forEach((e) => routes.add(`${prefix}/${e.slug}`));
add("/academy", topics);
products.forEach((p) => routes.add(`/academy/${p.topicSlug}/${p.slug}`));
add("/corporate/services", corporateServices);
add("/inner-circle", innerCollections);
innerEntries.forEach((e) => routes.add(`/inner-circle/${e.collectionSlug}/${e.slug}`));
add("/inner-circle/diwan", diwanEntries); add("/al-maqam", diwanCanon); add("/books", books);
for (const [prefix, entries] of [["/courses", content.courses], ["/advisory", content.advisoryServices], ["/membership", content.membershipTiers], ["/library", content.articles ?? []]]) add(prefix, entries);
const errors = [];
function check(href, source) {
  if (!href?.startsWith("/") || href.startsWith("//") || href.includes("${") || href.includes(":path")) return;
  const pathname = href.split(/[?#]/)[0];
  if (existsSync("public" + pathname) || existsSync("app" + pathname) || routes.has(pathname)) return;
  const redirect = redirects.find((r) => r.source === pathname);
  if (redirect && routes.has(redirect.destination)) return;
  if (pathname.startsWith("/api/")) return;
  errors.push(`${source}: unresolved ${href}`);
}
for (const r of redirects.filter((r) => !r.source.includes(":"))) {
  if (!routes.has(r.destination)) errors.push(`Redirect ${r.source} -> ${r.destination} is unregistered`);
}
for (const p of products) {
  assert(topics.some((t) => t.slug === p.topicSlug), `Unknown topic for ${p.slug}`);
  assert(!p.purchasable || canPurchaseBook(p), `Unreleased book offered for payment: ${p.slug}`);
  if (p.coverImage) check(p.coverImage, p.slug);
  for (const slug of p.relatedProductSlugs ?? []) assert(products.some((p) => p.slug === slug), `Unknown related product ${slug}`);
  assert.equal(findCheckoutProduct("book", p.slug).purchasable, canPurchaseBook(p));
}
for (const b of books) check(`/books/${b.slug}`, "Book registry");
for (const e of innerEntries) if (e.coverImage) check(e.coverImage, e.slug);
for (const file of [...walk("app"), ...walk("components"), ...walk("content"), ...walk("lib")].filter((f) => /\.(tsx?|css)$/.test(f))) {
  const source = readFileSync(file, "utf8");
  for (const m of source.matchAll(/(?:href|src|coverImage|previewHref|image|url)\s*(?:[:=]\s*\{?\s*)["'](\/[^"']+)["']/g)) {
    if (!source.slice(m.index + m[0].length).trimStart().startsWith("+")) check(m[1], file);
  }
  for (const m of source.matchAll(/["'](\/(?:assets|images)\/[^"']+)["']/g)) check(m[1], file);
}
const sitemap = loadRegistry("app/sitemap.ts").default();
assert.equal(new Set(sitemap.map((s) => s.url)).size, sitemap.length, "Duplicate sitemap URL");
for (const entry of sitemap) {
  const pathname = new URL(entry.url).pathname;
  check(pathname, "sitemap");
  assert(!redirects.some((r) => r.source === pathname), `Redirect indexed in sitemap: ${pathname}`);
}
assert.equal(findCheckoutProduct("unknown", "the-modern-farmer").purchasable, false);
assert.equal(findCheckoutProduct("book", "missing").purchasable, false);
assert.equal(canPurchaseBook({ ...products[0], releaseStatus: "candidate" }), false);
assert.equal(findCheckoutProduct("book", "the-desert-ceo").purchasable, false);
assert(existsSync("app/api/download/[token]/route.ts"), "Issued download route missing");
if (errors.length) { console.error([...new Set(errors)].join("\n")); process.exit(1); }
console.log(`Site verified: ${routes.size} registered routes, ${books.length} books, ${sitemap.length} sitemap URLs, asset references and checkout release restrictions.`);
