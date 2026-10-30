import { createHash } from "node:crypto";
import { deliveryFile } from "@/lib/checkout";
import { privateHeaders } from "@/lib/request-security";
import { createSupabaseSignedUrl, selectSupabaseRows, supabaseRpc } from "@/lib/supabase-rest";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Token = { product_slug: string; storage_path: string; expires_at: string; revoked_at: string | null; download_count: number; max_downloads: number };
const error = (status: number, message: string) => Response.json({ ok: false, message }, { status, headers: privateHeaders });

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return error(404, "Invalid download link.");
  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const result = await selectSupabaseRows<Token>("download_tokens", `token_hash=eq.${tokenHash}&limit=1`);
    if (!result.ok) return error(503, "Secure delivery is temporarily unavailable. Please contact support.");
    const record = result.rows[0];
    if (!record || record.revoked_at || !Number.isFinite(Date.parse(record.expires_at)) || Date.parse(record.expires_at) <= Date.now() || record.download_count >= record.max_downloads) return error(410, "This link has expired or reached its limit. Contact support for a replacement.");
    const path = deliveryFile(record.product_slug);
    if (!path || path !== record.storage_path) return error(403, "Download is not authorised.");
    // Short-lived storage delivery supports PDFs larger than a function response limit.
    const signed = await createSupabaseSignedUrl(process.env.SUPABASE_PRODUCT_FILES_BUCKET || "product-files", path, 30);
    if (!signed.ok) return error(503, "The file needs attention from the order desk. Please contact support.");
    const location = new URL(signed.url);
    const storageOrigin = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin;
    if (location.origin !== storageOrigin || !location.pathname.startsWith("/storage/v1/object/sign/")) return error(503, "Secure delivery is temporarily unavailable.");
    const claim = await supabaseRpc<boolean>("commerce_claim_download", { p_hash: tokenHash, p_count: record.download_count });
    if (!claim.ok) return error(503, "Secure delivery is temporarily unavailable.");
    if (!claim.data) return error(409, "This link changed, was used or is no longer authorised. Please retry or contact support.");
    location.searchParams.set("download", `${record.product_slug}.pdf`);
    return new Response(null, { status: 303, headers: { ...privateHeaders, Location: location.toString() } });
  } catch { return error(503, "Secure delivery is temporarily unavailable. Please contact support."); }
}
