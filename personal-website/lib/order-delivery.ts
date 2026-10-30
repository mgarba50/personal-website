import "server-only";
import { emailConfig } from "@/lib/email";
import { siteOrigin } from "@/lib/auth-config";
import { issueLinks, rpc, type CommerceOrder } from "@/lib/commerce";
import type { SessionUser } from "@/lib/auth";

export async function deliverOrder(order: CommerceOrder, actor: SessionUser) {
  const links = await issueLinks(order, actor);
  const body = [
    `Your order ${order.order_number} has been approved.`,
    order.product_title,
    ...links.map(link => `${link.slug}: ${siteOrigin()}/api/download/${link.token}`),
    "Each link is valid for 72 hours and up to three requests. Storage links last only 30 seconds; open the original delivery link again if needed.",
    "For help or a replacement link, contact the order desk with your order number.",
    "MusaAllama.com",
  ].join("\n\n");
  let sent = false;
  try {
    if (emailConfig.provider === "resend" && emailConfig.resendKey) {
      const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${emailConfig.resendKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: emailConfig.from, to: [order.email], subject: `Your Musa Allama order ${order.order_number}`, text: body }), signal: AbortSignal.timeout(15000) });
      const acknowledgement = await response.json().catch(() => null);
      sent = response.ok && typeof acknowledgement?.id === "string";
    } else if (emailConfig.provider === "postmark" && emailConfig.postmarkToken) {
      const response = await fetch("https://api.postmarkapp.com/email", { method: "POST", headers: { "X-Postmark-Server-Token": emailConfig.postmarkToken, "Content-Type": "application/json" }, body: JSON.stringify({ From: emailConfig.from, To: order.email, Subject: `Your Musa Allama order ${order.order_number}`, TextBody: body, MessageStream: "outbound" }), signal: AbortSignal.timeout(15000) });
      const acknowledgement = await response.json().catch(() => null);
      sent = response.ok && acknowledgement?.ErrorCode === 0 && typeof acknowledgement?.MessageID === "string";
    }
  } catch { sent = false; }
  await rpc("commerce_record_delivery", { p_order_id: order.id, p_status: sent ? "sent" : "failed" });
  return sent;
}
