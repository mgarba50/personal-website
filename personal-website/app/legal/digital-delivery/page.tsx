import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Digital Product Delivery Policy",
  description: "Digital Product Delivery Policy for MusaAllama.com.",
  path: "/legal/digital-delivery",
});

export default function DigitalDeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Digital Product Delivery Policy"
        copy="How purchased PDFs, EPUBs, bundles, downloads, and course files are delivered."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Delivery channels</h2>
          <p>
            Digital products may be delivered through the member dashboard, email confirmation, secure expiring links, or
            manual admin release after verified bank transfer.
          </p>
          <h2>Access and security</h2>
          <p>
            Download links should be tied to completed orders and may expire after a configured period. Sharing paid files
            or private access links is not permitted.
          </p>
          <h2>Failed delivery</h2>
          <p>
            Users should contact the Diplomatic Desk with order reference, payment provider, and account email if delivery
            does not appear after payment confirmation.
          </p>
        </article>
      </section>
    </>
  );
}
