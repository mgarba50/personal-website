import { AccountShell } from "@/components/auth/account-shell";
import { requestReset } from "@/app/auth/actions";
export const metadata = { title: "Password recovery", robots: { index: false, follow: false } };
export default async function Forgot({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  return <AccountShell title="Recover your account" notice={notice}><form action={requestReset} className="grid gap-4">
    <label className="grid gap-2 text-sm font-semibold">Account email<input className="field rounded-md" type="email" name="email" autoComplete="email" maxLength={254} required /></label>
    <button className="sa-button sa-button--gold" type="submit">Send recovery instructions</button>
  </form></AccountShell>;
}
