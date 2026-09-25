import { ServiceCard } from "@/components/cards/service-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
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
        title="Private advisory for business, agriculture, publishing, and digital work."
        copy="Consulting for business planning, agriculture, publishing, China sourcing communication, AI workflows, and digital transformation."
        primaryCta={{ label: "Book session", href: "/advisory/strategic-session", action: "book_advisory" }}
        secondaryCta={{ label: "Send inquiry", href: "#inquiry", action: "send_inquiry" }}
      />
      <ConversionStrip title="Choose the advisory service that fits your objective, or send an inquiry for a tailored engagement." />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Advisory Services"
            title="Practical support for complex decisions"
            copy="Explore focused advisory services across business, agriculture, publishing, sourcing, and digital systems."
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Inquiry</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Tell us what you are trying to achieve.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Share the context, intended outcome, timeline, budget range if useful, and preferred contact method.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
