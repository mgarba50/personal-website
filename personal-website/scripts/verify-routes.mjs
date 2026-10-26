import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const routePages = [
  "app/academy/page.tsx",
  "app/academy/[topic]/page.tsx",
  "app/academy/[topic]/[slug]/page.tsx",
  "app/corporate/page.tsx",
  "app/corporate/services/[slug]/page.tsx",
  "app/inner-circle/page.tsx",
  "app/inner-circle/[collection]/page.tsx",
  "app/inner-circle/[collection]/[slug]/page.tsx",
  "app/inner-circle/diwan/page.tsx",
  "app/checkout/page.tsx",
];

const errors = [];
for (const path of routePages) {
  try {
    await access(path, constants.R_OK);
  } catch {
    errors.push("Missing institutional route page: " + path);
  }
}

const config = await readFile("next.config.ts", "utf8");
const redirects = [...config.matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)];
const coveredByApp = (path) => {
  if (path === "/academy" || path === "/corporate" || path === "/inner-circle") return true;
  if (path === "/inner-circle/diwan") return true;
  if (/^\/academy\/[^/]+\/[^/]+$/.test(path)) return true;
  if (/^\/academy\/[^/]+$/.test(path)) return true;
  if (/^\/corporate\/services\/[^/]+$/.test(path)) return true;
  if (/^\/inner-circle\/(writings|research|diwan)\/[^/]+$/.test(path)) return true;
  return false;
};

for (const [, source, destination] of redirects) {
  const destinationIsCoveredWing = destination.startsWith("/academy/") ||
    destination.startsWith("/corporate/services/") ||
    destination.startsWith("/inner-circle/");
  if (destinationIsCoveredWing && !coveredByApp(destination)) {
    errors.push("Redirect destination requires route review: " + source + " -> " + destination);
  }
}

const academy = await readFile("app/academy/page.tsx", "utf8");
const inner = await readFile("app/inner-circle/page.tsx", "utf8");
const corporate = await readFile("app/corporate/page.tsx", "utf8");
if (!academy.includes('href={\`/academy/\${topic.slug}\`}')) {
  errors.push("Academy topic link binding changed: review route checks");
}
if (!inner.includes('href={\`/inner-circle/\${collection.slug}\`}')) {
  errors.push("Inner Circle collection link binding changed: review route checks");
}
if (!corporate.includes('href={\`/corporate/services/\${service.slug}\`}')) {
  errors.push("Corporate service link binding changed: review route checks");
}

if (errors.length) {
  console.error("Institutional route verification failed:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("Institutional route coverage verified: Academy, Corporate services, Inner Circle and Diwan.");
