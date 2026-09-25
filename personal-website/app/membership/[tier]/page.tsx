import { notFound } from "next/navigation";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PaymentPanel } from "@/components/commerce/payment-panel";
import { PageHero } from "@/components/ui/page-hero";
import { membershipTiers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return membershipTiers.map((tier) => ({ tier: tier.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = membershipTiers.find((item) => item.slug === slug);
  if (!tier) return {};
  return pageMetadata({
    title: tier.title,
    description: tier.description,
    path: `/membership/${tier.slug}`,
  });
}

export default async function MembershipTierPage({ params }: { params: Promise<{ tier: string }> }) {
  const { tier: slug } = await params;
  const tier = membershipTiers.find((item) => item.slug === slug);
  if (!tier) notFound();

  return (
    <>
      <PageHero
        eyebrow="Membership Circle"
        title={tier.title}
        copy={tier.description}
        primaryCta={{ label: "Apply / Join", href: `/checkout?type=membership&slug=${tier.slug}`, action: "apply_membership" }}
        secondaryCta={{ label: "Member support", href: "/dashboard", action: "open_dashboard" }}
      />
      <ConversionStrip title="Review the benefits, choose your circle, or contact support if you are already a member." />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <article className="grid gap-6">
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Who it is for</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{tier.audience}</p>
            </section>
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">Benefits</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border border-line bg-white/80 p-7">
              <h2 className="display text-3xl font-semibold text-deep">How access works</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                After joining, membership access and benefits are confirmed directly. Existing members can use the support desk for renewals, access questions, benefit requests, and upgrades.
              </p>
            </section>
          </article>
          <PaymentPanel title={tier.title} productType="membership" slug={tier.slug} price={tier.price} />
        </div>
      </section>
    </>
  );
}
