import { checkoutOrder, commerceEnabled, publicOrder, rateLimit, rpc, type CommerceOrder } from "@/lib/commerce";
import { findCheckoutProduct, moneyMinor, formatMoney } from "@/lib/checkout";
import { apiError, checkReceiptSignature, limitedBody, privateHeaders, PublicError, sameOrigin, textField, validReceipt } from "@/lib/request-security";
import { deleteSupabaseFile, uploadSupabaseFile } from "@/lib/supabase-rest";
export const runtime = "nodejs";

export async function POST(request: Request) {
  let uploaded: { bucket: string; path: string } | undefined;
  try {
    sameOrigin(request);
    commerceEnabled();
    const order = await checkoutOrder();
    if (order.status !== "pending_payment") throw new PublicError(409, "A receipt has already been submitted or this order is closed. Check its status before transferring again.");
    if (!findCheckoutProduct(order.product_type, order.product_slug).purchasable) throw new PublicError(409, "This offer requires assistance from the order desk. Please contact support.");
    await rateLimit(request, "receipt", 10);
    // Leave multipart overhead below Vercel's 4.5 MB request limit.
    const body = await limitedBody(request, 4 * 1024 * 1024 + 16384);
    let data: FormData;
    try { data = await new Response(body, { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData(); } catch { throw new PublicError(400, "The receipt submission could not be read."); }
    const reference = textField(data, "reference", 200), notes = textField(data, "notes", 2000, false), amount = textField(data, "amountPaid", 40);
    const minor = moneyMinor(amount);
    if (!minor) throw new PublicError(400, "Enter the amount you transferred in NGN.");
    const receipt = data.get("receipt");
    if (!(receipt instanceof File)) throw new PublicError(400, "Choose a receipt file.");
    const extension = validReceipt(receipt);
    await checkReceiptSignature(receipt);
    const bucket = process.env.SUPABASE_RECEIPTS_BUCKET || "payment-receipts";
    const path = `${order.id}/${crypto.randomUUID()}.${extension}`;
    const upload = await uploadSupabaseFile(bucket, path, receipt);
    if (!upload.ok) throw new PublicError(503, "Your receipt could not be stored. Please retry or contact support with your order number.");
    uploaded = { bucket, path };
    const saved = await rpc<CommerceOrder>("commerce_submit_receipt", { p_order_id: order.id, p_receipt: { amount_paid: formatMoney(minor), reference, notes, path, filename: `receipt.${extension}`, content_type: receipt.type } });
    uploaded = undefined;
    return Response.json({ ok: true, order: publicOrder(saved), message: "Receipt received. Payment is pending review against the bank transaction. Keep your order number; do not transfer again." }, { headers: privateHeaders });
  } catch (error) {
    if (uploaded) await deleteSupabaseFile(uploaded.bucket, uploaded.path);
    return apiError(error);
  }
}
