import { mediaCollections } from "@/content/collections/media";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Album and Media Archive | Musa Allama",
  path: "/album"
});

export default function AlbumPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Album and Media Archive"
        title="A curated media presentation layer for portraits, projects, recitations, and visual documentation."
        summary="The archive is designed to support galleries, audio and video embeds, project tags, and future public or private access controls."
      >
        <Card>
          <CardEyebrow>Archive posture</CardEyebrow>
          <CardTitle>Gallery logic today, privacy and paid access readiness later.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The page model is already prepared for collection-level governance, media filters, and later lightbox or protected archive extensions.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Collections"
          title="Media collections seed the archive structure"
          description="Each collection card includes a date, media type, tags, and cover so the archive can scale cleanly."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {mediaCollections.map((media) => (
            <Card key={media.slug}>
              <img src={media.cover} alt={`${media.title} cover`} className="h-56 w-full rounded-[22px] border border-line object-cover" />
              <CardEyebrow>{media.type}</CardEyebrow>
              <CardTitle>{media.title}</CardTitle>
              <p className="mt-2 text-sm text-muted">{media.date}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{media.description}</p>
              <p className="mt-4 text-sm text-text">{media.tags.join(" | ")}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
