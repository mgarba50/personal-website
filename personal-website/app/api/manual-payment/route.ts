import { NextResponse } from "next/server";
import { siteContact } from "@/lib/site-contact";
import { insertSupabaseRow } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const formData = await request.formData();
  const productType = String(formData.get("type") ?? "").trim();
  const productSlug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const reference = String(formData.get("reference") ?? "");
  const product = String(formData.get("product") ?? "").trim();
  const amountPaid = String(formData.get("amountPaid") ?? "").trim();
  const orderNumber = String(formData.get("orderNumber") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const receipt = formData.get("receipt");

  if (!name || !email.includes("@") || !phone || !reference || !product || !amountPaid || !orderNumber) {
    return NextResponse.json(
      { ok: false, message: "Name, email, WhatsApp, product, amount, order number, and reference are required." },
      { status: 400 },
    );
  }

  if (!(receipt instanceof File) || receipt.size === 0) {
    return NextResponse.json({ ok: false, message: "Receipt screenshot or PDF is required." }, { status: 400 });
  }

  if (receipt.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "Receipt file must be 5MB or smaller." }, { status: 400 });
  }

  const capture = await insertSupabaseRow("manual_payment_proofs", {
    order_number: orderNumber,
    name,
    email,
    phone,
    product_type: productType,
    product_slug: productSlug,
    product_title: product,
    amount_paid: amountPaid,
    transfer_reference: reference,
    receipt_file_name: receipt.name,
    receipt_file_type: receipt.type,
    notes,
    status: "payment_submitted",
  });

  if (!capture.ok && capture.skipped) {
    return NextResponse.json(
      {
        ok: false,
        message: `Receipt upload is not fully connected yet. Please email ${siteContact.email} with your order number, transfer reference, and receipt.`,
      },
      { status: 503 },
    );
  }

  if (!capture.ok) {
    console.error("Manual payment capture failed", capture.message);
    return NextResponse.json(
      {
        ok: false,
        message: `Receipt upload could not be saved. Please email ${siteContact.email} with your order number, transfer reference, and receipt.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Payment submitted. Your order is now under review. Once confirmed, access will be delivered by email or dashboard link.",
    orderNumber,
    status: "Payment Submitted",
  });
}
