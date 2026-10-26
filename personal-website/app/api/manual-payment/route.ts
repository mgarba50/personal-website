import { NextResponse } from "next/server";
import { findCheckoutProduct } from "@/lib/checkout";
import { siteContact } from "@/lib/site-contact";
import {
  insertSupabaseRow,
  uploadSupabaseFile,
} from "@/lib/supabase-rest";

export const runtime = "nodejs";

function safeSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 6 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "Payment submission is too large." }, { status: 413 });
  }
  try { return await submitPayment(request); } catch {
    return NextResponse.json({ ok: false, message: `Payment submission is temporarily unavailable. Please email ${siteContact.email} with your order number and receipt.` }, { status: 503 });
  }
}

async function submitPayment(request: Request) {
  let formData: FormData;
  try { formData = await request.formData(); } catch {
    return NextResponse.json({ ok: false, message: "Invalid payment submission." }, { status: 400 });
  }

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

  const selected = findCheckoutProduct(productType, productSlug);
  if (!selected.purchasable) {
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

  if (product !== selected.title || amountPaid !== selected.amount) {
    return NextResponse.json({ ok: false, message: "Product or price changed. Reload checkout before submitting." }, { status: 409 });
  }
  if (!/^MA-[A-Z0-9-]{5,80}$/.test(orderNumber) || name.length > 200 || email.length > 254 || notes.length > 5000) {
    return NextResponse.json({ ok: false, message: "Invalid order details." }, { status: 400 });
  }
  const signatures: Record<string, (bytes: Uint8Array) => boolean> = {
    "application/pdf": (b) => Buffer.from(b).subarray(0, 5).toString() === "%PDF-",
    "image/png": (b) => Buffer.from(b).subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
    "image/jpeg": (b) => b[0] === 255 && b[1] === 216 && b[2] === 255,
    "image/webp": (b) => Buffer.from(b).subarray(0, 4).toString() === "RIFF" && Buffer.from(b).subarray(8, 12).toString() === "WEBP",
  };
  const validate = signatures[receipt.type];
  if (!validate || !validate(new Uint8Array(await receipt.slice(0, 12).arrayBuffer()))) {
    return NextResponse.json({ ok: false, message: "Upload a valid PDF, JPEG, PNG, or WebP receipt." }, { status: 400 });
  }

  const bucket =
    process.env.SUPABASE_RECEIPTS_BUCKET ?? "payment-receipts";

  const ext = ({ "application/pdf": ".pdf", "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp" } as Record<string, string>)[receipt.type];

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
    product_title: selected.title,
    amount_paid: selected.amount,
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
