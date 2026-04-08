import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { CtaStrip } from "@/components/ui/cta-strip";
import { buildMetadata } from "@/lib/metadata";

const capabilities = [
  "Advanced agriculture architecture",
  "Hydroponics and aeroponics capability",
  "Irrigation systems planning",
  "Agrochemical sourcing support",
  "Fleet and logistics oversight",
  "Hardware, telematics, and compliance logic"
];

export const metadata = buildMetadata({
  title: "Agro-Industrial Command Center | Musa Allama",
  path: "/agro-industrial"
});

export default function AgroIndustrialPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Agro-Industrial Command Center"
        title="Technical credibility for agriculture, logistics, sourcing, and field-to-market systems."
        summary="This section translates Geidam Agro-Allied operational credibility into institutional language suitable for investors, procurement teams, partners, and government-facing stakeholders."
      >
        <Card>
          <CardEyebrow>Command tone</CardEyebrow>
          <CardTitle>Data-aware, systems-oriented, and operationally serious.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The layout is intentionally more technical so the visitor understands this corridor is tied to real operational capability, not aspirational branding.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Capability grid"
          title="Operational areas represented with engineering-style clarity"
          description="These modules are designed to expand later with diagrams, charts, telemetry snapshots, procurement packs, and project case evidence."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability}>
              <CardEyebrow>Capability</CardEyebrow>
              <CardTitle>{capability}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">
                Structured for future case notes, technical documentation, asset packs, and procurement routing.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <CtaStrip
        eyebrow="B2B procurement"
        title="For sourcing, compliance, fleet, or controlled-agriculture discussions, route through the strategic desk."
        summary="This corridor is ready to support B2B procurement conversations, technical brief reviews, agrochemical sourcing dialogue, and partner-facing capability overviews."
        href="/advisory"
        label="Enter advisory route"
      />
    </main>
  );
}
