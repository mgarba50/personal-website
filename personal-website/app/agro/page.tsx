import Link from "next/link";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Agro-Industrial Command Center",
  description:
    "Agrochemical supply, equipment, hydroponics training, procurement support, farmer education, and institutional agricultural training.",
  path: "/agro",
});

const services = [
  {
    title: "Agrochemical Product Sourcing",
    copy: "Supplier communication, product inquiry, procurement planning, and market-fit support.",
  },
  {
    title: "Farmer Training Programs",
    copy: "Field education modules for product use, safety awareness, seasonal planning, and trust building.",
  },
  {
    title: "Hydroponics Setup Advisory",
    copy: "Starter system planning, costing, crop selection, nutrient discipline, and training design.",
  },
  {
    title: "Agricultural Equipment Procurement",
    copy: "Sprayers, equipment requests, supplier conversation, and basic procurement verification.",
  },
  {
    title: "NGO / Institutional Agricultural Training",
    copy: "Program support for universities, NGOs, cooperatives, and development partners.",
  },
];

export default function AgroPage() {
  return (
    <>
      <PageHero
        eyebrow="Agro-Industrial Command Center"
        title="Agriculture, agrochemicals, hydroponics, and procurement intelligence."
        copy="A lead-generation and authority center for agrochemical supply, farmer education, training programs, equipment procurement, hydroponics, and institutional agriculture projects."
        primaryCta={{ label: "Request agro support", href: "#inquiry" }}
        secondaryCta={{ label: "Download agro profile", href: "/downloads/agro-profile-placeholder.pdf" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Agro services"
            title="Commercial agriculture support with field intelligence"
            copy="Designed for agro-dealers, farmers, universities, NGOs, corporate projects, and institutional partners."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={service.title}>
                <h3 className="display text-3xl font-semibold text-deep">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <article className="rounded-lg border border-line bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Case study area</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">Training and field work archive</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Add training reports, field notes, photos, partner outcomes, and agriculture program summaries through the
              admin content system.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Product request</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">Sprayers, inputs, equipment</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Route product requests into the inquiry system for supplier follow-up, procurement planning, and manual
              payment verification.
            </p>
          </article>
          <article className="rounded-lg border border-line bg-white/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">WhatsApp CTA</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">Fast field contact</h2>
            <p className="mt-4 text-sm leading-7 text-muted">Use WhatsApp for urgent product requests and training inquiries.</p>
            <Link className="mt-5 inline-flex rounded-md bg-emerald px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white" href="https://wa.me/">
              Open WhatsApp
            </Link>
          </article>
        </div>
      </section>

      <section id="inquiry" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Agro inquiry</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Request sourcing, training, or setup support.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Include crop, location, required inputs, project size, timeline, and procurement or training needs.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
