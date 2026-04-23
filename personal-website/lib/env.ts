const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://musaallama.com",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Musa Allama Ibn Garba",
  analyticsProvider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
  adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "prof@musaallama.com",
  pressEmail: process.env.PRESS_CONTACT_EMAIL || "prof@musaallama.com",
  bookingsEmail: process.env.BOOKINGS_CONTACT_EMAIL || "advisory@musaallama.com",
  newsletterFromEmail: process.env.NEWSLETTER_FROM_EMAIL || "terminal@musaallama.com",
  calendlyLink: process.env.CALENDLY_LINK || "",
  resendConfigured: Boolean(process.env.RESEND_API_KEY),
  stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
  paystackConfigured: Boolean(process.env.PAYSTACK_SECRET_KEY),
  flutterwaveConfigured: Boolean(process.env.FLUTTERWAVE_SECRET_KEY)
};

export function listRequiredEnvironmentVariables() {
  return [
    "NEXT_PUBLIC_SITE_URL",
    "ADMIN_NOTIFICATION_EMAIL",
    "RESEND_API_KEY",
    "STRIPE_SECRET_KEY",
    "PAYSTACK_SECRET_KEY",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "DATABASE_URL"
  ];
}

export default env;
