import { redirect } from "next/navigation";
import { AccountShell } from "@/components/auth/account-shell";
import { changePassword } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";
export const metadata = { title: "Change password", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function Password({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  if (!await getCurrentUser()) redirect("/login?next=/account/password");
  const { notice } = await searchParams;
  return <AccountShell title="Set a new password" notice={notice}><form action={changePassword} className="grid gap-4">
    <label className="grid gap-2 text-sm font-semibold">New password<input className="field rounded-md" type="password" name="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>
    <button className="sa-button sa-button--gold" type="submit">Update password</button>
  </form></AccountShell>;
}
