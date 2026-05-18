import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Institutional Impact",
  description:
    "Education support, agriculture training, youth skills development, knowledge preservation, scholarships, endowment inquiries, and partnerships.",
  path: "/impact",
});

const initiatives = [
  "Education support",
  "Agriculture training",
  "Youth skills development",
  "Knowledge preservation",
  "Scholarships",
  "Endowment inquiries",
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutional Impact"
        title="Legacy, education, agriculture, and knowledge preservation."
        copy="A partnership center for initiatives that support learning, agricultural capability, youth skills, scholarships, and long-term institutional memory."
        primaryCta={{ label: "Partner with us", href: "#partner" }}
        secondaryCta={{ label: "Support initiative", href: "#partner" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Impact areas"
            title="Support an educational, agricultural, or publishing initiative"
            copy="Partnership and endowment inquiries can be routed through the Diplomatic Desk for review."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={initiative}>
                <h3 className="display text-3xl font-semibold text-deep">{initiative}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Program details, partner documentation, outcomes, and funding notes can be managed through the content
                  system.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partner" className="bg-white/55 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Partner with us</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Send an institutional partnership inquiry.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Include project scope, location, intended beneficiaries, budget range, and partnership expectations.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
