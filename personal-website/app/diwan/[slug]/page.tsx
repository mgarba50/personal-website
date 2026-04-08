import { notFound } from "next/navigation";
import { poems } from "@/content/collections/poems";
import { findPoemBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { HeroBlock } from "@/components/ui/hero-block";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";

export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = findPoemBySlug(slug);
  if (!poem) {
    return buildMetadata({ title: "Poem not found", path: "/diwan" });
  }

  return buildMetadata({
    title: `${poem.title} | The Diwan`,
    description: poem.summary,
    path: `/diwan/${poem.slug}`
  });
}

export default async function PoemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = findPoemBySlug(slug);
  if (!poem) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-shell space-y-12 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock eyebrow={poem.collection} title={poem.title} summary={poem.summary}>
        <Card>
          <CardEyebrow>{poem.commercialTier || "Audio corridor"}</CardEyebrow>
          <CardTitle>{poem.audioLabel}</CardTitle>
          <div className="mt-5 rounded-3xl border border-line bg-surface-strong/70 p-4">
            <audio controls className="w-full">
              <source src="" />
            </audio>
          </div>
        </Card>
      </HeroBlock>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardEyebrow>Archive profile</CardEyebrow>
          <CardTitle>{(poem.languages || []).join(" | ")}</CardTitle>
          {poem.arabicText.length > 0 ? (
            <div dir="rtl" className="mt-6 space-y-4 font-arabic text-3xl leading-[1.9] text-text">
              {poem.arabicText.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-8 text-muted">
              Full Arabic excerpt will be added once the manuscript preparation and archive release process is complete.
            </p>
          )}
        </Card>
        <Card>
          <CardEyebrow>Translation and commentary</CardEyebrow>
          {poem.translation.length > 0 ? (
            <div className="mt-6 space-y-4 text-base leading-8 text-muted">
              {poem.translation.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-base leading-8 text-muted">
              This archive record currently carries the official abstract, release notes, and commentary placeholders rather than the full translated text.
            </p>
          )}
          <div className="mt-8 border-t border-line pt-6">
            <CardTitle>Notes</CardTitle>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
              {poem.notes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </main>
  );
}
