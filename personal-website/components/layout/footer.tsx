import Link from "next/link";
import env from "@/lib/env";
import { footerGroups } from "@/content/site";
import { profile } from "@/content/profile";
import { LeadForm } from "@/components/forms/lead-form";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/65">
      <div className="mx-auto grid max-w-shell gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent">Strategic Intelligence &amp; Policy Advisory</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl text-text">
            Occasional strategic notes, new releases, institutional updates, and selected reflections from the Office of Musa Allama Ibn Garba.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            This subscription layer is designed for restrained dispatches on geopolitics, agro-industrial systems, executive strategy, and institutional development.
          </p>
          <div className="mt-8">
            <LeadForm
              title="Join the Intelligence Brief"
              summary="Subscribe for curated essays, release notes, and institutional updates."
              endpoint="/api/newsletter"
              submitLabel="Subscribe"
              fields={[
                { name: "name", label: "Full name", type: "text", required: true, placeholder: "Your name" },
                { name: "email", label: "Email address", type: "email", required: true, placeholder: "you@example.com" },
                {
                  name: "interests",
                  label: "Primary interest",
                  type: "select",
                  required: true,
                    options: ["Books and essays", "Strategic advisory", "Agro-industrial updates", "Courses and releases"]
                },
                {
                  name: "consent",
                  label: "Consent",
                  type: "checkbox",
                  required: true,
                  placeholder: "I agree to receive occasional communications and understand I can unsubscribe at any time."
                }
              ]}
            />
          </div>
        </div>
        <div className="grid gap-8 rounded-shell border border-line bg-white p-8 shadow-card">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Office of Musa Allama Ibn Garba</p>
            <p className="mt-4 text-base leading-8 text-muted">
              Institutional headquarters for advisory, scholarship, agro-industrial command, publishing, media readiness, and long-horizon impact architecture.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm uppercase tracking-[0.2em] text-text">{group.title}</h3>
                <div className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-muted transition hover:text-text">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted">
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/terms">Terms of Use</Link>
            <Link href="/policies/refunds">Refund Policy</Link>
            <span>Office routing: {env.adminEmail}</span>
            <span>Advisory corridor: {profile.advisoryEmail}</span>
            <span>WhatsApp: {profile.whatsapp}</span>
            {profile.socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
