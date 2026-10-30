import { randomUUID } from "node:crypto";
import Link from "next/link";
import { ManualPaymentForm } from "@/components/commerce/manual-payment-form";
import { PageHero } from "@/components/ui/page-hero";
import { findCheckoutProduct } from "@/lib/checkout";
import { bankDetails } from "@/lib/revenue";
import { siteContact } from "@/lib/site-contact";
export const dynamic = "force-dynamic";
export const metadata = { title: "Checkout", robots: { index: false, follow: false } };

export default async function Checkout({ searchParams }: { searchParams: Promise<{ type?: string; slug?: string }> }) {
  const query = await searchParams;
  const product = findCheckoutProduct(query.type, query.slug);
  if (!product.purchasable) return <PageHero eyebrow="Availability" title={product.title} copy={product.reason || "This edition is not open for payment."} primaryCta={{ label: "Return to Academy", href: "/academy" }} secondaryCta={{ label: "Ask about availability", href: siteContact.whatsappHref }} />;
  return <>
    <PageHero eyebrow="Book order" title="Order your approved edition" copy="Create your order first, transfer the displayed amount using its reference, then upload the receipt for bank verification." primaryCta={{ label: "Return to Academy", href: "/academy" }} secondaryCta={{ label: "Order support", href: siteContact.whatsappHref }} />
    <section className="px-5 py-16"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
      <aside className="rounded-lg border border-line bg-white/80 p-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-burgundy">Your selection</p>
        <h2 className="display mt-3 text-3xl font-semibold text-deep">{product.title}</h2>
        <p className="mt-4 text-xl font-semibold">{product.amount}</p>
        <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-7 text-muted"><li>Create an order to receive its payment reference.</li><li>Transfer the exact amount and upload a receipt.</li><li>The order desk checks the bank transaction. Approved files are delivered by a protected email link.</li></ol>
        <p className="mt-6 text-sm leading-7 text-muted">A receipt upload is a request for review. Please keep your order number and avoid paying twice.</p>
        <p className="mt-5 text-sm"><Link className="underline" href="/login">Sign in</Link> to associate a new order with your account, or continue as a guest.</p>
      </aside>
      <ManualPaymentForm key={`${query.type}:${query.slug}`} title={product.title} productType={query.type || "book"} slug={query.slug || ""} amount={product.amount} requestKey={randomUUID()} bank={bankDetails} />
    </div></section>
  </>;
}
