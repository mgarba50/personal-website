import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { advisoryServices, books, courses, membershipTiers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Payment-ready checkout route for books, courses, advisory, memberships, and manual bank transfer.",
  path: "/checkout",
});

function findTitle(type?: string, slug?: string) {
  if (type === "book") return books.find((item) => item.slug === slug)?.title;
  if (type === "course") return courses.find((item) => item.slug === slug)?.title;
  if (type === "advisory") return advisoryServices.find((item) => item.slug === slug)?.shortTitle;
  if (type === "membership") return membershipTiers.find((item) => item.slug === slug)?.title;
  return "Selected product";
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; slug?: string; provider?: string }>;
}) {
  const params = await searchParams;
  const title = findTitle(params.type, params.slug) ?? "Selected product";
  const provider = params.provider ?? "stripe";

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title={title}
        copy="This V1 payment route is ready for Stripe, Paystack, Flutterwave, and manual bank transfer integration."
        primaryCta={{ label: "Return to products", href: "/books", action: "view_book_catalog" }}
        secondaryCta={{ label: "Need help", href: "/contact", action: "send_inquiry" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <article className="rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Payment provider</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep">{provider}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              In production, this route should create an order, initialize the selected provider checkout, receive webhook
              confirmation, unlock the product, send confirmation email, and place secure expiring download links in the
              user dashboard.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link
                className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                data-conversion="select_payment_stripe"
                data-conversion-label={title}
                href={`/checkout?type=${params.type ?? "book"}&slug=${params.slug ?? ""}&provider=stripe`}
              >
                Stripe
              </Link>
              <Link
                className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                data-conversion="select_payment_paystack"
                data-conversion-label={title}
                href={`/checkout?type=${params.type ?? "book"}&slug=${params.slug ?? ""}&provider=paystack`}
              >
                Paystack
              </Link>
              <Link
                className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                data-conversion="select_payment_flutterwave"
                data-conversion-label={title}
                href={`/checkout?type=${params.type ?? "book"}&slug=${params.slug ?? ""}&provider=flutterwave`}
              >
                Flutterwave
              </Link>
            </div>
          </article>

          <form action="/api/manual-payment" method="post" className="rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Manual bank transfer</p>
            <h2 className="display mt-3 text-3xl font-semibold text-deep">Submit payment proof</h2>
            <input type="hidden" name="type" value={params.type ?? ""} />
            <input type="hidden" name="slug" value={params.slug ?? ""} />
            <div className="mt-5 grid gap-3">
              <input className="field rounded-md" name="name" placeholder="Name" required />
              <input className="field rounded-md" name="email" placeholder="Email" type="email" required />
              <input className="field rounded-md" name="reference" placeholder="Transfer reference" required />
              <textarea className="field min-h-32 rounded-md" name="notes" placeholder="Payment notes or proof link" />
              <button
                className="rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                data-conversion="submit_manual_payment"
                data-conversion-label={title}
                type="submit"
              >
                Submit for verification
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
