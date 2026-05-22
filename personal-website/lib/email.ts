import { customerMessageTemplates } from "./revenue";

export const emailConfig = {
  provider: process.env.EMAIL_PROVIDER ?? "resend",
  from: process.env.EMAIL_FROM ?? "MusaAllama.com <hello@musaallama.com>",
  resendKey: process.env.RESEND_API_KEY,
  postmarkToken: process.env.POSTMARK_SERVER_TOKEN,
};

export const transactionalEmailTypes = [
  "welcome",
  "purchase-confirmation",
  "download-delivery",
  "course-enrollment",
  "booking-confirmation",
  "membership-renewal-reminder",
  "contact-form-notification",
];

export const manualPaymentEmailTemplates = customerMessageTemplates;
