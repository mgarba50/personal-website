import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-center md:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Payment status</p>
      <h1 className="font-serif text-5xl text-text">Payment confirmed</h1>
      <p className="text-base leading-8 text-muted">
        This success page is ready for post-payment fulfillment messaging, receipt routing, and optional impact contribution acknowledgement.
      </p>
      <Link href="/shop" className="inline-flex text-sm uppercase tracking-[0.18em] text-accent">
        Return to shop
      </Link>
    </main>
  );
}
