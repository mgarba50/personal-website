import { NextResponse } from "next/server";
import { insertSupabaseRow } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.action) {
    return NextResponse.json({ ok: false, message: "Conversion action is required." }, { status: 400 });
  }

  const capture = await insertSupabaseRow("conversion_events", {
    action: String(payload.action),
    label: payload.label ? String(payload.label) : null,
    href: payload.href ? String(payload.href) : null,
    path: payload.path ? String(payload.path) : null,
    metadata: {
      timestamp: payload.timestamp ?? new Date().toISOString(),
      source: "site",
    },
  });

  if (!capture.ok && !capture.skipped) {
    console.error("Conversion capture failed", capture.message);
  }

  return NextResponse.json({
    ok: true,
    message: "Conversion event received.",
  });
}
