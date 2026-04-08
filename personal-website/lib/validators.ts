import { z } from "zod";

const text = (label: string) => z.string().trim().min(2, `${label} is required.`);
const email = z.string().trim().email("A valid email address is required.");

export function formDataToObject(formData: FormData) {
  const object: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      object[key] = value.size > 0 ? value.name : "";
      continue;
    }

    object[key] = value.toString();
  }

  return object;
}

export const diplomaticIntakeSchema = z.object({
  fullName: text("Full legal name"),
  organization: text("Organization"),
  title: text("Title"),
  email,
  phone: text("Phone or WhatsApp"),
  jurisdiction: text("Operating jurisdiction"),
  sector: text("Primary sector"),
  objective: text("Strategic objective"),
  languages: z.string().trim().optional().default(""),
  budget: text("Budget range"),
  horizon: text("Deployment horizon"),
  attachment: z.string().trim().optional().default("")
});

export const clarityIntakeSchema = z.object({
  fullName: text("Full name"),
  designation: text("Designation"),
  email,
  secureContact: text("Secure contact"),
  misalignment: text("Primary locus of misalignment"),
  friction: text("Executive summary of friction"),
  objective: text("Paralyzed objective"),
  previousCounsel: z.string().trim().optional().default(""),
  protocolAcknowledgement: z.string().trim().min(1, "Protocol acknowledgement is required."),
  ndaRequired: z.string().trim().optional().default("")
});

export const contactSchema = z.object({
  fullName: text("Full name"),
  email,
  organization: z.string().trim().optional().default(""),
  inquiryType: text("Inquiry type"),
  message: text("Message")
});

export const pressSchema = z.object({
  fullName: text("Full name"),
  organization: text("Organization"),
  email,
  requestType: text("Request type"),
  details: text("Request details")
});

export const institutionalOrderSchema = z.object({
  fullName: text("Full name"),
  organization: text("Institution or library"),
  email,
  bookTitle: text("Requested work"),
  requestType: text("Request type"),
  details: text("Request details")
});

export const supportSchema = z.object({
  fullName: text("Full name"),
  organization: z.string().trim().optional().default(""),
  email,
  supportType: text("Support type"),
  details: text("Support brief")
});

export const newsletterSchema = z.object({
  name: text("Name"),
  email,
  interests: text("Primary interest"),
  consent: z.string().trim().min(1, "Consent is required.")
});

export const paymentIntentSchema = z.object({
  productSlug: text("Product slug"),
  channel: text("Payment channel")
});
