import { PageHero } from "@/components/ui/page-hero";
import { legalDisclaimer } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for MusaAllama.com.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        copy="Baseline terms for using MusaAllama.com, purchasing digital products, enrolling in courses, booking advisory, and joining memberships."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Use of the platform</h2>
          <p>
            MusaAllama.com provides publishing, education, advisory, membership, agriculture, and digital product services.
            Users agree to use the platform lawfully and to provide accurate information during purchases, inquiries, and
            account registration.
          </p>
          <h2>Purchases and access</h2>
          <p>
            Digital products, courses, memberships, and consulting offers may be delivered through user dashboards, secure
            download links, email, or scheduled sessions. Access can be suspended for fraud, chargebacks, abuse, or policy
            violations.
          </p>
          <h2>Disclaimer</h2>
          <p>{legalDisclaimer}</p>
        </article>
      </section>
    </>
  );
}
