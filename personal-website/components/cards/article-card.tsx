import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-lg border border-line bg-white/75 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">{article.category}</p>
      <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep">{article.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{article.excerpt}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="text-muted">{article.readingTime}</span>
        <Link className="font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href={`/library/${article.slug}`}>
          Read brief
        </Link>
      </div>
    </article>
  );
}
