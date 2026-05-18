import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");

  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, message: "A valid email is required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Welcome to The Institutional Dispatch - a private note on knowledge, strategy, agriculture, publishing, and technology.",
  });
}
