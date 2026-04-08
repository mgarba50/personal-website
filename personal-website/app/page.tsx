import Link from "next/link";
import { books } from "@/content/collections/books";
import { articles } from "@/content/collections/articles";
import { poems } from "@/content/collections/poems";
import { initiatives } from "@/content/collections/initiatives";
import { serviceTiers } from "@/content/collections/services";
import { credibilitySignals, heroActions, homeMetrics, interventionDomains } from "@/content/site";
import { profile } from "@/content/profile";
import { HeroBlock } from "@/components/ui/hero-block";
import { StatsStrip } from "@/components/ui/stats-strip";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { CtaStrip } from "@/components/ui/cta-strip";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Executive Desk | Musa Allama",
  path: "/"
});

const flagshipRoutes = [
  {
    title: "Strategic advisory",
    summary: "For institutions navigating high-value operating questions, cross-border complexity, and structural redesign.",
    href: "/advisory"
  },
  {
    title: "The Canon",
    summary: "Books, manuscripts, and premium intellectual assets presented with academic and institutional discipline.",
    href: "/canon"
  },
  {
    title: "Living Library",
    summary: "Essays, strategic papers, and reflections arranged as a durable archive rather than a disposable blog.",
    href: "/library"
  },
  {
    title: "Agro-industrial command",
    summary: "A technical command center for agriculture, irrigation, logistics, hardware, and procurement visibility.",
    href: "/agro-industrial"
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Executive Desk"
        title={profile.positioningLine}
        summary={profile.heroSummary}
        actions={heroActions}
      >
        <Card className="h-full bg-[linear-gradient(180deg,rgba(14,23,37,0.92),rgba(14,23,37,0.7))]">
          <img
            src="/assets/executive-portrait.svg"
            alt="Executive portrait placeholder for Musa Allama"
            className="h-72 w-full rounded-[22px] border border-line object-cover"
          />
          <CardEyebrow>{profile.enterpriseBrand}</CardEyebrow>
          <CardTitle>{profile.shortBio}</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            Based in {profile.location}, this platform is designed to serve readers, institutions, premium clients, media teams, strategic partners, and long-horizon beneficiaries from one disciplined command surface.
          </p>
          <p className="mt-4 text-sm text-text">{profile.brandWords.join(" | ")}</p>
        </Card>
      </HeroBlock>

      <StatsStrip metrics={homeMetrics} />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Domains of intervention"
          title="Each corridor is part of one institutional ecosystem."
          description="Books, consultancy, educational work, agro capability, press readiness, translation intelligence, and endowment architecture are not treated as separate fragments. They reinforce one another."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {interventionDomains.map((domain) => (
            <Card key={domain.title}>
              <CardEyebrow>{domain.title}</CardEyebrow>
              <CardTitle>{domain.summary}</CardTitle>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                {domain.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Flagship corridors"
          title="The homepage is designed to route visitors into high-value pathways."
          description="Nothing here is decorative for its own sake. Each section below is a gateway into a deeper institutional world aligned with the Gallifrey standard."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {flagshipRoutes.map((route) => (
            <Card key={route.href}>
              <CardEyebrow>Flagship section</CardEyebrow>
              <CardTitle>{route.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{route.summary}</p>
              <Link href={route.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                Enter corridor
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardEyebrow>Institutional impact</CardEyebrow>
          <CardTitle>The Gallifrey Human Capital Initiative frames philanthropy as human capital development.</CardTitle>
          <p className="mt-4 text-base leading-8 text-muted">
            The impact corridor is framed as legacy architecture, not charity theater. It is designed to support rehabilitation, agro-sustenance, technical education, scholarship, and knowledge preservation through structured sponsorship and endowment-ready flows.
          </p>
          <div className="mt-6 grid gap-4">
            {initiatives.map((initiative) => (
              <div key={initiative.title} className="rounded-3xl border border-line bg-surface-strong/60 p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-accent">{initiative.impactType}</p>
                <h3 className="mt-2 font-serif text-2xl text-text">{initiative.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{initiative.summary}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-6">
          {credibilitySignals.map((signal) => (
            <Card key={signal.title}>
              <CardEyebrow>{signal.metric}</CardEyebrow>
              <CardTitle>{signal.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{signal.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Selected publications and writings"
          title="Books, papers, and poetic works are presented as intellectual assets, not content filler."
          description="The platform treats thought as a governed archive with premium presentation, multilingual readiness, and structured commercial pathways."
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {[...books.slice(0, 2), articles[0], poems[0]].map((item, index) => {
            const href =
              "slug" in item && index < 2
                ? `/canon/${item.slug}`
                : "slug" in item && "category" in item
                  ? `/library/${item.slug}`
                  : `/diwan/${poems[0].slug}`;
            const summary = "abstract" in item ? item.abstract : "summary" in item ? item.summary : "";
            const title = item.title;

            return (
              <Card key={title + href}>
                <CardEyebrow>{index < 2 ? "Book" : index === 2 ? "Essay" : "Poetry"}</CardEyebrow>
                <CardTitle>{title}</CardTitle>
                <p className="mt-4 text-sm leading-7 text-muted">{summary}</p>
                <Link href={href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                  Open
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Consultancy funnel"
          title="Qualification-first routing protects the premium advisory experience."
          description="The advisory corridor is designed for serious mandates, not general browsing. Tier 1 and Tier 2 use progressive intake, while the Diplomatic Desk strategy session remains bookable for approved Tier 3 engagements."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <Card key={tier.id}>
              <CardEyebrow>{tier.title}</CardEyebrow>
              <CardTitle>{tier.audience}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{tier.summary}</p>
              <p className="mt-4 text-sm leading-7 text-text">{tier.pricing}</p>
            </Card>
          ))}
        </div>
      </section>

      <CtaStrip
        eyebrow="Press, partnerships, and contact"
        title="Enter the correct corridor instead of forcing every inquiry through one generic form."
        summary="Media requests, institutional partnerships, endowment conversations, and premium advisory inquiries each have their own structured route so trust can be preserved from the first interaction."
        href="/contact"
        label="Enter the Diplomatic Desk"
      />
    </main>
  );
}
