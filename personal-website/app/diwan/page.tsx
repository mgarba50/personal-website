import { poems } from "@/content/collections/poems";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Diwan | Musa Allama",
  path: "/diwan"
});

export default function DiwanPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="The Diwan"
        title="A Diwan vault for monumental didactic poetry, bilingual reading, and recitation-ready archives."
        summary="The Diwan is built around the Magnum Opus archive and supports Arabic-first presentation, English-ready commentary, manuscript identity, and audio embedding."
      >
        <Card>
          <CardEyebrow>Vault logic</CardEyebrow>
          <CardTitle>RTL-ready with room for translation, commentary, and audio.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            Arabic typography, directional discipline, and literary atmosphere are treated as first-class concerns.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Collections"
          title="Diwan volumes arranged as an archive rather than isolated posts"
          description="Each entry supports Arabic-first presentation, commentary, notes, and a future audio release path."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {poems.map((poem) => (
            <Card key={poem.slug}>
              <CardEyebrow>{poem.commercialTier || poem.collection}</CardEyebrow>
              <CardTitle>{poem.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{poem.summary}</p>
              <p className="mt-5 text-sm text-text">{(poem.languages || []).join(" | ")}</p>
              <a href={`/diwan/${poem.slug}`} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Open archive record
              </a>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
