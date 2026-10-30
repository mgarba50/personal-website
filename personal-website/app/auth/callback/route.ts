import { NextResponse } from "next/server";
import { safeReturnPath, siteOrigin } from "@/lib/auth-config";
import { serverSupabase } from "@/lib/supabase-server";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const code = query.get("code");
  const client = await serverSupabase();
  if (code && code.length <= 2048 && client) {
    try {
      const { error } = await client.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(safeReturnPath(query.get("next")), siteOrigin()), { headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
    } catch {}
  }
  return NextResponse.redirect(new URL("/login?notice=The+confirmation+link+could+not+be+used.+Please+request+a+new+one.", siteOrigin()), { headers: { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" } });
}
