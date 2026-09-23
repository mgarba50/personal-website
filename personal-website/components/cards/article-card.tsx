import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  const articleHref = `/library/${article.slug}`;

  return (
    <article className="group rounded-lg border border-line bg-white/75 p-6 transition duration-200 hover:-translate-y-1 hover:border-gold hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">{article.category}</p>
      <h3 className="display mt-3 text-3xl font-semibold leading-tight text-deep">
        <Link className="transition hover:text-burgundy" href={articleHref}>
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted">{article.excerpt}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="text-muted">{article.readingTime}</span>
        <Link
          className="rounded-md border border-line px-3 py-2 font-semibold uppercase tracking-[0.14em] text-burgundy transition hover:border-gold hover:text-deep"
          data-conversion="read_library_article"
          data-conversion-label={article.title}
          href={articleHref}
        >
          Read brief
        </Link>
      </div>
    </article>
  );
}
