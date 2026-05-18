import Link from "next/link";

type PaymentPanelProps = {
  title: string;
  productType: string;
  slug: string;
  price: string;
};

export function PaymentPanel({ title, productType, slug, price }: PaymentPanelProps) {
  return (
    <aside className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Secure purchase flow</p>
      <h2 className="display mt-3 text-3xl font-semibold text-deep">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Stripe, Paystack, Flutterwave, and manual bank transfer are represented in this V1 flow. Live keys can be added
        through environment variables.
      </p>
      <p className="mt-5 text-lg font-semibold text-deep">{price}</p>
      <div className="mt-6 grid gap-3">
        <Link
          className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy"
          data-conversion={`checkout_${productType}_stripe`}
          data-conversion-label={title}
          href={`/checkout?type=${productType}&slug=${slug}&provider=stripe`}
        >
          Pay with Stripe
        </Link>
        <Link
          className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-gold"
          data-conversion={`checkout_${productType}_paystack_flutterwave`}
          data-conversion-label={title}
          href={`/checkout?type=${productType}&slug=${slug}&provider=paystack`}
        >
          Paystack / Flutterwave
        </Link>
        <Link
          className="rounded-md border border-deep/15 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep transition hover:bg-vellum"
          data-conversion={`checkout_${productType}_manual`}
          data-conversion-label={title}
          href={`/checkout?type=${productType}&slug=${slug}&provider=manual`}
        >
          Manual bank transfer
        </Link>
      </div>
    </aside>
  );
}
