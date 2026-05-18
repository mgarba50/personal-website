import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/cards/book-card";
import { CourseCard } from "@/components/cards/course-card";
import { ServiceCard } from "@/components/cards/service-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CtaButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { advisoryServices, books, courses, membershipTiers, pillars } from "@/lib/content";
import { jsonLd } from "@/lib/seo";

const divisions = [
  { title: "The Canon", href: "/books", copy: "Books, manuals, diwans, and strategic publications." },
  { title: "The Madrasa", href: "/courses", copy: "Courses and certifications for practical learning." },
  { title: "Strategic Advisory", href: "/advisory", copy: "Private consulting for business, agriculture, publishing, and digital systems." },
  { title: "Agro-Industrial Command Center", href: "/agro", copy: "Agriculture, agrochemicals, hydroponics, and procurement intelligence." },
  { title: "Living Library", href: "/library", copy: "Long-form essays, field notes, language lessons, and research briefs." },
  { title: "Membership Circles", href: "/membership", copy: "Access to premium knowledge, reports, discounts, and private briefings." },
];

export default function Home() {
  const featuredBook = books[0];
  const featuredCourse = courses[0];
  const featuredService = advisoryServices[0];
  const featuredTier = membershipTiers[1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MusaAllama.com",
          url: "https://musaallama.com",
          description:
            "An institutional platform for books, courses, strategic advisory, agro-industrial intelligence, and multilingual scholarship.",
        })}
      />
      <section className="institutional-shell px-5 py-14 text-vellum md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Executive Desk</p>
            <h1 className="display mt-5 text-6xl font-semibold leading-none md:text-8xl">Musa Allama</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-vellum/88">
              Knowledge. Strategy. Agriculture. Publishing. Technology.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-vellum/70">
              MusaAllama.com is the institutional headquarters for books, courses, strategic advisory, agro-industrial
              intelligence, language scholarship, and practical transformation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/books">Explore Books</CtaButton>
              <CtaButton href="/advisory/strategic-session" variant="secondary">
                Book Strategic Session
              </CtaButton>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-vellum/68 sm:grid-cols-4">
              <Link href="/books" className="border-l border-gold/50 pl-3 hover:text-gold">
                Books
              </Link>
              <Link href="/courses" className="border-l border-gold/50 pl-3 hover:text-gold">
                Courses
              </Link>
              <Link href="/advisory" className="border-l border-gold/50 pl-3 hover:text-gold">
                Advisory
              </Link>
              <Link href="/membership" className="border-l border-gold/50 pl-3 hover:text-gold">
                Membership
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 border border-gold/25" aria-hidden />
            <Image
              src="/images/institutional-hero.png"
              width={1200}
              height={900}
              alt="A premium institutional study with manuscripts, books, technology, and agricultural details"
              className="relative aspect-[4/3] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Authority Snapshot"
            title="Four operating pillars"
            copy="The platform is organized around the work visitors can buy, study, commission, and join."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Link
                href={pillar.href}
                key={pillar.title}
                className="rounded-lg border border-line bg-white/75 p-6 transition hover:-translate-y-1 hover:border-gold"
              >
                <h3 className="display text-2xl font-semibold text-deep">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{pillar.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/55 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Revenue Products"
            title="Start with one practical product"
            copy="Read a book, enroll in a course, book a strategic session, or enter a private membership circle."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            <BookCard book={featuredBook} />
            <CourseCard course={featuredCourse} />
            <ServiceCard service={featuredService} />
            <article className="flex h-full flex-col rounded-lg border border-line bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Membership</p>
              <h3 className="display mt-3 text-3xl font-semibold text-deep">{featuredTier.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{featuredTier.description}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <span className="text-sm font-semibold text-deep">{featuredTier.price}</span>
                <Link className="text-sm font-semibold uppercase tracking-[0.14em] text-burgundy hover:text-deep" href={`/membership/${featuredTier.slug}`}>
                  Join circle
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Institutional Divisions"
            title="A publishing house, academy, advisory firm, and archive in one platform"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division) => (
              <Link href={division.href} key={division.title} className="rounded-lg border border-line bg-white/70 p-6 transition hover:border-gold">
                <h3 className="display text-3xl font-semibold text-deep">{division.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{division.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 text-vellum">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The Institutional Dispatch</p>
            <h2 className="display mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              Receive the Institutional Dispatch
            </h2>
            <p className="mt-5 text-sm leading-7 text-vellum/72">
              A private note on knowledge, strategy, agriculture, publishing, technology, and language intelligence.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="display text-4xl font-semibold text-deep md:text-5xl">
            Begin with a book, a course, or a strategic session.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaButton href="/books" variant="light">
              Buy a book
            </CtaButton>
            <CtaButton href="/courses" variant="light">
              Enroll in a course
            </CtaButton>
            <CtaButton href="/contact" variant="light">
              Send inquiry
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
