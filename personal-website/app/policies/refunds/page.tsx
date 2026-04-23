import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Refund Policy | Musa Allama Ibn Garba",
  path: "/policies/refunds"
});

export default function RefundsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Refund and Digital Product Policy</h1>
      <p className="text-base leading-8 text-muted">
        Digital products, advisory deposits, and protected intellectual assets should be governed by explicit delivery, usage, and refund conditions. The seeded policy assumes refunds are discretionary after access or delivery unless otherwise stated in a specific offer.
      </p>
      <p className="text-base leading-8 text-muted">
        Final policy language should be reviewed and aligned with payment provider requirements before launch.
      </p>
    </main>
  );
}
