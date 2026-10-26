import Link from "next/link";
import { academyBundles, academyProducts } from "@/content/academy";
import { ManualPaymentForm } from "@/components/commerce/manual-payment-form";
import { PageHero } from "@/components/ui/page-hero";
import { advisoryServices, courses, membershipTiers } from "@/lib/content";
import { bankDetails } from "@/lib/revenue";
import { pageMetadata } from "@/lib/seo";
import { siteContact } from "@/lib/site-contact";

export const metadata = pageMetadata({
  title: "Checkout",
  description:
    "Manual bank-transfer checkout for approved MusaAllama.com products and services.",
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
    const book = academyProducts.find((item) => item.slug === slug);

    if (book) {
      if (!book.purchasable || !book.launchPrice) {
        return {
          title: book.title,
          amount: book.priceLabel ?? "Not open for payment",
          purchasable: false,
          reason:
            "This edition is visible in the Academy but is not currently open for payment.",
        };
      }

      return {
        title: book.title,
        amount: book.launchPrice,
        purchasable: true,
      };
    }
  }

  if (type === "bundle") {
    const bundle = academyBundles.find((item) => item.slug === slug);
    if (bundle) {
      return {
        title: bundle.title,
        amount: bundle.launchPrice,
        purchasable: bundle.purchasable,
      };
    }
  }

  if (type === "course") {
    const course = courses.find((item) => item.slug === slug);
    if (course) {
      return {
        title: course.title,
        amount: course.price,
        purchasable: true,
      };
    }
  }

  if (type === "advisory") {
    const service = advisoryServices.find((item) => item.slug === slug);
    if (service) {
      return {
        title: service.shortTitle,
        amount: service.price,
        purchasable: true,
      };
    }
  }

  if (type === "membership") {
    const tier = membershipTiers.find((item) => item.slug === slug);
    if (tier) {
      return {
        title: tier.title,
        amount: tier.price,
        purchasable: true,
      };
    }
  }

  return {
    title: "Selected product",
    amount: "Confirm amount before transfer",
    purchasable: false,
    reason:
      "A valid product was not selected. Return to the relevant product page before transferring funds.",
  };
}

function createOrderNumber(type?: string, slug?: string) {
  const productCode = (slug ?? "order").replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase() || "ORD";
  const typeCode = (type ?? "manual").replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "MAN";
  const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `MA-${typeCode}-${productCode}-${dateCode}`;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; slug?: string }>;
}) {
  const params = await searchParams;
  const product = findProduct(params.type, params.slug);
  const orderNumber = createOrderNumber(params.type, params.slug);

  if (!product.purchasable) {
    return (
      <>
        <PageHero
          eyebrow="Availability"
          title={product.title}
          copy={
            product.reason ??
            "This product is not currently available for purchase."
          }
          primaryCta={{
            label: "Return to Academy",
            href: "/academy",
            action: "view_academy",
          }}
          secondaryCta={{
            label: "Ask about availability",
            href: siteContact.whatsappHref,
            action: "send_inquiry",
          }}
        />
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Manual Checkout"
        title="Complete Your Book Order"
        copy="Transfer the correct amount, upload your payment proof, and keep the order number for confirmation."
        primaryCta={{
          label: "Return to Academy",
          href: "/academy",
          action: "view_academy",
        }}
        secondaryCta={{
          label: "Need help",
          href: siteContact.whatsappHref,
          action: "send_inquiry",
        }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-line bg-white/80 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
              Step 1
            </p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep">
              Transfer the correct amount.
            </h2>

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
                <p>Upload your receipt or screenshot using the secure form.</p>
              </div>
              <div>
                <p className="font-semibold text-deep">Step 3</p>
                <p>
                  Your payment will be reviewed. Once confirmed, access will be
                  delivered by email, dashboard, or secure link.
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-6 text-muted">
              Do not make a payment for any product whose page does not show an
              active Buy PDF button.
            </p>
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
