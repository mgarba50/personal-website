type InsertResult =
  | { ok: true }
  | { ok: false; skipped: true; message: string }
  | { ok: false; skipped?: false; message: string };

type UploadResult =
  | { ok: true; path: string }
  | { ok: false; skipped: true; message: string }
  | { ok: false; skipped?: false; message: string };

type DownloadResult =
  | { ok: true; bytes: ArrayBuffer; contentType: string }
  | { ok: false; skipped: true; message: string }
  | { ok: false; skipped?: false; message: string };

function adminConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return null;

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

export function hasSupabaseAdmin() {
  return Boolean(adminConfig());
}

function encodedObjectPath(path: string) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function insertSupabaseRow(
  table: string,
  row: Record<string, unknown>,
): Promise<InsertResult> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  return { ok: true };
}

export async function uploadSupabaseFile(
  bucket: string,
  objectPath: string,
  file: File,
): Promise<UploadResult> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}/${encodedObjectPath(objectPath)}`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: await file.arrayBuffer(),
    },
  );

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  return { ok: true, path: objectPath };
}

export async function downloadSupabaseFile(
  bucket: string,
  objectPath: string,
): Promise<DownloadResult> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/storage/v1/object/authenticated/${encodeURIComponent(bucket)}/${encodedObjectPath(objectPath)}`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  return {
    ok: true,
    bytes: await response.arrayBuffer(),
    contentType:
      response.headers.get("content-type") ?? "application/octet-stream",
  };
}

export async function selectSupabaseRows<T>(
  table: string,
  query: string,
): Promise<
  | { ok: true; rows: T[] }
  | { ok: false; skipped?: boolean; message: string }
> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/${table}?${query}`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  return { ok: true, rows: (await response.json()) as T[] };
}

export async function updateSupabaseRows(
  table: string,
  query: string,
  patch: Record<string, unknown>,
): Promise<InsertResult> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/${table}?${query}`,
    {
      method: "PATCH",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(patch),
    },
  );

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  return { ok: true };
}

export async function createSupabaseSignedUrl(
  bucket: string,
  objectPath: string,
  expiresIn = 120,
): Promise<
  | { ok: true; url: string }
  | { ok: false; skipped?: boolean; message: string }
> {
  const config = adminConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      message: "Supabase admin environment is not configured.",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/storage/v1/object/sign/${encodeURIComponent(bucket)}/${encodedObjectPath(objectPath)}`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn }),
    },
  );

  if (!response.ok) {
    return { ok: false, message: await response.text() };
  }

  const payload = (await response.json()) as {
    signedURL?: string;
    signedUrl?: string;
  };
  const signed = payload.signedURL ?? payload.signedUrl;

  if (!signed) {
    return { ok: false, message: "Supabase did not return a signed URL." };
  }

  return {
    ok: true,
    url: signed.startsWith("http")
      ? signed
      : `${config.supabaseUrl}/storage/v1${signed}`,
  };
}

export async function supabaseRpc<T>(name: string, args: Record<string, unknown>): Promise<{ ok: true; data: T } | { ok: false; code: string }> {
  const config = adminConfig();
  if (!config) return { ok: false, code: "NOT_CONFIGURED" };
  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/rpc/${encodeURIComponent(name)}`, { method: "POST", headers: { apikey: config.serviceRoleKey, Authorization: `Bearer ${config.serviceRoleKey}`, "Content-Type": "application/json" }, body: JSON.stringify(args), cache: "no-store", signal: AbortSignal.timeout(15000) });
    const body = await response.json().catch(() => null);
    return response.ok ? { ok: true, data: body as T } : { ok: false, code: typeof body?.message === "string" && /^[A-Z_]+$/.test(body.message) ? body.message : "SERVICE_UNAVAILABLE" };
  } catch { return { ok: false, code: "SERVICE_UNAVAILABLE" }; }
}

export async function deleteSupabaseFile(bucket: string, objectPath: string) {
  const config = adminConfig(); if (!config) return false;
  try {
    const response = await fetch(`${config.supabaseUrl}/storage/v1/object/${encodeURIComponent(bucket)}`, { method: "DELETE", headers: { apikey: config.serviceRoleKey, Authorization: `Bearer ${config.serviceRoleKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: [objectPath] }), signal: AbortSignal.timeout(15000) });
    return response.ok;
  } catch { return false; }
}
