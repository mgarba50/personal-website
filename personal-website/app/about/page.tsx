import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Executive Dossier",
  description:
    "The executive profile of Musa Allama: scholar-practitioner, agro-industrial operator, publisher, educator, and strategic advisor.",
  path: "/about",
});

const timeline = [
  "Multilingual study across English, Arabic, Chinese, and regional language contexts.",
  "Field exposure to agriculture, agrochemical trading, farmer education, and procurement realities.",
  "Publishing and digital product work across books, manuals, courses, and knowledge systems.",
  "Technology and AI workflow development for entrepreneurs, institutions, and content operations.",
  "Institutional platform development through MusaAllama.com.",
];

const expertise = [
  "Agrochemical business and farmer education",
  "Hydroponics and practical agriculture training",
  "Chinese supplier communication and translation advisory",
  "Digital publishing and knowledge product systems",
  "AI workflows, automation, and institutional websites",
  "Strategic advisory for education, business, and legacy projects",
];

const values = [
  "Practical scholarship",
  "Commercial discipline",
  "Language precision",
  "Institutional memory",
  "Grounded service",
  "Long-term credibility",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Executive Dossier"
        title="A scholar-practitioner working across knowledge systems and practical markets."
        copy="Musa Allama is a multilingual scholar-practitioner, agro-industrial operator, publisher, educator, and strategic advisor working across agriculture, languages, technology, publishing, and institutional design."
        primaryCta={{ label: "Download profile", href: "/downloads/musa-allama-profile-placeholder.pdf" }}
        secondaryCta={{ label: "Book advisory", href: "/advisory/strategic-session" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Professional Identity</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Credible, grounded, and commercially useful.</h2>
          </div>
          <div className="content text-muted">
            <p>
              MusaAllama.com is designed as the public operating base for a body of work that joins publishing, teaching,
              advisory, agricultural intelligence, language strategy, and digital systems. The platform is intentionally
              institutional: it exists to preserve knowledge, sell serious products, support practical learning, and serve
              clients with clear strategic judgment.
            </p>
            <p>
              The work is grounded in multilingual study, field-facing agriculture, publishing systems, and technology
              practice. It avoids exaggerated claims and focuses on what serious visitors need to understand, buy, learn,
              or commission.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Timeline" title="Institutional formation" copy="A concise record of the platform's operating roots." />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {timeline.map((item, index) => (
              <li className="rounded-lg border border-line bg-white/75 p-5" key={item}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Stage {index + 1}</span>
                <p className="mt-3 text-sm leading-7 text-muted">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-white/75 p-7">
            <h2 className="display text-4xl font-semibold text-deep">Areas of expertise</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-charcoal">
              {expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white/75 p-7">
            <h2 className="display text-4xl font-semibold text-deep">Professional values</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-charcoal">
              {values.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 text-vellum">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Institutional Dispatch</p>
            <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Follow the work as it develops.</h2>
            <p className="mt-5 text-sm leading-7 text-vellum/70">
              Receive notes on books, courses, agro-industrial intelligence, languages, and digital systems.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
