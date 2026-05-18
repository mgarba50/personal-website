import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.action) {
    return NextResponse.json({ ok: false, message: "Conversion action is required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Conversion event received. Connect this route to Supabase or analytics in production.",
  });
}
