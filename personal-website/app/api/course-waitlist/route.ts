import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const courseInterest = String(formData.get("courseInterest") ?? "").trim();
  const preferredFormat = String(formData.get("preferredFormat") ?? "").trim();

  if (!name || !email.includes("@") || !whatsapp || !courseInterest || !preferredFormat) {
    return NextResponse.json(
      { ok: false, message: "Name, email, WhatsApp, course interest, and preferred format are required." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You have joined the course waitlist. The next course update will be sent by email or WhatsApp.",
  });
}
