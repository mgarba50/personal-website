import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { corporateCapabilities, corporateServices } from "@/content/corporate";
import { getCorporateService } from "@/lib/content-registry";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return corporateServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getCorporateService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo?.title ?? service.title, description: service.seo?.description ?? service.summary, path: "/corporate/services/" + slug });
}

export default async function CorporateServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getCorporateService(slug);
  if (!service) notFound();
  const capability = corporateCapabilities.find((item) => item.slug === service.capabilitySlug);

  return (
    <div>
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">Corporate Advisory · {capability?.title ?? "Service"}</p>
            <h1 className="sa-display sa-simple-hero__title">{service.title}</h1>
            <p className="sa-simple-hero__copy">{service.summary}</p>
            <div className="sa-wing-hero__actions">
              <Link className="sa-button sa-button--gold" href="/consultation">Request an engagement</Link>
              <Link className="sa-button sa-button--ghost" href="/corporate">Back to Corporate</Link>
            </div>
          </div>
          <aside className="sa-simple-hero__note">
            <span>ENGAGEMENT FRAMEWORK</span>
            <p>{service.startingFee ? "Indicative starting fee: " + service.startingFee : "Scope confirmed after consultation"}</p>
            {service.duration ? <p>Typical session: {service.duration}</p> : null}
          </aside>
        </div>
      </section>
      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading">
            <p className="sa-kicker sa-kicker--dark">Engagement architecture</p>
            <h2 className="sa-display">A scoped, executable outcome.</h2>
            <p>{service.outcome ?? service.summary}</p>
          </div>
          <div className="sa-editorial-grid">
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">OUTCOME</span>
              <h3>Expected result</h3>
              <p>{service.outcome ?? service.summary}</p>
            </article>
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">DELIVERABLES</span>
              <h3>What is included</h3>
              {service.deliverables?.length ? <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Final deliverables are agreed during scoping.</p>}
            </article>
            <article className="sa-structural-card">
              <span className="sa-structural-card__index">SUITABILITY</span>
              <h3>Who this serves</h3>
              {service.audience?.length ? <ul>{service.audience.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Enterprises, institutions and professional operators.</p>}
            </article>
          </div>
        </div>
      </section>
      <section className="sa-wing-final-cta">
        <div className="sa-container sa-wing-final-cta__inner">
          <h2 className="sa-display">Ready to structure the engagement?</h2>
          <Link className="sa-button sa-button--gold" href="/consultation">Start a consultation</Link>
        </div>
      </section>
    </div>
  );
}
