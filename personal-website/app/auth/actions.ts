"use server";

import { redirect } from "next/navigation";
import { serverSupabase } from "@/lib/supabase-server";
import { safeReturnPath, siteOrigin } from "@/lib/auth-config";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

const value = (form: FormData, key: string) => String(form.get(key) || "").trim();
const emailOk = (email: string) => email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const notice = (path: string, message: string) => redirect(`${path}${path.includes("?") ? "&" : "?"}notice=${encodeURIComponent(message)}`);

export async function signIn(form: FormData) {
  const next = safeReturnPath(form.get("next"));
  const failure = `/login?next=${encodeURIComponent(next)}`;
  const email = value(form, "email");
  const password = String(form.get("password") || "");
  if (!emailOk(email) || !password || password.length > 128) notice(failure, "Enter your email and password.");
  const client = await serverSupabase();
  if (!client) notice(failure, "Sign in is temporarily unavailable. Please contact support.");
  let ok = false;
  try { const result = await client!.auth.signInWithPassword({ email, password }); ok = !result.error && Boolean(result.data.user?.email_confirmed_at); } catch {}
  if (!ok) notice(failure, "Unable to sign in. Check your details and confirm your email.");
  redirect(next);
}

export async function signUp(form: FormData) {
  const email = value(form, "email");
  const name = value(form, "name");
  const password = String(form.get("password") || "");
  if (!emailOk(email) || name.length < 2 || name.length > 100 || password.length < 12 || password.length > 128) notice("/signup", "Use a valid email, your name and a password of 12 to 128 characters.");
  const client = await serverSupabase();
  if (!client) notice("/signup", "Account creation is temporarily unavailable. Please contact support.");
  try { await client!.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: `${siteOrigin()}/auth/callback?next=/dashboard` } }); } catch {}
  notice("/login", "If registration is available for this address, you will receive an email. Confirm it before signing in.");
}

export async function requestReset(form: FormData) {
  const email = value(form, "email");
  if (!emailOk(email)) notice("/forgot-password", "Enter a valid email address.");
  const client = await serverSupabase();
  if (!client) notice("/forgot-password", "Password recovery is temporarily unavailable. Please contact support.");
  try { await client!.auth.resetPasswordForEmail(email, { redirectTo: `${siteOrigin()}/auth/callback?next=/account/password` }); } catch {}
  notice("/forgot-password", "If an account matches this address, recovery instructions will be sent to it.");
}

export async function changePassword(form: FormData) {
  const password = String(form.get("password") || "");
  if (password.length < 12 || password.length > 128) notice("/account/password", "Use 12 to 128 characters.");
  const client = await serverSupabase();
  if (!client) redirect("/login");
  const { data: { user } } = await client!.auth.getUser();
  if (!user) redirect("/login");
  const { error } = await client!.auth.updateUser({ password });
  if (error) notice("/account/password", "Your password could not be updated. Please request a new recovery link.");
  await client!.auth.signOut({ scope: "others" });
  notice("/dashboard", "Your password has been updated.");
}

export async function signOut() {
  const client = await serverSupabase();
  if (client) await client.auth.signOut();
  (await cookies()).set("ma_checkout", "", { path: "/api", maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" });
  redirect("/login");
}

export async function confirmEmail(form: FormData) {
  const tokenHash = value(form, "token_hash"), type = value(form, "type");
  const allowed = ["signup", "recovery", "invite", "email", "email_change", "magiclink"];
  if (!/^[a-f0-9]{64}$/i.test(tokenHash) || !allowed.includes(type)) notice("/login", "This confirmation link is invalid. Please request a new one.");
  const client = await serverSupabase();
  if (!client) notice("/login", "Confirmation is temporarily unavailable. Please contact support.");
  let ok = false;
  try { const result = await client!.auth.verifyOtp({ token_hash: tokenHash, type: type as EmailOtpType }); ok = !result.error; } catch {}
  if (!ok) notice("/login", "The confirmation link has expired or was already used. Please request a new one.");
  redirect(type === "recovery" ? "/account/password" : "/dashboard");
}
