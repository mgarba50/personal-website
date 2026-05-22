"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type ManualPaymentFormProps = {
  title: string;
  productType: string;
  slug: string;
  amount: string;
  orderNumber: string;
};

type SubmitState = {
  ok: boolean;
  message: string;
};

export function ManualPaymentForm({ title, productType, slug, amount, orderNumber }: ManualPaymentFormProps) {
  const [state, setState] = useState<SubmitState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/manual-payment", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as SubmitState;
      setState(payload);

      if (payload.ok) {
        const conversionPayload = JSON.stringify({
          action: "payment_proof_submitted",
          label: title,
          href: window.location.href,
          path: window.location.pathname,
          timestamp: new Date().toISOString(),
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/conversions", new Blob([conversionPayload], { type: "application/json" }));
        }
        form.reset();
      }
    } catch {
      setState({ ok: false, message: "Your receipt could not be submitted. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="rounded-lg border border-line bg-white/80 p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">Receipt upload</p>
      <h2 className="display mt-3 text-3xl font-semibold text-deep">Submit payment proof</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Order Number: <strong className="text-deep">{orderNumber}</strong>
      </p>

      <input type="hidden" name="type" value={productType} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="product" value={title} />
      <input type="hidden" name="amountPaid" value={amount} />
      <input type="hidden" name="orderNumber" value={orderNumber} />

      <div className="mt-5 grid gap-3">
        <input className="field rounded-md" name="name" placeholder="Full name" required />
        <input className="field rounded-md" name="email" placeholder="Email" type="email" required />
        <input className="field rounded-md" name="phone" placeholder="Phone / WhatsApp" required />
        <input className="field rounded-md" name="reference" placeholder="Bank transfer reference or narration" required />
        <label className="grid gap-2 text-sm font-semibold text-deep">
          Upload receipt or screenshot
          <input className="field rounded-md" name="receipt" type="file" accept="image/*,.pdf" required />
        </label>
        <textarea className="field min-h-28 rounded-md" name="notes" placeholder="Optional notes for admin review" />
        <button
          className="rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-vellum transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          data-conversion="payment_proof_submitted"
          data-conversion-label={title}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit for verification"}
        </button>
      </div>

      {state ? (
        <p className={`mt-4 rounded-md p-4 text-sm leading-7 ${state.ok ? "bg-emerald/10 text-deep" : "bg-burgundy/10 text-burgundy"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
