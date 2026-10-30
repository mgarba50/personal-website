import Link from "next/link";

export function AccountShell({ title, notice, children }: { title: string; notice?: string; children: React.ReactNode }) {
  return <section className="px-5 py-16"><div className="mx-auto max-w-lg rounded-xl border border-line bg-white/90 p-7 md:p-10">
    <p className="text-xs font-semibold uppercase tracking-widest text-burgundy">Musa Allama account</p>
    <h1 className="display mt-3 text-4xl font-semibold text-deep">{title}</h1>
    {notice ? <p role="status" className="mt-5 rounded-md bg-vellum p-4 text-sm leading-7 text-deep">{notice.slice(0, 300)}</p> : null}
    <div className="mt-6">{children}</div>
    <p className="mt-7 text-sm text-muted"><Link className="underline" href="/dashboard">Orders and support</Link> · <Link className="underline" href="/">Headquarters</Link></p>
  </div></section>;
}
