import Link from "next/link";
import type { Book } from "@/lib/content";

const toneClasses: Record<string, string> = {
  emerald: "from-emerald to-deep",
  navy: "from-navy to-deep",
  gold: "from-gold to-burgundy",
  burgundy: "from-burgundy to-deep",
  deep: "from-deep to-navy",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="grid h-full gap-5 rounded-lg border border-line bg-white/75 p-5 shadow-sm">
      <div
        className={`flex aspect-[4/5] flex-col justify-between rounded-md bg-gradient-to-br ${
          toneClasses[book.coverTone] ?? toneClasses.deep
        } p-5 text-vellum`}
      >
        <span className="text-xs uppercase tracking-[0.18em] text-gold">{book.category}</span>
        <h3 className="display text-3xl font-semibold leading-none">{book.title}</h3>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">{book.category}</p>
        <h3 className="display mt-2 text-2xl font-semibold text-deep">{book.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{book.description}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-sm font-semibold text-deep">{book.price}</span>
        <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href={`/books/${book.slug}`}>
          View book
        </Link>
      </div>
    </article>
  );
}
