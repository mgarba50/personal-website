import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { serverSupabase } from "@/lib/supabase-server";
import { safeReturnPath } from "@/lib/auth-config";

export type UserRole = "admin" | "buyer" | "member" | "student" | "client";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const client = await serverSupabase();
  if (!client) return null;
  try {
    // Validate with Auth; a cookie or user-editable profile is never role authority.
    const { data: { user }, error } = await client.auth.getUser();
    if (error || !user?.email || !user.email_confirmed_at) return null;
    const result = await client.from("app_user_roles").select("role").eq("user_id", user.id).maybeSingle();
    const allowed = ["admin", "buyer", "member", "student", "client"];
    const value = result.data?.role;
    const role: UserRole = !result.error && typeof value === "string" && allowed.includes(value) ? value as UserRole : "buyer";
    return { id: user.id, email: user.email, name: String(user.user_metadata?.name || user.email).slice(0, 100), role };
  } catch { return null; }
});

export function canAccessAdmin(user: SessionUser | null) {
  return user?.role === "admin";
}

export async function requireAdmin(next = "/admin") {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(safeReturnPath(next))}`);
  if (!canAccessAdmin(user)) redirect("/dashboard?notice=restricted");
  return user;
}
