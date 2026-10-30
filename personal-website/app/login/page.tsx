import Link from "next/link";
import { AccountShell } from "@/components/auth/account-shell";
import { signIn } from "@/app/auth/actions";
import { safeReturnPath } from "@/lib/auth-config";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string; notice?: string }> }) {
  const query = await searchParams;
  return <AccountShell title="Sign in" notice={query.notice}><form action={signIn} className="grid gap-4">
    <input type="hidden" name="next" value={safeReturnPath(query.next)} />
    <label className="grid gap-2 text-sm font-semibold">Email<input className="field rounded-md" type="email" name="email" autoComplete="email" maxLength={254} required /></label>
    <label className="grid gap-2 text-sm font-semibold">Password<input className="field rounded-md" type="password" name="password" autoComplete="current-password" maxLength={128} required /></label>
    <button className="sa-button sa-button--gold" type="submit">Sign in</button>
  </form><p className="mt-5 text-sm"><Link className="underline" href="/forgot-password">Forgot password?</Link> · <Link className="underline" href="/signup">Create an account</Link></p></AccountShell>;
}
