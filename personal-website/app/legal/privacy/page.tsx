import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for MusaAllama.com.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="How MusaAllama.com handles account, order, inquiry, membership, course, and newsletter information."
      />
      <section className="px-5 py-16">
        <article className="content mx-auto max-w-4xl rounded-lg border border-line bg-white/80 p-7 text-muted">
          <h2>Information collected</h2>
          <p>
            The platform may collect name, email, phone, organization, country, inquiry details, purchase records,
            membership tier, course progress, bookings, and newsletter interests.
          </p>
          <h2>How information is used</h2>
          <p>
            Information is used to process orders, deliver downloads, enroll students, issue certificates, manage
            memberships, respond to inquiries, send transactional emails, and deliver The Institutional Dispatch.
          </p>
          <h2>Service providers</h2>
          <p>
            Payments, authentication, email, storage, analytics, and database services may be handled by providers such as
            Stripe, Paystack, Flutterwave, Supabase, Clerk, Resend, Postmark, Cloudinary, and Vercel.
          </p>
        </article>
      </section>
    </>
  );
}
