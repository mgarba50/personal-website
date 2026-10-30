import { AccountShell } from "@/components/auth/account-shell";
import { signUp } from "@/app/auth/actions";
export const metadata = { title: "Create account", robots: { index: false, follow: false } };
export default async function Signup({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  return <AccountShell title="Create an account" notice={notice}><form action={signUp} className="grid gap-4">
    <label className="grid gap-2 text-sm font-semibold">Full name<input className="field rounded-md" name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
    <label className="grid gap-2 text-sm font-semibold">Email<input className="field rounded-md" type="email" name="email" autoComplete="email" maxLength={254} required /></label>
    <label className="grid gap-2 text-sm font-semibold">Password (at least 12 characters)<input className="field rounded-md" type="password" name="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>
    <p className="text-sm leading-6 text-muted">Confirm your email before signing in. Creating an account does not grant a paid course, membership or administrative access.</p>
    <button className="sa-button sa-button--gold" type="submit">Create account</button>
  </form></AccountShell>;
}
