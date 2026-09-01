import Link from "next/link";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallifrey Digital & Compliance Desk",
  description: "Professional websites, ICT-centre establishment, corporate documentation, and regulatory application facilitation in Nigeria.",
  path: "/gallifrey",
});

const divisions = [
  {
    index: "01",
    title: "Website & Digital Systems",
    copy: "Corporate, academy, NGO, school, catalogue and commerce websites—supported by domain, hosting, professional email, maintenance and redesign services.",
    items: ["Corporate and institutional websites", "ICT-centre and academy websites", "Domain, hosting and email setup", "Maintenance and platform upgrades"],
  },
  {
    index: "02",
    title: "Regulatory Application Facilitation",
    copy: "Readiness assessment, documentation and submission support for selected Nigerian regulatory and professional processes.",
    items: ["NITDA IICP readiness and application support", "CAC and post-incorporation documentation", "TIN, SCUML and trademark support", "Route-specific compliance file preparation"],
  },
  {
    index: "03",
    title: "Corporate Documentation",
    copy: "Clear, credible institutional documents that present an organisation's legal identity, operating capacity and standards.",
    items: ["Company profiles and capability statements", "Technical proposals and service agreements", "Policies, manuals and operating documents", "Tender and competence presentation packs"],
  },
  {
    index: "04",
    title: "ICT Centre Establishment",
    copy: "A coordinated establishment package for new training centres and technology businesses—from public identity to operating structure.",
    items: ["Centre positioning and service architecture", "Course and programme structuring", "Laboratory and equipment planning", "Forms, certificates and administrative systems"],
  },
];

const process = [
  ["01", "Discovery", "We establish the real objective, organisation type and intended services."],
  ["02", "Readiness review", "We inspect available records and identify missing requirements or dependencies."],
  ["03", "Written scope", "The client receives transparent deliverables, external costs and professional fees."],
  ["04", "Execution", "Gallifrey builds, prepares, submits or coordinates only the authorised work."],
];

export default function GallifreyPage() {
  return <>
    <PageHero
      eyebrow="Gallifrey International · Digital & Compliance Desk"
      title="Digital presence. Corporate readiness. Disciplined execution."
      copy="A professional service desk for organisations that need credible websites, stronger documentation, ICT-centre establishment support, and properly framed regulatory applications."
      primaryCta={{ label: "Explore website samples", href: "/gallifrey/samples", action: "view_website_samples" }}
      secondaryCta={{ label: "Request assessment", href: "#inquiry", action: "send_inquiry" }}
    />

    <section className="border-b border-line bg-white/60 px-5 py-7">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted md:flex-row md:items-center md:justify-between">
        <span>Website development</span><span>ICT-centre establishment</span><span>Corporate documentation</span><span>Application facilitation</span>
      </div>
    </section>

    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Professional service divisions" title="One desk. Four coordinated capabilities." copy="Digital work and compliance support are planned together so the public identity, corporate records and application documents tell one credible story." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {divisions.map((division) => <article key={division.index} className="rounded-lg border border-line bg-white/80 p-7 md:p-9">
            <div className="flex items-start justify-between gap-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Division {division.index}</p><span className="display text-4xl text-gold/55">{division.index}</span></div>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">{division.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{division.copy}</p>
            <ul className="mt-6 grid gap-3 border-t border-line pt-5 text-sm text-deep/80 sm:grid-cols-2">{division.items.map(item => <li key={item}>— {item}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </section>

    <section className="bg-deep px-5 py-20 text-vellum">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The Gallifrey protocol</p><h2 className="display mt-4 text-4xl font-semibold md:text-5xl">No vague promises. A traceable process.</h2><p className="mt-5 text-sm leading-7 text-vellum/65">Every engagement begins with classification and evidence. Where a regulator or external institution makes the final decision, Gallifrey facilitates the application but does not represent that approval as guaranteed.</p></div>
        <div className="grid gap-3">{process.map(([number,title,copy]) => <div key={number} className="grid gap-3 border border-gold/20 bg-vellum/5 p-5 sm:grid-cols-[3rem_10rem_1fr]"><span className="text-gold">{number}</span><strong>{title}</strong><p className="text-sm leading-6 text-vellum/65">{copy}</p></div>)}</div>
      </div>
    </section>

    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl rounded-lg border border-line bg-white/80 p-8 md:flex md:items-center md:justify-between md:p-12">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Digital portfolio</p><h2 className="display mt-3 text-4xl font-semibold text-deep">See the quality before commissioning.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">Open our ICT-centre concepts, compare the directions and request the design language that fits your organisation.</p></div>
        <Link href="/gallifrey/samples" className="mt-7 inline-flex rounded-md bg-deep px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-vellum transition hover:bg-navy md:mt-0">View website samples →</Link>
      </div>
    </section>

    <section id="inquiry" className="bg-white/60 px-5 py-20"><div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Engagement desk</p><h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Request a readiness assessment.</h2><p className="mt-5 text-sm leading-7 text-muted">State the service required, organisation name, current documents and intended deadline. We will classify the work before issuing a fixed scope.</p></div><InquiryForm /></div></section>
  </>;
}
