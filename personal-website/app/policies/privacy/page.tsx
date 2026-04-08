import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy | Musa Allama",
  path: "/policies/privacy"
});

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Privacy Policy</h1>
      <p className="text-base leading-8 text-muted">
        This platform collects only the information needed to route inquiries, process transactions, deliver digital products, and maintain institutional communication. Form data is treated with confidentiality and only shared with service providers required for delivery, payments, storage, or support operations.
      </p>
      <p className="text-base leading-8 text-muted">
        Replace this seeded policy copy with jurisdiction-specific legal review before production launch.
      </p>
    </main>
  );
}
