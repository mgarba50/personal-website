import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getCurrentUser, type SessionUser } from "@/lib/auth";
import { deliveryFile, formatMoney } from "@/lib/checkout";
import { PublicError } from "@/lib/request-security";
import { selectSupabaseRows, supabaseRpc } from "@/lib/supabase-rest";

export type CommerceOrder = { id: string; order_number: string; user_id: string | null; name: string; email: string; phone: string; product_type: string; product_slug: string; product_title: string; amount_minor: number; currency: string; fulfilment_slugs: string[]; status: string; delivery_status: string; access_hash: string; created_at: string; reviewed_at: string | null };
export const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export const newToken = () => randomBytes(32).toString("base64url");
export const uuid = (value: string) => /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value);
export function commerceEnabled() {
  if (process.env.COMMERCE_ENABLED !== "true") throw new PublicError(503, "The order desk is being connected. Please contact support before transferring funds.");
}

export async function rpc<T>(name: string, args: Record<string, unknown>) {
  const result = await supabaseRpc<T>(name, args);
  if (!result.ok) {
    if (result.code === "RATE_LIMITED") throw new PublicError(429, "Please wait a minute before trying again.");
    if (["ORDER_CONFLICT", "ORDER_CLOSED", "RECEIPT_EXISTS", "PAYMENT_NOT_APPROVED", "PAYMENT_REFERENCE_USED"].includes(result.code)) throw new PublicError(409, "The order or bank reference has already been reviewed. Refresh and check its current status.");
    if (result.code === "ACCESS_DENIED") throw new PublicError(403, "This action is not permitted.");
    throw new PublicError(503, "The order desk is temporarily unavailable. Please contact support before transferring funds.");
  }
  return result.data;
}

export async function rateLimit(request: Request, action: string, maximum: number) {
  const address = process.env.VERCEL === "1" ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "local";
  await rpc("commerce_rate_limit", { p_key: hash(`${action}:${address}`), p_limit: maximum });
}

export async function readOrder(id: string) {
  if (!uuid(id)) throw new PublicError(404, "Order not found.");
  const result = await selectSupabaseRows<CommerceOrder>("commerce_orders", `id=eq.${id}&limit=1`);
  if (!result.ok) throw new PublicError(503, "The order desk is temporarily unavailable.");
  const order = result.rows[0];
  if (!order) throw new PublicError(404, "Order not found.");
  return order;
}

export async function checkoutOrder() {
  const [id, token] = ((await cookies()).get("ma_checkout")?.value || "").split(".");
  if (!uuid(id || "") || !/^[A-Za-z0-9_-]{43}$/.test(token || "")) throw new PublicError(401, "Start or resume your order from checkout.");
  const order = await readOrder(id);
  const stored = Buffer.from(order.access_hash || "", "hex"), candidate = Buffer.from(hash(token), "hex");
  if (stored.length !== candidate.length || !timingSafeEqual(stored, candidate)) throw new PublicError(403, "Order access could not be verified.");
  const user = await getCurrentUser();
  if (order.user_id && user?.id !== order.user_id) throw new PublicError(403, "Sign in to the account that placed this order.");
  return order;
}

export function publicOrder(order: CommerceOrder) {
  return { id: order.id, orderNumber: order.order_number, title: order.product_title, type: order.product_type, slug: order.product_slug, amount: formatMoney(order.amount_minor), status: order.status, deliveryStatus: order.delivery_status };
}

export async function issueLinks(order: CommerceOrder, actor: SessionUser) {
  if (order.status !== "payment_approved") throw new PublicError(409, "Payment has not been approved.");
  const links = order.fulfilment_slugs.map(slug => {
    const path = deliveryFile(slug); if (!path) throw new PublicError(503, "A delivery file needs operator attention.");
    const token = newToken(); return { slug, path, token, tokenHash: hash(token) };
  });
  if (!links.length) throw new PublicError(503, "This order has no registered delivery files.");
  await rpc("commerce_issue_links", { p_order_id: order.id, p_actor_id: actor.id, p_links: links.map(link => ({ slug: link.slug, path: link.path, token_hash: link.tokenHash })) });
  return links.map(({ slug, token }) => ({ slug, token }));
}
