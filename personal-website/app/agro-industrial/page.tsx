import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { CtaStrip } from "@/components/ui/cta-strip";
import { buildMetadata } from "@/lib/metadata";

const capabilities = [
  {
    title: "Advanced agriculture architecture",
    image: "/assets/agro-field-operations.jpg",
    summary: "Field systems, cultivation planning, and agricultural frameworks structured for serious operational oversight."
  },
  {
    title: "Hydroponics and aeroponics capability",
    image: "/assets/hydroponics-system.jpg",
    summary: "Controlled-environment agriculture capability for resilient food systems and technical training pathways."
  },
  {
    title: "Fleet and logistics oversight",
    image: "/assets/fleet-logistics.jpg",
    summary: "Logistics, warehouse, cross-border transport, and fleet oversight translated into procurement-grade language."
  },
  {
    title: "Irrigation systems planning",
    image: "/assets/agro-field-operations.jpg",
    summary: "Water logic, irrigation discipline, and operational controls for farms facing climate and supply pressure."
  },
  {
    title: "Agrochemical sourcing support",
    image: "/assets/hydroponics-system.jpg",
    summary: "B2B sourcing support for agricultural inputs, vendor qualification, and technical-fit review."
  },
  {
    title: "Hardware, telematics, and compliance logic",
    image: "/assets/fleet-logistics.jpg",
    summary: "Hardware, fleet intelligence, tracking readiness, documentation, and compliance-oriented operating systems."
  }
];

export const metadata = buildMetadata({
  title: "Agro-Industrial Command Center | Engr Musa Garba",
  path: "/agro-industrial"
});

export default function AgroIndustrialPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Agro-Industrial Command Center"
        title="Technical credibility for agriculture, logistics, sourcing, and field-to-market systems."
        summary="This section translates Engr Musa Garba's Geidam Agro-Allied operational credibility into institutional language suitable for investors, procurement teams, partners, and government-facing stakeholders."
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
            <Card key={capability.title} className="overflow-hidden p-0">
              <img src={capability.image} alt={`${capability.title} visual`} className="executive-card-image" />
              <div className="executive-card-content">
                <CardEyebrow>Capability</CardEyebrow>
                <CardTitle>{capability.title}</CardTitle>
                <p className="mt-4 text-sm leading-7 text-muted">{capability.summary}</p>
                <a href="/advisory" className="executive-card-action inline-flex text-sm uppercase tracking-[0.18em] text-accent">
                  Request access
                </a>
              </div>
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
