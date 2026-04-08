import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Use | Musa Allama",
  path: "/policies/terms"
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Terms of Use</h1>
      <p className="text-base leading-8 text-muted">
        Use of this platform is subject to lawful conduct, respect for intellectual property, and compliance with any engagement-specific terms issued during advisory, publishing, or commerce workflows.
      </p>
      <p className="text-base leading-8 text-muted">
        Replace this seeded terms copy with reviewed terms before public deployment.
      </p>
    </main>
  );
}
