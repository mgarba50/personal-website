import Link from "next/link";
import { legalNavigation, siteWings } from "@/lib/site-architecture";

export function SiteFooter() {
  return (
    <footer className="sa-footer">
      <div className="sa-container sa-footer__grid">
        <div className="sa-footer__identity">
          <Link href="/" className="sa-brand sa-brand--footer" aria-label="Musa Allama home">
            <span className="sa-brand__mark" aria-hidden="true">MA</span>
            <span>
              <span className="sa-brand__name">Musa Allama</span>
              <span className="sa-brand__descriptor">Official Digital Headquarters</span>
            </span>
          </Link>
          <p className="sa-footer__statement">
            Strategic advisory, practical education, and private intellectual work
            routed through one institutional headquarters.
          </p>
        </div>

        <div>
          <p className="sa-footer__heading">Three Wings</p>
          <div className="sa-footer__links">
            {siteWings.map((wing) => (
              <Link href={wing.href} key={wing.href}>{wing.shortLabel}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="sa-footer__heading">Institution</p>
          <div className="sa-footer__links">
            <Link href="/about">Executive Dossier</Link>
            <Link href="/consultation">Consultation</Link>
            <a href="/dashboard">Account and order support</a>
          </div>
        </div>

        <div>
          <p className="sa-footer__heading">Legal</p>
          <div className="sa-footer__links">
            {legalNavigation.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="sa-container sa-footer__bottom">
        <span>© 2026 MusaAllama.com</span>
        <span>Nigeria · International engagements</span>
      </div>
    </footer>
  );
}
