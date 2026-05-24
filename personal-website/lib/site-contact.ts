export const siteContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@musaallama.com",
  whatsappLabel: process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? "Order support via inquiry form",
  whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "/contact#form",
  calendlyLabel: process.env.NEXT_PUBLIC_CALENDLY_LABEL ?? "Scheduling by request",
  calendlyHref: process.env.NEXT_PUBLIC_CALENDLY_URL ?? process.env.CALENDLY_URL ?? "/contact#form",
  orderNotificationEmail:
    process.env.ORDER_NOTIFICATION_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@musaallama.com",
};
