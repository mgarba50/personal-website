import { PageHero } from "@/components/ui/page-hero";
import { legalDisclaimer } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Consulting Disclaimer",
  description: "Consulting and advisory disclaimer for MusaAllama.com.",
  path: "/legal/consulting-disclaimer",
});

export default function ConsultingDisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Consulting Disclaimer"
        copy="Important limits for educational, business, agriculture, and strategic advisory content."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Professional advice</h2>
          <p>{legalDisclaimer}</p>
          <h2>Agriculture and business risk</h2>
          <p>
            Agricultural input use, procurement, importing, pricing, business formation, taxation, and regulated activity
            may require qualified local professionals, official product labels, and relevant government guidance.
          </p>
          <h2>Advisory scope</h2>
          <p>
            Advisory sessions provide strategic thinking, planning support, and practical recommendations. They do not
            guarantee business results, regulatory approval, supplier performance, financial return, or market outcomes.
          </p>
        </article>
      </section>
    </>
  );
}
