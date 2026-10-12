import Link from "next/link";
import type { SiteWing } from "@/lib/site-architecture";
import { SectionPlaceholder } from "./section-placeholder";

type WingPageProps = {
  wing: SiteWing;
  index: string;
  tone: "corporate" | "academy" | "inner";
};

export function WingPage({ wing, index, tone }: WingPageProps) {
  return (
    <div className={`sa-wing sa-wing--${tone}`}>
      <section className="sa-wing-hero">
        <div className="sa-container sa-wing-hero__grid">
          <div>
            <p className="sa-kicker">Wing {index} · {wing.audience}</p>
            <h1 className="sa-display sa-wing-hero__title">{wing.label}</h1>
            <p className="sa-wing-hero__purpose">{wing.purpose}</p>
            <div className="sa-wing-hero__actions">
              <Link href="/" className="sa-button sa-button--ghost">Return to Headquarters</Link>
              {wing.id === "corporate" ? (
                <Link href="/consultation" className="sa-button sa-button--gold">Consultation Path</Link>
              ) : null}
            </div>
          </div>
          <div className="sa-wing-map" aria-label={`${wing.label} architecture`}>
            <p className="sa-wing-map__eyebrow">Architecture map</p>
            <ol>
              {wing.sections.map((section, sectionIndex) => (
                <li key={section}>
                  <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                  {section}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="sa-container sa-section-stack">
        {wing.sections.map((section, sectionIndex) => (
          <SectionPlaceholder
            key={section}
            index={String(sectionIndex + 1).padStart(2, "0")}
            title={section}
          />
        ))}
      </div>
    </div>
  );
}
