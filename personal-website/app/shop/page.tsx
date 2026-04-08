import { products } from "@/content/collections/products";
import { profile } from "@/content/profile";
import { paymentChannels, getPaymentStatusSummary } from "@/lib/payments";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Shop and Digital Products | Musa Allama",
  path: "/shop"
});

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Shop and Digital Products"
        title="A premium corridor for frameworks, dossiers, digital releases, course seats, and advisory deposits."
        summary="The shop is designed around premium digital PDFs, executive certifications, institutional direct orders, clean commerce, and protected fulfillment readiness rather than noisy catalog behavior."
      >
        <Card>
          <CardEyebrow>Payment status</CardEyebrow>
          <CardTitle>{getPaymentStatusSummary()}</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The build supports international, regional, and manual transfer corridors, with enterprise flows routed toward quote and invoice handling.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Products"
          title="Seed products and commercial corridors"
          description="Each item is modeled with price, access method, and fulfillment posture so later checkout integrations have a structured base."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <Card key={product.slug}>
              <img src={product.cover} alt={`${product.name} product cover`} className="h-64 w-full rounded-[22px] border border-line object-cover" />
              <CardEyebrow>{product.type}</CardEyebrow>
              <CardTitle>{product.name}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{product.description}</p>
              <div className="mt-5 border-t border-line pt-5 text-sm leading-7">
                <p className="text-text">{product.price}</p>
                <p className="text-muted">{product.accessMethod}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Treasury architecture"
          title="Payment rails are visible before live keys are added"
          description="Stripe, Paystack or Flutterwave, and manual corporate transfer are all represented so the commercial layer remains honest during local testing and content onboarding."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {paymentChannels.map((channel) => (
            <Card key={channel.name}>
              <CardEyebrow>{channel.configured ? "Configured" : "Awaiting keys"}</CardEyebrow>
              <CardTitle>{channel.name}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{channel.audience}</p>
            </Card>
          ))}
        </div>
        <Card>
          <CardEyebrow>Manual corporate transfer</CardEyebrow>
          <CardTitle>{profile.bankTransfer.accountName}</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            Bank: {profile.bankTransfer.bankName}
          </p>
          <p className="text-sm leading-7 text-muted">
            Account number: {profile.bankTransfer.accountNumber}
          </p>
        </Card>
      </section>
    </main>
  );
}
