import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Musa Allama",
  description:
    "The profile of Musa Allama: scholar-practitioner, agro-industrial operator, publisher, educator, and strategic advisor.",
  path: "/about",
});

const timeline = [
  "Multilingual study across English, Arabic, Chinese, and regional language contexts.",
  "Field exposure to agriculture, agrochemical trading, farmer education, and procurement realities.",
  "Publishing and digital product work across books, manuals, courses, and knowledge systems.",
  "Technology and AI workflow development for entrepreneurs, institutions, and content operations.",
  "Continued development of MusaAllama.com as a home for this work.",
];

const expertise = [
  "Agrochemical business and farmer education",
  "Hydroponics and practical agriculture training",
  "Chinese supplier communication and translation advisory",
  "Digital publishing and knowledge products",
  "AI workflows, automation, and institutional websites",
  "Strategic advisory for education, business, and long-term projects",
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
        eyebrow="About"
        title="A scholar-practitioner working across knowledge systems and practical markets."
        copy="Musa Allama works across agriculture, languages, technology, publishing, education, and strategic advisory, bringing multilingual study together with practical field experience."
        primaryCta={{ label: "Explore the books", href: "/books" }}
        secondaryCta={{ label: "Book advisory", href: "/advisory/strategic-session" }}
      />

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-burgundy">Professional Profile</p>
            <h2 className="display mt-3 text-4xl font-semibold text-deep md:text-5xl">Knowledge connected to practical work.</h2>
          </div>
          <div className="content text-muted">
            <p>
              MusaAllama.com brings together publishing, teaching, advisory, agriculture, language work, and digital systems in one place. Visitors can explore books, learn through courses, request advisory support, and follow new work as it develops.
            </p>
            <p>
              The work is grounded in multilingual study, field-facing agriculture, publishing, and technology practice, with an emphasis on useful knowledge, clear communication, and practical outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Journey" title="A path across languages, agriculture, publishing, and technology" copy="A concise view of the experiences that shaped the work." />
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
              {expertise.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-white/75 p-7">
            <h2 className="display text-4xl font-semibold text-deep">Professional values</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-charcoal">
              {values.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 text-vellum">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Newsletter</p>
            <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Follow the work as it develops.</h2>
            <p className="mt-5 text-sm leading-7 text-vellum/70">
              Receive notes on books, courses, agriculture, languages, publishing, and digital systems.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
