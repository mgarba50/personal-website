import Link from "next/link";
import { HeroBlock } from "@/components/ui/hero-block";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/metadata";

const policies = [
  { title: "Privacy Policy", href: "/policies/privacy" },
  { title: "Terms of Use", href: "/policies/terms" },
  { title: "Refund Policy", href: "/policies/refunds" },
  { title: "Booking Policy", href: "/policies/booking" },
  { title: "Payment Terms", href: "/policies/payments" },
  { title: "Intellectual Property Notice", href: "/policies/ip" }
];

export const metadata = buildMetadata({
  title: "Policies | Musa Allama",
  path: "/policies"
});

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-shell space-y-12 px-4 py-8 md:px-6 md:py-10">
      <HeroBlock
        eyebrow="Policies"
        title="Core governance pages are scaffolded from the beginning."
        summary="These pages create a clear legal and operational baseline for privacy, payments, booking conduct, digital delivery, and intellectual property handling."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {policies.map((policy) => (
          <Card key={policy.href}>
            <CardEyebrow>Governance</CardEyebrow>
            <CardTitle>{policy.title}</CardTitle>
            <Link href={policy.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-accent">
              Open policy
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
