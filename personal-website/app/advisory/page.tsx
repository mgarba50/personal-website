import { ServiceCard } from "@/components/cards/service-card";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { advisoryServices } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Strategic Advisory",
  description:
    "Private consulting for business, agriculture, publishing, digital systems, China sourcing, and institutional planning.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategic Advisory"
        title="Private advisory for serious institutional work."
        copy="Consulting for business, agriculture, publishing, China sourcing communication, AI workflows, and digital transformation."
        primaryCta={{ label: "Book session", href: "/advisory/strategic-session" }}
        secondaryCta={{ label: "Send inquiry", href: "#inquiry" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Consulting products"
            title="Commercially clear advisory offers"
            copy="Each service is packaged with problems solved, deliverables, price placeholder, booking route, and inquiry form."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advisoryServices.map((service) => (
              <ServiceCard service={service} key={service.slug} />
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-white/60 px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Inquiry form</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Send a serious advisory request.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Include context, intended outcome, urgency, budget range if useful, and preferred contact method.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
