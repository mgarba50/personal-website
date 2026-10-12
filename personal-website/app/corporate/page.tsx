import type { Metadata } from "next";
import Link from "next/link";
import { corporateCapabilities, corporateServices } from "@/content/corporate";

export const metadata: Metadata = {
  title: "Corporate Advisory & Solutions",
  description: "High-level advisory, supply chain architecture, digital engineering, publishing systems, and institutional execution for enterprises, NGOs, and international operations.",
  alternates: { canonical: "/corporate" },
};

export default function CorporatePage() {
  return (
    <div>
      <section className="sa-wing-shell-hero sa-wing-shell-hero--corporate">
        <div className="sa-container sa-wing-shell-hero__grid">
          <div>
            <p className="sa-kicker">Corporate Advisory & Solutions</p>
            <h1 className="sa-display sa-wing-shell-hero__title">Strategic Execution. Global Infrastructure. Institutional Deployment.</h1>
            <p className="sa-wing-shell-hero__copy">High-level advisory, supply chain architecture, and digital engineering for forward-thinking enterprises, NGOs, and international trade operations.</p>
            <div className="sa-wing-hero__actions"><Link href="/consultation" className="sa-button sa-button--gold">Initiate a Consultation</Link></div>
          </div>
          <aside className="sa-architecture-index"><p className="sa-architecture-index__label">Corporate Route</p><ol><li><span>01</span> Strategic proposition</li><li><span>02</span> Core capabilities</li><li><span>03</span> Engagement services</li><li><span>04</span> Differentiator</li><li><span>05</span> Qualified intake</li></ol></aside>
        </div>
      </section>

      <section className="sa-wing-section"><div className="sa-container"><div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Core Capabilities</p><h2 className="sa-display">Three operating pillars.</h2></div><div className="sa-capability-grid">{corporateCapabilities.map((item,index)=><article className="sa-structural-card" key={item.slug}><span className="sa-structural-card__index">PILLAR {String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div></div></section>

      <section className="sa-wing-section sa-wing-section--soft"><div className="sa-container"><div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Engagement Services</p><h2 className="sa-display">From diagnosis to execution architecture.</h2><p>Each service routes through a qualified intake so scope, bottleneck, budget, and expected outcome are clear before work begins.</p></div><div className="sa-service-grid">{corporateServices.map((service)=><Link href={`/corporate/services/${service.slug}`} className="sa-service-card" key={service.slug}><span>{service.startingFee ?? "Qualified engagement"}</span><h3>{service.title}</h3><p>{service.summary}</p><strong>View engagement →</strong></Link>)}</div></div></section>

      <section className="sa-wing-section sa-wing-section--dark"><div className="sa-container"><div className="sa-wing-section__heading"><p className="sa-kicker">The Differentiator</p><h2 className="sa-display">The Intersection of Engineering, Trade, and Strategy.</h2><p>True operational success requires more than localized knowledge. It demands an architect who understands digital systems, the logistical realities of global trade, multilingual communication, and the strategic positioning of an institution. The objective is not merely advice — it is a system that can be executed.</p></div></div></section>

      <section className="sa-wing-final-cta"><div className="sa-container sa-wing-final-cta__inner"><h2 className="sa-display">Bring the operational problem. Leave with a structured path forward.</h2><Link href="/consultation" className="sa-button sa-button--gold">Initiate a Consultation</Link></div></section>
    </div>
  );
}
