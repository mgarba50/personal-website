import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: "Refund Policy for books, courses, consulting, memberships, and digital products.",
  path: "/legal/refund",
});

export default function RefundPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        copy="Refund guidance for digital products, courses, consulting bookings, memberships, and manual payments."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Digital products</h2>
          <p>
            Because digital products can be accessed immediately, refunds are generally limited once files have been
            delivered. Exceptions may be reviewed for duplicate purchases, failed delivery, or clear technical errors.
          </p>
          <h2>Courses and memberships</h2>
          <p>
            Course and membership refund windows should be configured before launch. Access may be removed when a refund is
            approved.
          </p>
          <h2>Consulting</h2>
          <p>
            Consulting bookings may be rescheduled according to the active booking terms. Missed sessions, late
            cancellations, or completed advisory sessions are typically not refundable.
          </p>
        </article>
      </section>
    </>
  );
}
