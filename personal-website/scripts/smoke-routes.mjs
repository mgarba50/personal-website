import assert from "node:assert/strict";

// GET-only crawl: exercise the compiled pages, published sitemap, legacy links,
// and referenced covers. Never submit forms or follow external destinations.
const base = new URL(process.argv[2] ?? "http://127.0.0.1:3100");
const siteOrigins = new Set([base.origin, "https://musaallama.com", "https://www.musaallama.com"]);
const queue = [];
const seen = new Set();
const canonicalPaths = new Set();
const failures = [];
const counts = { pages: 0, assets: 0, redirects: 0, unknownSlugs: 0 };
const unescapeUrl = (value) => value.replaceAll("&amp;", "&");

function enqueue(href) {
  if (!href || href.startsWith("#")) return;
  const url = new URL(unescapeUrl(href), base);
  if (!siteOrigins.has(url.origin) || url.pathname.startsWith("/api/")) return;
  if (url.pathname === "/_next/image") {
    enqueue(url.searchParams.get("url"));
    return;
  }
  if (url.pathname.startsWith("/_next/")) return;
  const pathname = url.pathname + url.search;
  if (!seen.has(pathname)) {
    seen.add(pathname);
    queue.push(pathname);
  }
}

async function request(pathname) {
  const response = await fetch(new URL(pathname, base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${pathname}: HTTP ${response.status}`);
  const finalPath = new URL(response.url).pathname;
  if (canonicalPaths.has(pathname)) assert.equal(finalPath, pathname, `${pathname}: sitemap URL redirects to ${finalPath}`);
  if (finalPath !== new URL(pathname, base).pathname) counts.redirects++;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) {
    counts.assets++;
    await response.body?.cancel();
    return;
  }
  counts.pages++;
  // Next.js serializes its not-found boundary in script data on healthy pages.
  // Inspect rendered markup so that dormant fallback is not a false positive.
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert(!html.includes("This route is outside the headquarters"), `${pathname}: branded 404 returned as success`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) enqueue(match[1]);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) enqueue(match[1]);
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", base), { signal: AbortSignal.timeout(30000) });
assert.equal(sitemapResponse.status, 200, "Sitemap must be available");
const sitemap = await sitemapResponse.text();
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(unescapeUrl(match[1]));
  canonicalPaths.add(url.pathname);
  enqueue(url.pathname);
}
assert(canonicalPaths.size > 0, "Sitemap must contain public routes");
for (const pathname of ["/", "/academy", "/corporate", "/inner-circle", "/al-maqam", "/contact", "/books/the-modern-farmer", "/books/agrochemical-sales-field-guide", "/books/chinese-for-agrochemical-professionals", "/books/the-desert-ceo"]) enqueue(pathname);

while (queue.length) {
  assert(seen.size <= 600, "Crawl exceeded 600 unique internal destinations");
  await Promise.all(queue.splice(0, 6).map(async (pathname) => {
    try { await request(pathname); }
    catch (error) { failures.push(error.message); }
  }));
}

for (const pathname of ["/academy/not-a-topic", "/academy/agriculture-development/not-a-book", "/academy/leadership-strategy/agrochemical-sales-field-guide", "/corporate/services/not-a-service", "/inner-circle/not-a-collection", "/inner-circle/writings/not-a-work", "/inner-circle/diwan/not-a-diwan"]) {
  const response = await fetch(new URL(pathname, base), { signal: AbortSignal.timeout(30000) });
  if (response.status !== 404) failures.push(`${pathname}: expected 404, received ${response.status}`);
  counts.unknownSlugs++;
  await response.body?.cancel();
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(JSON.stringify({ base: base.origin, sitemapRoutes: canonicalPaths.size, ...counts, failures: failures.length }));
  process.exit(1);
}
console.log(JSON.stringify({ base: base.origin, sitemapRoutes: canonicalPaths.size, ...counts, failures: 0 }));
