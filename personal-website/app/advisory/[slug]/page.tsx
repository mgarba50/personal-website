import { notFound } from "next/navigation";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { advisoryServices } from "@/lib/content";
import { jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return advisoryServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = advisoryServices.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/advisory/${service.slug}`,
  });
}

export default async function AdvisoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = advisoryServices.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@type": "Person",
            name: "Musa Allama",
          },
        })}
      />
      <PageHero
        eyebrow="Strategic Advisory"
        title={service.title}
        copy={service.description}
        primaryCta={{ label: "Book session", href: `/checkout?type=advisory&slug=${service.slug}`, action: "book_advisory" }}
        secondaryCta={{ label: "Send inquiry", href: "#inquiry", action: "send_inquiry" }}
      />
      <ConversionStrip title="Advisory detail pages should create paid bookings or qualified inquiries." />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article className="grid gap-6">
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Who it is for</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {service.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Problems solved</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {service.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Deliverables</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section id="inquiry" className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Inquiry form</h2>
              <div className="mt-5">
                <InquiryForm />
              </div>
            </section>
          </article>
          <PaymentPanel title={service.shortTitle} productType="advisory" slug={service.slug} price={service.price} />
        </div>
      </section>
    </>
  );
}
