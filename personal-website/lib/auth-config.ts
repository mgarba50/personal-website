export function supabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

export function siteOrigin() {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.musaallama.com");
  if (url.hostname === "musaallama.com") url.hostname = "www.musaallama.com";
  return url.origin;
}

export function safeReturnPath(value: unknown, fallback = "/dashboard") {
  if (typeof value !== "string" || /[\\\x00-\x20]/.test(value) || !value.startsWith("/") || value.startsWith("//")) return fallback;
  const url = new URL(value, "https://return.invalid");
  if (url.origin !== "https://return.invalid" || !/^\/(dashboard|admin|account)(\/|$)/.test(url.pathname)) return fallback;
  return url.pathname + url.search;
}
