import { NextResponse } from "next/server";
import { academyBundles, academyProducts } from "@/content/academy";
import { siteContact } from "@/lib/site-contact";
import {
  insertSupabaseRow,
  uploadSupabaseFile,
} from "@/lib/supabase-rest";

export const runtime = "nodejs";

function safeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

function isOpenForPayment(type: string, slug: string) {
  if (type === "book") {
    const product = academyProducts.find((item) => item.slug === slug);
    return Boolean(product?.purchasable && product.launchPrice);
  }

  if (type === "bundle") {
    return academyBundles.some(
      (bundle) => bundle.slug === slug && bundle.purchasable,
    );
  }

  return true;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const productType = String(formData.get("type") ?? "").trim();
  const productSlug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const reference = String(formData.get("reference") ?? "").trim();
  const product = String(formData.get("product") ?? "").trim();
  const amountPaid = String(formData.get("amountPaid") ?? "").trim();
  const orderNumber = String(formData.get("orderNumber") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const receipt = formData.get("receipt");

  if (!isOpenForPayment(productType, productSlug)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "This product is not currently open for payment. Please return to its product page or submit an inquiry.",
      },
      { status: 409 },
    );
  }

  if (
    !name ||
    !email.includes("@") ||
    !phone ||
    !reference ||
    !product ||
    !amountPaid ||
    !orderNumber
  ) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Name, email, WhatsApp, product, amount, order number, and reference are required.",
      },
      { status: 400 },
    );
  }

  if (!(receipt instanceof File) || receipt.size === 0) {
    return NextResponse.json(
      { ok: false, message: "Receipt screenshot or PDF is required." },
      { status: 400 },
    );
  }

  if (receipt.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, message: "Receipt file must be 5MB or smaller." },
      { status: 400 },
    );
  }

  const bucket =
    process.env.SUPABASE_RECEIPTS_BUCKET ?? "payment-receipts";

  const ext =
    receipt.name.includes(".")
      ? `.${safeSegment(receipt.name.split(".").pop() ?? "bin")}`
      : "";

  const objectPath = [
    new Date().toISOString().slice(0, 10),
    safeSegment(orderNumber),
    `${crypto.randomUUID()}${ext}`,
  ].join("/");

  const upload = await uploadSupabaseFile(bucket, objectPath, receipt);

  if (!upload.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: upload.skipped
          ? `Receipt storage is not configured yet. Please email ${siteContact.email} with your order number, transfer reference, and receipt.`
          : `Receipt upload failed. Please email ${siteContact.email} with your order number, transfer reference, and receipt.`,
      },
      { status: upload.skipped ? 503 : 502 },
    );
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
    proof_url: upload.path,
    receipt_file_name: receipt.name,
    receipt_file_type: receipt.type,
    notes,
    status: "payment_submitted",
  });

  if (!capture.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: capture.skipped
          ? `Payment review is not configured yet. Please email ${siteContact.email}.`
          : `Payment proof was uploaded but the order record could not be saved. Please contact ${siteContact.email} with order number ${orderNumber}.`,
      },
      { status: capture.skipped ? 503 : 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Payment submitted. Your order is now under review. Once confirmed, access will be delivered by email, dashboard, or secure link.",
    orderNumber,
    status: "Payment Submitted",
  });
}
