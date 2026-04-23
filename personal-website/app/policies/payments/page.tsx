import { buildMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";

export const metadata = buildMetadata({
  title: "Payment Terms | Musa Allama Ibn Garba",
  path: "/policies/payments"
});

export default function PaymentTermsPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <h1 className="font-serif text-5xl text-text">Payment Terms</h1>
      <p className="text-base leading-8 text-muted">
        Payment flows may include Stripe, Paystack, Flutterwave, manual transfer, or invoice-led enterprise routing. The final production system should specify settlement timing, manual transfer confirmation rules, tax handling, and invoice validity windows.
      </p>
      <p className="text-base leading-8 text-muted">
        Current manual corporate transfer routing: {profile.bankTransfer.accountName}, {profile.bankTransfer.bankName}, account number {profile.bankTransfer.accountNumber}.
      </p>
      <p className="text-base leading-8 text-muted">
        The current build exposes the architecture and readiness while leaving final legal and tax language for deployment review.
      </p>
    </main>
  );
}
