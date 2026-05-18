import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const reference = String(formData.get("reference") ?? "");

  if (!email.includes("@") || !reference) {
    return NextResponse.json({ ok: false, message: "Email and transfer reference are required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Manual payment proof received. Admin verification can unlock the product, course, or membership.",
  });
}
