import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import process from "node:process";

const requiredFiles = [
  "app/al-maqam/page.tsx",
  "app/al-maqam/[slug]/page.tsx",
  "app/al-maqam/archive/page.tsx",
  "app/books/diwan-al-zill-al-mutaman/page.tsx",
  "app/books/diwan-al-hayat/page.tsx",
  "public/assets/al-maqam/diwan-al-zill-al-mutaman/cover.webp",
  "public/assets/al-maqam/diwan-al-zill-al-mutaman/preview.html",
  "lib/diwan-canon.ts",
  "next.config.ts",
];

const recoveredBookCoverFiles = [
  "public/assets/books/the-desert-ceo/cover.webp",
  "public/assets/books/the-five-language-ceo/cover.webp",
  "public/assets/books/the-strategist-of-power/cover.webp",
  "public/assets/books/a-multilingual-mind/cover.webp",
  "public/assets/books/cheating-time/cover.webp",
  "public/assets/books/the-illusion-of-control/cover.webp",
  "public/assets/books/knowledge-is-seed/cover.webp",
  "public/assets/books/the-allama-economy/cover.webp",
  "public/assets/books/the-climate-resilient-farmer/cover.webp",
  "public/assets/books/the-entrepreneurial-polyglot/cover.webp",
];

const failures = [];

for (const file of [...requiredFiles, ...recoveredBookCoverFiles]) {
  try {
    await access(file, constants.R_OK);
  } catch {
    failures.push(`Missing required publication file: ${file}`);
  }
}

try {
  await access("public/assets/books/diwan-al-zill-al-mutaman", constants.F_OK);
  failures.push(
    "Canonical Zill assets must not live under public/assets/books/diwan-al-zill-al-mutaman",
  );
} catch {
  // Expected: canonical assets belong only under public/assets/al-maqam/.
}

const nextConfig = await readFile("next.config.ts", "utf8");
if (!nextConfig.includes('/assets/books/diwan-al-zill-al-mutaman/:path*')) {
  failures.push("Missing legacy Zill asset redirect source in next.config.ts");
}
if (!nextConfig.includes('/assets/al-maqam/diwan-al-zill-al-mutaman/:path*')) {
  failures.push("Missing canonical Zill asset redirect destination in next.config.ts");
}

const zillLegacyRoute = await readFile(
  "app/books/diwan-al-zill-al-mutaman/page.tsx",
  "utf8",
);
if (!zillLegacyRoute.includes('redirect("/al-maqam/diwan-al-zill-al-mutaman")')) {
  failures.push("Legacy Zill book route does not redirect to its Al-Maqam canonical page");
}

const hayatLegacyRoute = await readFile("app/books/diwan-al-hayat/page.tsx", "utf8");
if (!hayatLegacyRoute.includes('redirect("/al-maqam")')) {
  failures.push("Legacy Diwan al-Hayat route does not redirect into Al-Maqam");
}

const canon = await readFile("lib/diwan-canon.ts", "utf8");
if (!canon.includes('"ديوان الظِّلِّ المُؤتَمَن", "diwan-al-zill-al-mutaman"')) {
  failures.push("Canonical Arabic Zill identity is missing from lib/diwan-canon.ts");
}
if (!canon.includes('previewHref: "/assets/al-maqam/diwan-al-zill-al-mutaman/preview.html"')) {
  failures.push("Zill preview is not bound to the Al-Maqam asset namespace");
}
if (!canon.includes('canonId: "DIW-EXT-001"') || !canon.includes('canonId: "DIW-EXT-002"')) {
  failures.push("Extended Diwan Canon records are missing");
}

if (failures.length > 0) {
  console.error("Publication integrity verification failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Publication integrity verified: Al-Maqam ownership, legacy routes, Zill asset aliases, Canon bindings, and ${recoveredBookCoverFiles.length} recovered book covers are consistent.`,
);
