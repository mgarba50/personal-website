import { readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const [rootArg] = process.argv.slice(2);

if (!rootArg) {
  throw new Error(
    'Usage: node --env-file=.env.local scripts/upload-secure-assets.mjs "<secure-staging-vault-path>"',
  );
}

const root = path.resolve(rootArg);

const manifest = JSON.parse(
  await readFile(
    path.join(root, "secure-upload-manifest.json"),
    "utf8",
  ),
);

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");

const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !key) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
  );
}

function encodeObjectPath(value) {
  return value
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function isSafeSegment(segment) {
  return /^[A-Za-z0-9._() -]+$/.test(segment);
}

function safeArchiveObjectPath(objectPath, asset) {
  /*
   * Commercial product paths and lead magnets are already canonical
   * and must remain unchanged.
   *
   * Only archival source-vault filenames need sanitization.
   */
  if (asset.bucket !== "source-vault") {
    return objectPath;
  }

  const parts = objectPath.replace(/\\/g, "/").split("/");

  return parts
    .map((segment, index) => {
      if (isSafeSegment(segment)) {
        return segment;
      }

      const ext = path.extname(segment).toLowerCase();
      const hash = crypto
        .createHash("sha256")
        .update(segment, "utf8")
        .digest("hex")
        .slice(0, 20);

      const isLast = index === parts.length - 1;

      return isLast
        ? `archive-${hash}${ext}`
        : `folder-${hash}`;
    })
    .join("/");
}

let uploaded = 0;
let renamed = 0;

for (const asset of manifest.assets) {
  const bytes = await readFile(path.join(root, asset.local));

  const originalObjectPath = asset.object;
  const objectPath = safeArchiveObjectPath(
    originalObjectPath,
    asset,
  );

  if (objectPath !== originalObjectPath) {
    renamed += 1;

    console.log(
      `SAFE KEY: ${originalObjectPath}`,
    );

    console.log(
      `       -> ${objectPath}`,
    );
  }

  const url =
    `${supabaseUrl}/storage/v1/object/` +
    `${encodeURIComponent(asset.bucket)}/` +
    encodeObjectPath(objectPath);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/octet-stream",
      "x-upsert": "true",
    },
    body: bytes,
  });

  if (!response.ok) {
    throw new Error(
      `Upload failed for ${asset.local}: ` +
      `${response.status} ${await response.text()}`,
    );
  }

  uploaded += 1;

  console.log(
    `[${uploaded}/${manifest.assets.length}] ` +
    `${asset.bucket}/${objectPath}`,
  );
}

console.log("");
console.log(
  `Secure upload complete: ${uploaded} objects.`,
);
console.log(
  `Archive names sanitized: ${renamed}.`,
);