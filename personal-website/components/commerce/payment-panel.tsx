import Link from "next/link";
import { bankDetails } from "@/lib/revenue";

type PaymentPanelProps = {
  title: string;
  productType: string;
  slug: string;
  price: string;
};

export function PaymentPanel({ title, productType, slug, price }: PaymentPanelProps) {
  const checkoutHref = `/checkout?type=${productType}&slug=${slug}&provider=manual`;
  const actionLabel = productType === "book" ? "Buy PDF" : "Start manual order";
  const deliveryLabel = productType === "book" ? "Book access" : "Access or booking confirmation";

  return (
    <aside className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Manual bank transfer</p>
      <h2 className="display mt-3 text-3xl font-semibold text-deep">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Complete your order by bank transfer, upload your receipt, and wait for manual approval. {deliveryLabel} is delivered after payment confirmation.
      </p>
      <p className="mt-5 text-lg font-semibold text-deep">{price}</p>
      <div className="mt-5 rounded-md border border-line bg-vellum/70 p-4 text-sm leading-7 text-charcoal">
        <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
        <p><strong>Bank:</strong> {bankDetails.bank}</p>
      </div>
      <div className="mt-6 grid gap-3">
        <Link
          className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
          data-conversion="manual_checkout_started"
          data-conversion-label={title}
          href={checkoutHref}
        >
          {actionLabel}
        </Link>
        {productType === "book" ? (
          <>
            <Link
              className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-gold"
              data-conversion="preview_click"
              data-conversion-label={title}
              href={`/books/${slug}#preview`}
            >
              Preview sample
            </Link>
            <Link
              className="rounded-md border border-deep/15 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-vellum"
              data-conversion="print_copy_request"
              data-conversion-label={title}
              href={`/contact?inquiry=print-copy&product=${slug}`}
            >
              Request print copy
            </Link>
          </>
        ) : null}
      </div>
    </aside>
  );
}
