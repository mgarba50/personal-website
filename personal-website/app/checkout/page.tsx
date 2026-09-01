import Link from "next/link";
import { ManualPaymentForm } from "@/components/commerce/manual-payment-form";
import { PageHero } from "@/components/ui/page-hero";
import { advisoryServices, books, courses, membershipTiers } from "@/lib/content";
import { bankDetails, bundleOffers } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";
import { siteContact } from "@/lib/site-contact";

export const metadata = pageMetadata({
  title: "Manual Checkout",
  description: "Manual bank-transfer checkout for MusaAllama.com books and Phase 1 revenue products.",
  path: "/checkout",
});

type CheckoutProduct = {
  title: string;
  amount: string;
  purchasable: boolean;
  reason?: string;
};

function findProduct(type?: string, slug?: string): CheckoutProduct {
  if (type === "book") {
    const book = books.find((item) => item.slug === slug);
    if (book) {
      if (!book.isFlagship) {
        return {
          title: book.title,
          amount: "Coming soon",
          purchasable: false,
          reason: "This title is listed in the Canon but is not currently open for payment or paid-file delivery.",
        };
      }
      return { title: book.title, amount: book.launchPrice ?? book.price, purchasable: true };
    }
  }
  if (type === "bundle") {
    const bundle = bundleOffers.find((item) => item.slug === slug);
    if (bundle) return { title: bundle.title, amount: bundle.price, purchasable: true };
  }
  if (type === "course") {
    const course = courses.find((item) => item.slug === slug);
    if (course) return { title: course.title, amount: course.price, purchasable: true };
  }
  if (type === "advisory") {
    const service = advisoryServices.find((item) => item.slug === slug);
    if (service) return { title: service.shortTitle, amount: service.price, purchasable: true };
  }
  if (type === "membership") {
    const tier = membershipTiers.find((item) => item.slug === slug);
    if (tier) return { title: tier.title, amount: tier.price, purchasable: true };
  }
  return {
    title: "Selected product",
    amount: "Confirm amount before transfer",
    purchasable: false,
    reason: "A valid purchasable product was not selected. Please return to the relevant product page before making a transfer.",
  };
}

function createOrderNumber(type?: string, slug?: string) {
  const productCode = (slug ?? "order").slice(0, 3).toUpperCase();
  const typeCode = (type ?? "manual").slice(0, 2).toUpperCase();
  return `MA-${typeCode}-${productCode}-${Date.now().toString(36).toUpperCase()}`;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; slug?: string; provider?: string }>;
}) {
  const params = await searchParams;
  const product = findProduct(params.type, params.slug);
  const orderNumber = createOrderNumber(params.type, params.slug);

  if (!product.purchasable) {
    return (
      <>
        <PageHero
          eyebrow="Publication status"
          title={product.title}
          copy={product.reason ?? "This product is not currently open for payment."}
          primaryCta={{ label: "Return to the Canon", href: "/books", action: "view_book_catalog" }}
          secondaryCta={{ label: "Send an inquiry", href: siteContact.whatsappHref, action: "send_inquiry" }}
        />
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">No payment requested</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep">Coming soon — do not transfer funds for this title.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              The book may remain visible in the MusaAllama Canon for publication discovery, but checkout and paid-file delivery stay disabled until an approved release price and delivery path are active.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-md bg-deep px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vellum"
                href="/books"
              >
                Browse available books
              </Link>
              <Link
                className="rounded-md border border-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-deep"
                href={siteContact.whatsappHref}
              >
                Ask about publication
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Manual Checkout"
        title="Complete Your Order"
        copy="Manual bank transfer is the active V1 payment method for books, bundles, courses, advisory, and membership."
        primaryCta={{ label: "Return to books", href: "/books", action: "view_book_catalog" }}
        secondaryCta={{ label: "Need help", href: siteContact.whatsappHref, action: "send_inquiry" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Step 1</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep">Transfer the correct amount.</h2>
            <div className="mt-6 rounded-md border border-line bg-vellum/70 p-5 text-sm leading-7 text-charcoal">
              <p><strong>Product:</strong> {product.title}</p>
              <p><strong>Amount:</strong> {product.amount}</p>
              <p><strong>Order Number:</strong> {orderNumber}</p>
            </div>
            <div className="mt-5 rounded-md border border-line bg-white p-5 text-sm leading-7 text-charcoal">
              <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
              <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
              <p><strong>Bank:</strong> {bankDetails.bank}</p>
              <p className="mt-2 text-muted">{bankDetails.notice}</p>
            </div>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
              <div>
                <p className="font-semibold text-deep">Step 2</p>
                <p>
                  Upload your payment receipt below, or email it to {siteContact.email} with your order number, name,
                  and WhatsApp number.
                </p>
              </div>
              <div>
                <p className="font-semibold text-deep">Step 3</p>
                <p>Your order will be reviewed and approved. Once confirmed, book access will be delivered privately by email or secure dashboard link.</p>
              </div>
            </div>
            <Link
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
              data-conversion="send_inquiry"
              data-conversion-label={`Checkout help for ${product.title}`}
              href={siteContact.whatsappHref}
            >
              Contact order support
            </Link>
          </article>

          <ManualPaymentForm
            title={product.title}
            productType={params.type ?? "book"}
            slug={params.slug ?? ""}
            amount={product.amount}
            orderNumber={orderNumber}
          />
        </div>
      </section>
    </>
  );
}
