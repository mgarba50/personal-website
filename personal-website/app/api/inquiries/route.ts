import { NextResponse } from "next/server";
import { siteContact } from "@/lib/site-contact";
import { insertSupabaseRow } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const inquiryType = String(formData.get("inquiryType") ?? "").trim();
  const budgetRange = String(formData.get("budgetRange") ?? "").trim();
  const preferredContact = String(formData.get("preferredContact") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email.includes("@") || !inquiryType || !message) {
    return NextResponse.json({ ok: false, message: "Name, email, inquiry type, and message are required." }, { status: 400 });
  }

  const capture = await insertSupabaseRow("inquiries", {
    name,
    email,
    phone,
    inquiry_type: inquiryType,
    message: [
      message,
      organization ? `Organization: ${organization}` : "",
      country ? `Country: ${country}` : "",
      budgetRange ? `Budget: ${budgetRange}` : "",
      preferredContact ? `Preferred contact: ${preferredContact}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
    status: "new",
  });

  if (!capture.ok && capture.skipped) {
    return NextResponse.json(
      {
        ok: false,
        message: `The inquiry desk is not fully connected yet. Please email ${siteContact.email} with your request.`,
      },
      { status: 503 },
    );
  }

  if (!capture.ok) {
    console.error("Inquiry capture failed", capture.message);
    return NextResponse.json(
      { ok: false, message: `Inquiry could not be saved. Please email ${siteContact.email} with your request.` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Inquiry received. The desk will review it and reply through your preferred channel.",
  });
}
