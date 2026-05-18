import { TierCard } from "@/components/membership/tier-card";
import { ConversionStrip } from "@/components/commerce/conversion-strip";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { membershipTiers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership Circles",
  description:
    "Private institutional membership tiers for readers, students, serious learners, clients, patrons, and partners.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership Circles"
        title="Access to a private institutional circle."
        copy="Memberships are structured for premium articles, selected PDFs, private dispatches, discounts, priority advisory, reports, collector editions, and invitation-only briefings."
        primaryCta={{ label: "Choose circle", href: "#tiers", action: "apply_membership" }}
        secondaryCta={{ label: "Member login", href: "/dashboard", action: "open_dashboard" }}
      />
      <ConversionStrip title="Membership traffic should become applications or upgrades." />

      <section id="tiers" className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Professional tiers"
            title="Membership without subscription clutter"
            copy="Public language remains professional and restrained; deeper ceremonial identity can live inside private member materials."
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
