import { LeadForm } from "@/components/forms/lead-form";
import { profile } from "@/content/profile";
import { HeroBlock } from "@/components/ui/hero-block";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

const offers = profile.innerDiwanOffers;

export const metadata = buildMetadata({
  title: "The Inner Diwan | Musa Allama",
  path: "/inner-diwan"
});

export default function InnerDiwanPage() {
  return (
    <main className="mx-auto max-w-shell space-y-16 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="The Inner Diwan"
        title="Confidential executive philosophical, ethical, and spiritual clarity work."
        summary="This corridor is intentionally distinct from consultancy and must never read as casual coaching. It is built for high-level guidance where conscience, responsibility, alignment, and legacy require disciplined language, confidentiality, and executive seriousness."
      >
        <Card className="border-accent/20 bg-[linear-gradient(180deg,rgba(196,156,74,0.12),rgba(8,17,28,0.82))]">
          <CardEyebrow>Confidential posture</CardEyebrow>
          <CardTitle>Privacy, seriousness, and signal discipline.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The visual atmosphere, intake language, and routing logic all emphasize confidentiality, measured cadence, and respect for executive stakes.
          </p>
        </Card>
      </HeroBlock>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Offer corridor"
          title="Private guidance modes for complex inward and ethical terrain"
          description="Each format is intentionally premium, confidential, and designed for serious actors who need language for friction that ordinary advisory categories do not hold well."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer}>
              <CardEyebrow>Private advisory</CardEyebrow>
              <CardTitle>{offer}</CardTitle>
              <p className="mt-4 text-sm leading-7 text-muted">
                Structured for discretion, disciplined reflection, and action that can be integrated into real executive life rather than left as abstraction.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardEyebrow>Confidentiality cues</CardEyebrow>
          <CardTitle>The user experience is intentionally restrained.</CardTitle>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            <li>- No playful language or generic wellbeing framing</li>
            <li>- Structured intake with explicit acknowledgement of time and cost protocol</li>
            <li>- NDA readiness and private contact routing</li>
          </ul>
        </Card>
        <Card>
          <CardEyebrow>Who this is for</CardEyebrow>
          <CardTitle>Executives, founders, stewards, and entrusted decision-makers.</CardTitle>
          <p className="mt-4 text-sm leading-7 text-muted">
            The corridor is appropriate where outer success has not resolved inner misalignment, ethical ambiguity, legacy uncertainty, or spiritually costly pressure.
          </p>
        </Card>
      </section>

        <LeadForm
        title="Executive Clarity Intake"
        summary={`Use this route for confidential philosophical, ethical, legacy, or spiritual clarity work. The review standard is intentionally selective and routes privately to ${profile.email}.`}
        endpoint="/api/intake/clarity"
        submitLabel="Request private review"
        fields={[
          { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Full name" },
          { name: "designation", label: "Designation", type: "text", required: true, placeholder: "Role or office" },
          { name: "email", label: "Private email", type: "email", required: true, placeholder: "private@example.com" },
          { name: "secureContact", label: "Secure contact", type: "tel", required: true, placeholder: "Preferred secure number" },
          { name: "misalignment", label: "Primary locus of misalignment", type: "text", required: true, placeholder: "Ethical, strategic, relational, spiritual..." },
          { name: "friction", label: "Executive summary of friction", type: "textarea", required: true, placeholder: "Describe the pressure, tension, or conflict." },
          { name: "objective", label: "Paralyzed objective", type: "textarea", required: true, placeholder: "What cannot move forward clearly?" },
          { name: "previousCounsel", label: "Previous counsel", type: "text", placeholder: "If relevant, mention prior counsel received." },
          {
            name: "protocolAcknowledgement",
            label: "Protocol acknowledgement",
            type: "checkbox",
            required: true,
            placeholder: "I understand this route is confidential, selective, and governed by premium time and cost protocol."
          },
          {
            name: "ndaRequired",
            label: "NDA requirement",
            type: "checkbox",
            placeholder: "Tick if an NDA will be required before full disclosure."
          }
        ]}
      />
    </main>
  );
}
