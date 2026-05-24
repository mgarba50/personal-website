import { NextResponse } from "next/server";
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

  if (!subscriberCapture.ok && !subscriberCapture.skipped) {
    console.error("Newsletter capture failed", subscriberCapture.message);
  }

  if (!leadCapture.ok && !leadCapture.skipped) {
    console.error("Lead magnet capture failed", leadCapture.message);
  }

  return NextResponse.json({
    ok: true,
    message:
      "Your request has been received. The selected free resource can be delivered by email after review.",
  });
}
