import env from "@/lib/env";
import { wrapEmailTemplate } from "@/emails/templates";

async function sendEmail({
  to,
  subject,
  html,
  replyTo
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.newsletterFromEmail,
      to,
      subject,
      html,
      reply_to: replyTo
    })
  });

  if (!response.ok) {
    throw new Error("Email provider request failed.");
  }

  return response.json();
}

export async function handleSubmission({
  kind,
  payload,
  userEmail,
  userName,
  adminEmail,
  adminSubject,
  userSubject,
  userNextStep
}: {
  kind: string;
  payload: Record<string, string>;
  userEmail: string;
  userName: string;
  adminEmail?: string;
  adminSubject: string;
  userSubject: string;
  userNextStep: string;
}) {
  const details = Object.entries(payload)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`);

  console.info(`[submission:${kind}]`, payload);

  if (env.resendConfigured) {
    await Promise.allSettled([
      sendEmail({
        to: adminEmail || env.adminEmail,
        subject: adminSubject,
        html: wrapEmailTemplate({
          title: adminSubject,
          intro: `A new ${kind} submission has been received.`,
          details,
          nextStep: "Review the submission and route it according to the operating protocol."
        }),
        replyTo: userEmail
      }),
      sendEmail({
        to: userEmail,
        subject: userSubject,
        html: wrapEmailTemplate({
          title: userSubject,
    intro: `Dear ${userName}, your submission has been received by the Office of Musa Allama Ibn Garba.`,
          details: [
            "This acknowledgement confirms receipt only.",
            "Fit review, internal routing, or payment follow-up may occur before any scheduling or fulfillment."
          ],
          nextStep: userNextStep
        })
      })
    ]);
  }

  return {
    ok: true,
    message: env.resendConfigured
      ? "Submission received. An acknowledgement email has been dispatched."
      : "Submission received. Email delivery is in preview mode until provider keys are configured."
  };
}
