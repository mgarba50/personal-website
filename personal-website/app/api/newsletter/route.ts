import { NextResponse } from "next/server";
import { siteContact } from "@/lib/site-contact";
import { insertSupabaseRow } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const leadMagnet = String(formData.get("leadMagnet") ?? "").trim();

  if (!name || !email.includes("@") || !interest) {
    return NextResponse.json({ ok: false, message: "Name, email, and interest category are required." }, { status: 400 });
  }

  const subscriberCapture = await insertSupabaseRow("newsletter_subscribers", {
    name,
    email,
    interest,
    lead_magnet: leadMagnet || null,
  });

  const leadCapture = leadMagnet
    ? await insertSupabaseRow("lead_magnet_signups", {
        name,
        email,
        whatsapp: phone,
        interest_category: interest,
        lead_magnet: leadMagnet,
      })
    : { ok: true as const };

  if (!subscriberCapture.ok && subscriberCapture.skipped) {
    return NextResponse.json(
      {
        ok: false,
        message: `The dispatch signup desk is not fully connected yet. Please email ${siteContact.email} for the free resource.`,
      },
      { status: 503 },
    );
  }

  if (!subscriberCapture.ok) {
    console.error("Newsletter capture failed", subscriberCapture.message);
    return NextResponse.json(
      { ok: false, message: `Signup could not be saved. Please email ${siteContact.email} for the free resource.` },
      { status: 502 },
    );
  }

  if (!leadCapture.ok && leadCapture.skipped) {
    return NextResponse.json(
      {
        ok: false,
        message: `The free resource desk is not fully connected yet. Please email ${siteContact.email} for delivery.`,
      },
      { status: 503 },
    );
  }

  if (!leadCapture.ok) {
    console.error("Lead magnet capture failed", leadCapture.message);
    return NextResponse.json(
      { ok: false, message: `Resource request could not be saved. Please email ${siteContact.email} for delivery.` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Your request has been received. The selected free resource can be delivered by email after review.",
  });
}
