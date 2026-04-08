import { notFound } from "next/navigation";
import { bookVolumes, books } from "@/content/collections/books";
import { findBookBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { HeroBlock } from "@/components/ui/hero-block";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = findBookBySlug(slug);
  if (!book) {
    return buildMetadata({ title: "Book not found", path: "/canon" });
  }

  return buildMetadata({
    title: `${book.title} | The Canon`,
    description: book.abstract,
    path: `/canon/${book.slug}`
  });
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = findBookBySlug(slug);
  if (!book) {
    notFound();
  }

  const volumeLabel =
    bookVolumes.find((volume) => volume.id === book.volume)?.title || book.volume;

  return (
    <main className="mx-auto max-w-shell space-y-12 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock eyebrow="Book record" title={book.title} summary={book.abstract}>
        <Card>
          <img src={book.cover} alt={`${book.title} cover`} className="h-80 w-full rounded-[22px] border border-line object-cover" />
        </Card>
      </HeroBlock>

      <DataTable
        rows={[
          { label: "Volume", value: volumeLabel },
          { label: "Subtitle", value: book.subtitle },
          { label: "Themes", value: book.themes },
          { label: "Audience", value: book.audience },
          { label: "Languages", value: book.languages },
          { label: "Formats", value: book.formats },
          { label: "Status", value: book.status },
          { label: "Commerce mode", value: book.commerceMode },
          { label: "Commercial tier", value: book.commercialTier || "Standard release corridor" }
        ]}
      />

      <Card>
        <CardEyebrow>Excerpt</CardEyebrow>
        <CardTitle>Pre-read selection</CardTitle>
        <div className="mt-5 space-y-5 text-base leading-8 text-muted">
          {book.excerpt.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Request access</ButtonLink>
          <ButtonLink href="/shop" variant="secondary">
            View product corridor
          </ButtonLink>
        </div>
      </Card>
    </main>
  );
}
