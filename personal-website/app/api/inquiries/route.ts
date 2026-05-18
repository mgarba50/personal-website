import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const inquiryType = String(formData.get("inquiryType") ?? "");

  if (!name || !email.includes("@") || !inquiryType) {
    return NextResponse.json({ ok: false, message: "Name, email, and inquiry type are required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Inquiry received. Connect Resend or Postmark to notify the admin desk.",
  });
}
