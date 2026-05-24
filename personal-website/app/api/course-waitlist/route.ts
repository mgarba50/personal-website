import { NextResponse } from "next/server";
import { insertSupabaseRow } from "@/lib/supabase-rest";

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

  const capture = await insertSupabaseRow("course_waitlist_submissions", {
    name,
    email,
    whatsapp,
    course_interest: courseInterest,
    preferred_format: preferredFormat,
  });

  if (!capture.ok && !capture.skipped) {
    console.error("Course waitlist capture failed", capture.message);
  }

  return NextResponse.json({
    ok: true,
    message: "You have joined the course waitlist. The next course update will be sent by email or WhatsApp.",
  });
}
