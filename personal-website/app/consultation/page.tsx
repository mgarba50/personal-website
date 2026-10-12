import type { Metadata } from "next";
import { ConsultationIntakeForm } from "@/components/forms/consultation-intake-form";

export const metadata: Metadata = {
  title: "Book a Strategic Consultation",
  description:
    "Qualified consultation intake for logistics, digital systems, corporate structuring, and general strategic advisory.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <div className="sa-consultation-page">
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">Qualified Engagement Path</p>
            <h1 className="sa-display sa-simple-hero__title">
              Initiate a Strategic Consultation.
            </h1>
            <p className="sa-simple-hero__copy">
              This intake is for organizations and serious engagements that require
              structured advisory, execution planning, or institutional systems work.
            </p>
          </div>

          <div className="sa-simple-hero__note">
            <span>ENGAGEMENT FLOW</span>
            <p>Qualify → Consultation payment → Select time → Confirmation</p>
          </div>
        </div>
      </section>

      <section className="sa-container sa-consultation-layout">
        <div className="sa-consultation-copy">
          <p className="sa-kicker sa-kicker--dark">Intake Logic</p>
          <h2 className="sa-display">Start with the operational problem.</h2>
          <p>
            The intake filters engagements by objective, bottleneck, and available
            capital so the consultation begins with useful context rather than a
            generic contact exchange.
          </p>
          <p>
            Payment and calendar confirmation are separate workflow stages and will
            only be presented when their live integrations are configured.
          </p>
        </div>

        <ConsultationIntakeForm />
      </section>
    </div>
  );
}
