import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-center md:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Payment status</p>
      <h1 className="font-serif text-5xl text-text">Payment not completed</h1>
      <p className="text-base leading-8 text-muted">
        This page is prepared for cancelled or failed checkout flows and can be expanded with retry options, support links, and alternative payment rails.
      </p>
      <Link href="/contact" className="inline-flex text-sm uppercase tracking-[0.18em] text-accent">
        Contact the desk
      </Link>
    </main>
  );
}
