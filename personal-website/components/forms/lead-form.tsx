"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "file";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
  accept?: string;
};

export function LeadForm({
  title,
  summary,
  endpoint,
  submitLabel,
  fields
}: {
  title: string;
  summary: string;
  endpoint: string;
  submitLabel: string;
  fields: Field[];
}) {
  const [status, setStatus] = useState<{ tone: "idle" | "success" | "error"; message: string }>({
    tone: "idle",
    message: ""
  });
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-[28px] border border-line bg-surface/80 p-6">
      <div className="max-w-2xl">
        <h3 className="font-serif text-3xl text-text">{title}</h3>
        <p className="mt-3 text-base leading-8 text-muted">{summary}</p>
      </div>
      <form
        className="mt-8 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);

          startTransition(async () => {
            try {
              const response = await fetch(endpoint, {
                method: "POST",
                body: data
              });
              const payload = await response.json();
              if (!response.ok) {
                setStatus({
                  tone: "error",
                  message: payload.message || "The form could not be processed. Please review the required fields."
                });
                return;
              }

              setStatus({
                tone: "success",
                message: payload.message || "Submission received."
              });
              form.reset();
            } catch {
              setStatus({
                tone: "error",
                message: "The submission did not complete. Please try again after checking your connection."
              });
            }
          });
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <label
              key={field.name}
              className={field.type === "textarea" ? "grid gap-2 md:col-span-2" : "grid gap-2"}
            >
              <span className="text-sm text-muted">
                {field.label}
                {field.required ? " *" : ""}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="min-h-36 rounded-3xl border border-line bg-surface-strong px-4 py-3 text-text outline-none transition focus:border-accent"
                />
              ) : null}
              {field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  className="rounded-3xl border border-line bg-surface-strong px-4 py-3 text-text outline-none transition focus:border-accent"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
              {field.type === "checkbox" ? (
                <span className="flex items-start gap-3 rounded-3xl border border-line bg-surface-strong px-4 py-3">
                  <input
                    type="checkbox"
                    name={field.name}
                    required={field.required}
                    className="mt-1 h-4 w-4 rounded border-line bg-surface"
                  />
                  <span className="text-sm leading-7 text-text">{field.description || field.placeholder}</span>
                </span>
              ) : null}
              {field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  accept={field.accept}
                  required={field.required}
                  className="rounded-3xl border border-dashed border-line bg-surface-strong px-4 py-4 text-sm text-muted"
                />
              ) : null}
              {["text", "email", "tel"].includes(field.type) ? (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="rounded-3xl border border-line bg-surface-strong px-4 py-3 text-text outline-none transition focus:border-accent"
                />
              ) : null}
              {field.description && field.type !== "checkbox" ? (
                <span className="text-xs leading-6 text-muted">{field.description}</span>
              ) : null}
            </label>
          ))}
        </div>
        {status.tone !== "idle" ? (
          <p
            className={
              status.tone === "success"
                ? "rounded-3xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-green-100"
                : "rounded-3xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-100"
            }
          >
            {status.message}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Structured submissions route to review, acknowledgement, and next-step handling.
          </p>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
