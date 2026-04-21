import { bookVolumes, books } from "@/content/collections/books";
import { LeadForm } from "@/components/forms/lead-form";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Canon | Musa Allama",
  path: "/canon"
});

export default function CanonPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="The Canon"
        title="Books and manuscripts are treated as premium intellectual assets."
        summary="The Canon is organized into four distinct architectural volumes spanning executive strategy, agro-industrial systems, philosophical strategy, and the Magnum Opus Diwan archive."
      >
        <Card>
          <CardEyebrow>Commerce modes</CardEyebrow>
          <CardTitle>Public info, request-only manuscripts, paid PDFs, and institutional orders.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The platform is built to support multiple release states without flattening them into one generic purchase pattern.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Flagship works"
          title="A premium publishing house inside the institutional platform"
          description="Each work carries its own abstract, thematic map, audience positioning, language availability, and access logic. The shelves below follow the exact institutional volume structure from your source directive."
        />
        <div className="space-y-10">
          {bookVolumes.map((volume) => {
            const items = books.filter((book) => book.volume === volume.id);

            return (
              <section key={volume.id} className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent">{volume.title}</p>
                  <h3 className="mt-3 font-serif text-3xl text-text">{volume.summary}</h3>
                </div>
                <div className="grid items-stretch gap-6 lg:grid-cols-3">
                  {items.map((book) => (
                    <Card key={book.slug} className="book-card flex h-full flex-col">
                      <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="book-cover-image aspect-[2/3] w-full rounded-[22px] border border-line object-cover object-center"
                      />
                      <div className="book-info-container flex flex-grow flex-col pt-6">
                        <CardEyebrow>{book.commercialTier || book.status}</CardEyebrow>
                        <CardTitle>{book.title}</CardTitle>
                        <p className="mt-2 text-sm leading-7 text-muted">{book.subtitle}</p>
                        <p className="mt-4 text-sm leading-7 text-muted">{book.abstract}</p>
                        <div className="book-action-buttons mt-auto space-y-4 pt-6">
                          <p className="text-sm text-text">{book.commerceMode}</p>
                          <a href={`/canon/${book.slug}`} className="inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                            Open book record
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <LeadForm
        title="Institutional Order or Manuscript Request"
        summary="Use this route for manuscript requests, bulk orders, library procurement, or institutional inquiries related to publishing assets."
        endpoint="/api/institutional-order"
        submitLabel="Submit order request"
        fields={[
          { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
          { name: "organization", label: "Institution or library", type: "text", required: true, placeholder: "Institution name" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "name@institution.org" },
          { name: "bookTitle", label: "Requested work", type: "select", required: true, options: books.map((book) => book.title) },
          {
            name: "requestType",
            label: "Request type",
            type: "select",
            required: true,
            options: ["Request manuscript", "Bulk order", "Institutional licensing", "Review copy", "Library procurement"]
          },
          { name: "details", label: "Request details", type: "textarea", required: true, placeholder: "Describe quantity, context, and timeline." }
        ]}
      />
    </main>
  );
}
