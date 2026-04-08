import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-20 text-center md:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="font-serif text-5xl text-text">The requested page is not in the current archive.</h1>
      <p className="text-base leading-8 text-muted">
        The route may have moved, the record may not yet be published, or the link may be incomplete.
      </p>
      <Link href="/search" className="inline-flex text-sm uppercase tracking-[0.18em] text-accent">
        Search the platform
      </Link>
    </main>
  );
}
