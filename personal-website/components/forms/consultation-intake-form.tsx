"use client";

import { FormEvent, useState } from "react";

const objectives = [
  "Logistics",
  "Digital Build",
  "Corporate Setup",
  "General Advisory",
];

const budgetTiers = [
  "Below N250,000",
  "N250,000 - N1,000,000",
  "N1,000,000 - N5,000,000",
  "Above N5,000,000",
];

type FormState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ConsultationIntakeForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("preferredContact", "Calendar call");

    setState({
      status: "submitting",
      message: "Submitting your consultation intake…",
    });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setState({
          status: "error",
          message:
            result?.message ??
            "The intake could not be submitted. Please try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message:
          "Intake received. The payment and scheduling step will follow through the consultation workflow.",
      });
    } catch {
      setState({
        status: "error",
        message:
          "The intake could not be submitted because the connection failed. Please try again.",
      });
    }
  }

  return (
    <form className="sa-intake-form" onSubmit={handleSubmit}>
      <label>
        <span>Your Name</span>
        <input
          className="field"
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Full name"
        />
      </label>

      <label>
        <span>Business Email</span>
        <input
          className="field"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="name@organization.com"
        />
      </label>

      <label>
        <span>Organization Name & Website</span>
        <input
          className="field"
          type="text"
          name="organization"
          autoComplete="organization"
          required
          placeholder="Organization · website"
        />
      </label>

      <label>
        <span>Primary Objective</span>
        <select className="field" defaultValue="" name="inquiryType" required>
          <option value="" disabled>Select objective</option>
          {objectives.map((objective) => (
            <option value={objective} key={objective}>{objective}</option>
          ))}
        </select>
      </label>

      <label className="md:col-span-2">
        <span>Current Operational Bottleneck</span>
        <textarea
          className="field"
          rows={7}
          name="message"
          required
          placeholder="Describe the operational problem, current stage, and desired outcome."
        />
        <p className="sa-field-help">
          Keep this practical: what is blocked, what has already been tried, and what result is required.
        </p>
      </label>

      <label className="md:col-span-2">
        <span>Capital Allocation / Budget Tier</span>
        <select className="field" defaultValue="" name="budgetRange" required>
          <option value="" disabled>Select budget tier</option>
          {budgetTiers.map((tier) => (
            <option value={tier} key={tier}>{tier}</option>
          ))}
        </select>
      </label>

      {state.status !== "idle" ? (
        <p
          className={[
            "sa-form-status md:col-span-2",
            state.status === "success" ? "sa-form-status--success" : "",
            state.status === "error" ? "sa-form-status--error" : "",
          ].join(" ")}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="sa-button sa-button--gold md:col-span-2"
        disabled={state.status === "submitting"}
        data-conversion="submit_consultation_intake"
        data-conversion-label="Corporate consultation intake"
      >
        {state.status === "submitting" ? "Submitting…" : "Submit Consultation Intake"}
      </button>
    </form>
  );
}
