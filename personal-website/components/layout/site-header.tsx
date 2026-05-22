import Link from "next/link";
import { navItems } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-deep/95 text-vellum backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
        <Link href="/" className="min-w-fit">
          <span className="display block text-2xl font-semibold leading-none">Musa Allama</span>
          <span className="mt-1 block text-[0.66rem] uppercase tracking-[0.22em] text-gold">
            Institutional Headquarters
          </span>
        </Link>
        <Link
          href="/contact"
          className="hidden rounded-md border border-gold/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-deep md:inline-flex"
        >
          Diplomatic Desk
        </Link>
      </div>
      <nav className="border-t border-gold/15">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-5 py-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center">
          {navItems.map((item) => (
            <Link
              className="block w-full rounded-md px-2 py-2 text-center text-[0.58rem] font-medium uppercase leading-5 tracking-normal text-vellum/72 transition hover:bg-vellum/8 hover:text-gold sm:text-xs sm:tracking-[0.1em] lg:w-auto"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
