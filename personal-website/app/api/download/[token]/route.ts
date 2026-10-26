import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import manifest from "@/secure-download-manifest.json";
import { claimDownloadToken, downloadSupabaseFile, selectSupabaseRows } from "@/lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Token = { product_slug: string; storage_path: string; expires_at: string; revoked_at: string | null; download_count: number; max_downloads: number };
const headers = { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };
const error = (status: number, message: string) => NextResponse.json({ ok: false, message }, { status, headers });

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return error(404, "Invalid download link.");
  try {
    const hash = createHash("sha256").update(token).digest("hex");
    const result = await selectSupabaseRows<Token>("download_tokens", `token_hash=eq.${hash}&limit=1`);
    if (!result.ok) return error(503, "Secure delivery is temporarily unavailable. Contact support with your order number.");
    const record = result.rows[0];
    if (!record || record.revoked_at || !Number.isFinite(Date.parse(record.expires_at)) || Date.parse(record.expires_at) <= Date.now() || record.download_count >= record.max_downloads) return error(410, "This download link has expired or reached its limit. Contact support.");
    const storagePath = (manifest.products as Record<string, string>)[record.product_slug];
    if (!storagePath || record.storage_path !== storagePath) return error(403, "Download is not authorized.");
    const file = await downloadSupabaseFile(process.env.SUPABASE_PRODUCT_FILES_BUCKET ?? "product-files", storagePath);
    if (!file.ok) return error(503, "Your file could not be retrieved. Contact support with your order number.");
    if (!await claimDownloadToken(hash, record.download_count)) return error(409, "The link was used or changed. Please retry.");
    return new Response(file.bytes, { headers: { ...headers, "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${record.product_slug}.pdf"` } });
  } catch {
    return error(503, "Secure delivery is temporarily unavailable. Please retry or contact support.");
  }
}
