import { getCurrentUser, canAccessAdmin } from "@/lib/auth";
import { uuid } from "@/lib/commerce";
import { apiError, privateHeaders, PublicError } from "@/lib/request-security";
import { createSupabaseSignedUrl, selectSupabaseRows } from "@/lib/supabase-rest";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) throw new PublicError(401, "Sign in to review a receipt.");
    if (!canAccessAdmin(user)) throw new PublicError(403, "Administrative access is required.");
    const { id } = await params;
    if (!uuid(id)) throw new PublicError(404, "Receipt not found.");
    const result = await selectSupabaseRows<{ proof_url: string }>("manual_payment_proofs", `id=eq.${id}&select=proof_url&limit=1`);
    if (!result.ok || !result.rows[0]?.proof_url) throw new PublicError(404, "Receipt not found.");
    const signed = await createSupabaseSignedUrl(process.env.SUPABASE_RECEIPTS_BUCKET || "payment-receipts", result.rows[0].proof_url, 30);
    if (!signed.ok) throw new PublicError(503, "The receipt could not be opened.");
    const location = new URL(signed.url);
    if (location.origin !== new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin || !location.pathname.startsWith("/storage/v1/object/sign/")) throw new PublicError(503, "The receipt could not be opened.");
    location.searchParams.set("download", "payment-receipt");
    return new Response(null, { status: 303, headers: { ...privateHeaders, Location: location.toString() } });
  } catch (error) { return apiError(error); }
}
