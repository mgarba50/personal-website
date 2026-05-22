"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { courseWaitlists } from "@/lib/revenue";

type CourseWaitlistFormProps = {
  defaultCourse?: string;
};

type SubmitState = {
  ok: boolean;
  message: string;
};

export function CourseWaitlistForm({ defaultCourse = "" }: CourseWaitlistFormProps) {
  const [state, setState] = useState<SubmitState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const courseInterest = String(formData.get("courseInterest") ?? "");

    try {
      const response = await fetch("/api/course-waitlist", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as SubmitState;
      setState(payload);

      if (payload.ok) {
        const conversionPayload = JSON.stringify({
          action: "course_waitlist_signup",
          label: courseInterest,
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
      setState({ ok: false, message: "The waitlist could not be submitted. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
      <input className="field rounded-md" name="name" placeholder="Name" required />
      <input className="field rounded-md" name="email" placeholder="Email" required type="email" />
      <input className="field rounded-md" name="whatsapp" placeholder="WhatsApp" required />
      <select className="field rounded-md" name="courseInterest" defaultValue={defaultCourse} required>
        <option value="">Course interest</option>
        {courseWaitlists.map((course) => (
          <option key={course.slug} value={course.title}>
            {course.title}
          </option>
        ))}
      </select>
      <select className="field rounded-md md:col-span-2" name="preferredFormat" required>
        <option value="">Preferred format</option>
        <option>Self-paced</option>
        <option>Live class</option>
        <option>Physical training</option>
        <option>Certificate program</option>
      </select>
      <button
        className="rounded-md bg-deep px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-vellum transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        data-conversion="course_waitlist_signup"
        data-conversion-label={defaultCourse || "Course waitlist"}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Joining..." : "Join Course Waitlist"}
      </button>
      {state ? (
        <p className={`rounded-md p-4 text-sm leading-7 md:col-span-2 ${state.ok ? "bg-emerald/10 text-deep" : "bg-burgundy/10 text-burgundy"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
