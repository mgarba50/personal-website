import Link from "next/link";
import { primaryNavigation } from "@/lib/site-architecture";

export function SiteHeader() {
  return (
    <header className="sa-header">
      <div className="sa-container sa-header__bar">
        <Link href="/" className="sa-brand" aria-label="Musa Allama home">
          <span className="sa-brand__mark" aria-hidden="true">MA</span>
          <span>
            <span className="sa-brand__name">Musa Allama</span>
            <span className="sa-brand__descriptor">Official Digital Headquarters</span>
          </span>
        </Link>

        <nav className="sa-header__desktop" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href} className="sa-nav-link">
              {item.label}
            </Link>
          ))}
          <Link href="/consultation" className="sa-button sa-button--gold sa-button--compact">
            Book a Consultation
          </Link>
        </nav>

        <details className="sa-mobile-nav">
          <summary aria-label="Open navigation">
            <span>Menu</span>
            <span className="sa-mobile-nav__icon" aria-hidden="true">≡</span>
          </summary>
          <div className="sa-mobile-nav__panel">
            {primaryNavigation.map((item) => (
              <Link href={item.href} key={item.href} className="sa-mobile-nav__link">
                {item.label}
              </Link>
            ))}
            <Link href="/about" className="sa-mobile-nav__link">About</Link>
            <Link href="/consultation" className="sa-button sa-button--gold">Book a Consultation</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
