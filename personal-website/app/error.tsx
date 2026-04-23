"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-20 text-center md:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">System notice</p>
      <h1 className="font-serif text-5xl text-text">A route-level issue interrupted this request.</h1>
      <p className="text-base leading-8 text-muted">{error.message}</p>
      <div className="flex items-center justify-center gap-4">
        <button onClick={reset} className="rounded-full border border-accent bg-accent px-5 py-3 text-sm uppercase tracking-[0.16em] text-white">
          Retry
        </button>
        <Link href="/" className="text-sm uppercase tracking-[0.18em] text-accent">
          Return home
        </Link>
      </div>
    </main>
  );
}
