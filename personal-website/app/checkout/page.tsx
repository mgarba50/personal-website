import Link from "next/link";
import { ManualPaymentForm } from "@/components/commerce/manual-payment-form";
import { PageHero } from "@/components/ui/page-hero";
import { advisoryServices, books, courses, membershipTiers } from "@/lib/content";
import { bankDetails, bundleOffers } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manual Checkout",
  description: "Manual bank-transfer checkout for MusaAllama.com books and Phase 1 revenue products.",
  path: "/checkout",
});

function findProduct(type?: string, slug?: string) {
  if (type === "book") {
    const book = books.find((item) => item.slug === slug);
    if (book) return { title: book.title, amount: book.launchPrice ?? book.price };
  }
  if (type === "bundle") {
    const bundle = bundleOffers.find((item) => item.slug === slug);
    if (bundle) return { title: bundle.title, amount: bundle.price };
  }
  if (type === "course") {
    const course = courses.find((item) => item.slug === slug);
    if (course) return { title: course.title, amount: course.price };
  }
  if (type === "advisory") {
    const service = advisoryServices.find((item) => item.slug === slug);
    if (service) return { title: service.shortTitle, amount: service.price };
  }
  if (type === "membership") {
    const tier = membershipTiers.find((item) => item.slug === slug);
    if (tier) return { title: tier.title, amount: tier.price };
  }
  return { title: "Selected product", amount: "Confirm amount before transfer" };
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

  return (
    <>
      <PageHero
        eyebrow="Manual Checkout"
        title="Complete Your Book Order"
        copy="Manual bank transfer is the active V1 payment method. Automated checkout will come later."
        primaryCta={{ label: "Return to books", href: "/books", action: "view_book_catalog" }}
        secondaryCta={{ label: "Need help", href: "/contact", action: "send_inquiry" }}
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
                <p>Upload your payment receipt or screenshot with your name, email, and WhatsApp number.</p>
              </div>
              <div>
                <p className="font-semibold text-deep">Step 3</p>
                <p>Your order will be reviewed and approved. Once confirmed, book access will be delivered by email or made available in your dashboard.</p>
              </div>
            </div>
            <Link
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep"
              data-conversion="send_inquiry"
              data-conversion-label={`Checkout help for ${product.title}`}
              href="/contact"
            >
              Contact support
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
