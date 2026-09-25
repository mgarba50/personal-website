import { TierCard } from "@/components/membership/tier-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { membershipTiers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership Circles",
  description:
    "Private membership options for readers, students, clients, patrons, and partners.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership Circles"
        title="Deeper access to MusaAllama.com."
        copy="Membership options include premium articles, selected PDFs, private dispatches, discounts, priority advisory, reports, collector editions, and invitation-only briefings."
        primaryCta={{ label: "Choose circle", href: "#tiers", action: "apply_membership" }}
        secondaryCta={{ label: "Member login", href: "/dashboard", action: "open_dashboard" }}
      />
      <ConversionStrip title="Choose the membership circle that best matches the level of access and support you want." />

      <section id="tiers" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Membership Options"
            title="Choose your level of access"
            copy="Compare the benefits, access, and support included in each membership circle."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {membershipTiers.map((tier) => (
              <TierCard tier={tier} key={tier.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
