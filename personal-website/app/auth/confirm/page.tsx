import { AccountShell } from "@/components/auth/account-shell";
import { confirmEmail } from "@/app/auth/actions";
export const metadata = { title: "Confirm your email", robots: { index: false, follow: false }, referrer: "no-referrer" as const };
export default async function Confirm({ searchParams }: { searchParams: Promise<{ token_hash?: string; type?: string }> }) {
  const query = await searchParams;
  return <AccountShell title="Confirm your email"><p className="text-sm leading-7">Use the button to confirm this account or password recovery request. Opening this page alone does not consume the link.</p><form action={confirmEmail} className="mt-5">
    <input type="hidden" name="token_hash" value={(query.token_hash || "").slice(0,64)} /><input type="hidden" name="type" value={(query.type || "").slice(0,20)} />
    <button className="sa-button sa-button--gold" type="submit">Confirm and continue</button>
  </form></AccountShell>;
}
