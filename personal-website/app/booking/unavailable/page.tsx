import Link from "next/link";

export default function BookingUnavailablePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-center md:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Booking availability</p>
      <h1 className="font-serif text-5xl text-text">This booking corridor is not currently available</h1>
      <p className="text-base leading-8 text-muted">
        For premium services, availability may depend on qualification, current capacity, or payment status. Use the correct intake route to keep the process moving.
      </p>
      <Link href="/advisory" className="inline-flex text-sm uppercase tracking-[0.18em] text-accent">
        Return to advisory
      </Link>
    </main>
  );
}
