"use client";

import { FormEvent, useState } from "react";

type Props = {
  courseTitle: string;
};

type State = { status: "idle" | "submitting" | "success" | "error"; message: string };

export function CourseWaitlistForm({ courseTitle }: Props) {
  const [state, setState] = useState<State>({ status: "idle", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("courseInterest", courseTitle);

    setState({ status: "submitting", message: "Submitting…" });

    try {
      const response = await fetch("/api/course-waitlist", {
        method: "POST",
        body: data,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setState({
          status: "error",
          message: payload?.message ?? "Waitlist submission failed.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: payload?.message ?? "You have joined the waitlist.",
      });
    } catch {
      setState({ status: "error", message: "Waitlist submission failed." });
    }
  }

  return (
    <form className="sa-resource-form" onSubmit={submit}>
      <div>
        <p className="sa-kicker sa-kicker--dark">Course Waitlist</p>
        <h3 className="sa-display">{courseTitle}</h3>
      </div>
      <input className="field" name="name" placeholder="Full name" required />
      <input className="field" name="email" type="email" placeholder="Email" required />
      <input className="field" name="whatsapp" placeholder="WhatsApp" required />
      <select className="field" defaultValue="" name="preferredFormat" required>
        <option value="" disabled>Preferred format</option>
        <option>Self-paced</option>
        <option>Live class</option>
        <option>Physical training</option>
        <option>Certificate program</option>
      </select>
      <button
        className="sa-button sa-button--gold"
        disabled={state.status === "submitting"}
        type="submit"
        data-conversion="course_waitlist_signup"
        data-conversion-label={courseTitle}
      >
        {state.status === "submitting" ? "Submitting…" : "Join Waitlist"}
      </button>
      {state.status !== "idle" ? (
        <p className={`sa-form-status ${state.status === "success" ? "sa-form-status--success" : state.status === "error" ? "sa-form-status--error" : ""}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
