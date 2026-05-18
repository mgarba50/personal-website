import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press & Media Vault",
  description:
    "Official bio, photos, logos, media mentions, interviews, speaking topics, press kit, and media contact.",
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
        eyebrow="Press & Media Vault"
        title="Official materials for media, speaking, and institutional invitations."
        copy="A professional credibility vault for official bio, photos, logos, media mentions, interviews, speaking topics, and downloadable press materials."
        primaryCta={{ label: "Download press kit", href: "/downloads/press-kit-placeholder.zip" }}
        secondaryCta={{ label: "Media inquiry", href: "#media-contact" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Official profile" title="Short bio and media assets" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-lg border border-line bg-white/80 p-6 lg:col-span-2">
              <h2 className="display text-3xl font-semibold text-deep">Official bio</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                Musa Allama is a multilingual scholar-practitioner, agro-industrial operator, publisher, educator, and
                strategic advisor working across knowledge systems, agriculture, languages, technology, and institutional
                design.
              </p>
            </article>
            <article className="rounded-lg border border-line bg-white/80 p-6">
              <h2 className="display text-3xl font-semibold text-deep">Downloads</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-charcoal">
                <li>Portrait photos placeholder</li>
                <li>Brand logos placeholder</li>
                <li>Press kit placeholder</li>
                <li>Speaking one-sheet placeholder</li>
              </ul>
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
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Request an interview or speaking engagement.</h2>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
