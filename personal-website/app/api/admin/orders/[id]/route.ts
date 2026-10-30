import { getCurrentUser, canAccessAdmin } from "@/lib/auth";
import { commerceEnabled, readOrder, rpc, uuid, type CommerceOrder } from "@/lib/commerce";
import { deliverOrder } from "@/lib/order-delivery";
import { moneyMinor } from "@/lib/checkout";
import { apiError, limitedBody, privateHeaders, PublicError, sameOrigin, textField } from "@/lib/request-security";
import { siteOrigin } from "@/lib/auth-config";
export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    sameOrigin(request);
    const actor = await getCurrentUser();
    if (!actor) throw new PublicError(401, "Sign in before reviewing an order.");
    if (!canAccessAdmin(actor)) throw new PublicError(403, "Administrative access is required.");
    commerceEnabled();
    const { id } = await params;
    const order = await readOrder(id);
    const data = await new Response(await limitedBody(request, 8192), { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData();
    const action = textField(data, "action", 30);
    let notice = "Order updated.";
    if (action === "approve" || action === "reject") {
      const note = textField(data, "note", 1000);
      const reference = action === "approve" ? textField(data, "bankReference", 200).replace(/\s+/g, "").toUpperCase() : "";
      if (note.length < 3) throw new PublicError(400, "Record a review note.");
      if (action === "approve" && (data.get("bankVerified") !== "yes" || moneyMinor(textField(data, "verifiedAmount", 40)) !== Number(order.amount_minor))) throw new PublicError(400, "Verify the bank transaction and exact expected amount before approving.");
      const reviewed = await rpc<CommerceOrder>("commerce_review_order", { p_order_id: order.id, p_actor_id: actor.id, p_decision: action, p_note: note, p_bank_reference: reference || null });
      if (action === "approve") notice = await deliverOrder(reviewed, actor) ? "Payment approved; delivery email accepted by the sender." : "Payment approved. Delivery email needs attention; use resend after checking the sender.";
      else notice = "Receipt rejected. No download access was granted.";
    } else if (action === "resend") {
      notice = await deliverOrder(order, actor) ? "Replacement delivery email accepted. Previous links were revoked." : "The sender did not accept the email. Check configuration before retrying.";
    } else if (action === "revoke") {
      await rpc("commerce_revoke_links", { p_order_id: order.id, p_actor_id: actor.id });
      notice = "Download links revoked. Reissue only after resolving the support request.";
    } else throw new PublicError(400, "Choose a supported review action.");
    return new Response(null, { status: 303, headers: { ...privateHeaders, Location: new URL(`/admin/orders/${order.id}?notice=${encodeURIComponent(notice)}`, siteOrigin()).toString() } });
  } catch (error) {
    if (request.headers.get("accept")?.includes("text/html")) {
      const { id } = await params;
      const path = uuid(id) ? `/admin/orders/${id}` : "/admin";
      const notice = error instanceof PublicError ? error.message : "The action could not be completed. Check the order status before retrying.";
      return new Response(null, { status: 303, headers: { ...privateHeaders, Location: new URL(`${path}?notice=${encodeURIComponent(notice)}`, siteOrigin()).toString() } });
    }
    return apiError(error);
  }
}
