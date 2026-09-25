import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press & Media",
  description:
    "Official profile, speaking topics, interview requests, and media contact for Musa Allama.",
  path: "/press",
});

const speakingTopics = [
  "Agriculture and technology in Africa",
  "China-Africa trade communication",
  "AI for entrepreneurs",
  "Publishing as institutional legacy",
  "Hydroponics and food systems",
  "Multilingual education",
];

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press & Media"
        title="Media, speaking, and institutional invitations."
        copy="Find the official short bio, prepared speaking themes, and a direct route for interview, event, and media requests."
        primaryCta={{ label: "Request media materials", href: "#media-contact" }}
        secondaryCta={{ label: "About Musa Allama", href: "/about" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Official profile" title="Short bio" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-lg border border-line bg-white/80 p-6 lg:col-span-2">
              <h2 className="display text-3xl font-semibold text-deep">Official bio</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Musa Allama is a multilingual scholar-practitioner, agro-industrial operator, publisher, educator, and strategic advisor working across agriculture, languages, technology, publishing, and practical knowledge systems.
              </p>
            </article>
            <article className="rounded-lg border border-line bg-white/80 p-6">
              <h2 className="display text-3xl font-semibold text-deep">Media materials</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                For approved photographs, logos, speaker information, publication details, or event materials, send a media request below.
              </p>
              <a className="mt-5 inline-flex rounded-md bg-deep px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-vellum" href="#media-contact">
                Request materials
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Speaking topics" title="Prepared themes for serious audiences" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {speakingTopics.map((topic) => (
              <article className="rounded-lg border border-line bg-white/80 p-6" key={topic}>
                <h3 className="display text-2xl font-semibold text-deep">{topic}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="media-contact" className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Media desk</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Request an interview, speaking engagement, or media material.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Include the organisation, event or publication, intended topic, date, audience, and the materials you need.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
