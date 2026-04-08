import Link from "next/link";
import { primaryNavigation } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="text-sm uppercase tracking-[0.34em] text-text">
          Musa Allama
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href="/contact" variant="secondary">
            Diplomatic Desk
          </ButtonLink>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
