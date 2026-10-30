import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findCheckoutProduct } from "@/lib/checkout";
import { checkoutOrder, commerceEnabled, hash, newToken, publicOrder, rateLimit, rpc, uuid, type CommerceOrder } from "@/lib/commerce";
import { apiError, limitedBody, privateHeaders, PublicError, sameOrigin } from "@/lib/request-security";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    commerceEnabled();
    let input: Record<string, unknown>;
    try { input = JSON.parse((await limitedBody(request, 8192)).toString()); } catch (error) { if (error instanceof PublicError) throw error; throw new PublicError(400, "Check the order details."); }
    if (!input || Array.isArray(input)) throw new PublicError(400, "Check the order details.");
    const read = (key: string, max: number) => typeof input[key] === "string" && input[key].length <= max ? input[key].trim() : "";
    const type = read("type", 30), slug = read("slug", 150), name = read("name", 100), phone = read("phone", 50), requestKey = read("requestKey", 36);
    const product = findCheckoutProduct(type, slug);
    if (!product.purchasable) throw new PublicError(409, product.reason || "This offer is not open for payment.");
    const user = await getCurrentUser();
    const email = (user?.email || read("email", 254)).toLowerCase();
    if (!uuid(requestKey) || name.length < 2 || phone.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new PublicError(400, "Enter your name, email and phone number.");
    await rateLimit(request, "create-order", 20);
    const token = newToken();
    const snapshot = { user_id: user?.id || null, name, email, phone, product_type: type, product_slug: slug, product_title: product.title, amount_minor: product.amountMinor, currency: product.currency, fulfilment_slugs: product.fulfilmentSlugs };
    const order = await rpc<CommerceOrder>("commerce_create_order", { p_order: { ...snapshot, request_key: requestKey, payload_hash: hash(JSON.stringify(snapshot)), access_hash: hash(token) } });
    const response = NextResponse.json({ ok: true, order: publicOrder(order) }, { headers: privateHeaders });
    response.cookies.set("ma_checkout", `${order.id}.${token}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api", maxAge: 86400 });
    return response;
  } catch (error) { return apiError(error); }
}

export async function GET() {
  try { return NextResponse.json({ ok: true, order: publicOrder(await checkoutOrder()) }, { headers: privateHeaders }); }
  catch (error) { return apiError(error); }
}
