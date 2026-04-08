import { credibilitySignals, executiveTimeline, interventionDomains } from "@/content/site";
import { profile } from "@/content/profile";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { QuoteBlock } from "@/components/ui/quote-block";
import { Timeline } from "@/components/ui/timeline";
import { CtaStrip } from "@/components/ui/cta-strip";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Executive Dossier | Musa Allama",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Executive Dossier"
        title="An institutional biography shaped around engineering, multilingual diplomacy, agro-industrial command, and long-horizon legacy."
        summary={profile.longBio}
      >
        <Card>
          <img
            src="/assets/executive-portrait.svg"
            alt="Executive dossier portrait placeholder"
            className="h-80 w-full rounded-[22px] border border-line object-cover"
          />
        </Card>
      </HeroBlock>

      <QuoteBlock
        quote="Knowledge is the most sustainable form of aid, and lifelong learning is the only way to cheat time."
        attribution="Musa Allama"
      />

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Domains"
          title="The dossier does not separate intellect from operations."
          description="Advisory practice, publishing, multilingual communication, agro-industrial capability, public service, and ethical seriousness appear here as coordinated expressions of one mandate."
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
          eyebrow="Chronicle"
          title="A timeline of strategic deployment"
          description="This visual spine connects the China years, the 27-country travel footprint, agro-logistics leadership, translation work, teaching, and institutional expansion."
        />
        <Timeline items={executiveTimeline} />
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Footprint"
          title="Academic, geopolitical, and linguistic depth should read clearly and concretely."
          description="These signal cards and role records now reflect the real dossier material extracted from your source documents."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {credibilitySignals.map((signal) => (
            <Card key={signal.title}>
              <CardEyebrow>{signal.metric}</CardEyebrow>
              <CardTitle>{signal.title}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">{signal.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardEyebrow>Roles and appointments</CardEyebrow>
          <CardTitle>Public and institutional positions</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            {profile.roles.map((role) => (
              <li key={role}>- {role}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardEyebrow>Linguistic and geopolitical footprint</CardEyebrow>
          <CardTitle>Languages, trade corridors, and knowledge translation</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">{profile.location}</p>
          <p className="mt-4 text-sm leading-7 text-text">{profile.languages.join(" | ")}</p>
          <div className="mt-6 grid gap-3 text-sm text-muted">
            {profile.socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-accent">
                {link.label}
              </a>
            ))}
          </div>
        </Card>
      </section>

      <CtaStrip
        eyebrow="Final routing"
        title="From the dossier, the next move should be obvious."
        summary="Institutional visitors should be able to move directly into advisory, media, books, partnership conversations, or the diplomatic desk without friction."
        href="/contact"
        label="Proceed to routing"
      />
    </main>
  );
}
