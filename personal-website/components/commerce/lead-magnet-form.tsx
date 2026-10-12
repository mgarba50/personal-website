"use client";

import { FormEvent, useState } from "react";

type Props = {
  slug: string;
  title: string;
  interestCategory: string;
};

type State = { status: "idle" | "submitting" | "success" | "error"; message: string };

export function LeadMagnetForm({ slug, title, interestCategory }: Props) {
  const [state, setState] = useState<State>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("interestCategory", interestCategory);

    setState({ status: "submitting", message: "Preparing your resource…" });

    try {
      const response = await fetch(`/api/lead-magnets/${slug}`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setState({
          status: "error",
          message: payload?.message ?? "The resource could not be delivered.",
        });
        return;
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="?([^"]+)"?/i);
      const filename = match?.[1] ?? `${slug}.download`;

      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(href);

      form.reset();
      setState({
        status: "success",
        message: "Your resource has been delivered.",
      });
    } catch {
      setState({
        status: "error",
        message: "Delivery failed. Please try again.",
      });
    }
  }

  return (
    <form className="sa-resource-form" onSubmit={submit}>
      <div>
        <p className="sa-kicker sa-kicker--dark">Free Resource</p>
        <h3 className="sa-display">{title}</h3>
      </div>

      <input className="field" name="name" placeholder="Full name" required />
      <input className="field" name="email" type="email" placeholder="Email" required />
      <input className="field" name="whatsapp" placeholder="WhatsApp (optional)" />

      <button
        className="sa-button sa-button--gold"
        disabled={state.status === "submitting"}
        type="submit"
        data-conversion="lead_magnet_signup"
        data-conversion-label={title}
      >
        {state.status === "submitting" ? "Preparing…" : "Get Free Resource"}
      </button>

      {state.status !== "idle" ? (
        <p className={`sa-form-status ${state.status === "success" ? "sa-form-status--success" : state.status === "error" ? "sa-form-status--error" : ""}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
