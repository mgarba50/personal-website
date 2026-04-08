import { notFound } from "next/navigation";
import { articles } from "@/content/collections/articles";
import { findArticleBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { HeroBlock } from "@/components/ui/hero-block";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    return buildMetadata({ title: "Article not found", path: "/library" });
  }

  return buildMetadata({
    title: `${article.title} | Living Library`,
    description: article.summary,
    path: `/library/${article.slug}`
  });
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-shell space-y-12 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock eyebrow={article.category} title={article.title} summary={article.summary}>
        <Card>
          <img src={article.cover} alt={`${article.title} cover`} className="h-72 w-full rounded-[22px] border border-line object-cover" />
        </Card>
      </HeroBlock>

      <DataTable
        rows={[
          { label: "Date", value: article.date },
          { label: "Reading time", value: article.readingTime },
          { label: "Tags", value: article.tags },
          { label: "PDF dossier", value: article.downloadablePdf ? "Available on request" : "Not currently attached" }
        ]}
      />

      <Card>
        <div className="prose-executive max-w-none">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>
    </main>
  );
}
