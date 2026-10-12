export type SiteWing = {
  id: "corporate" | "academy" | "inner-circle";
  label: string;
  shortLabel: string;
  href: string;
  audience: string;
  purpose: string;
  sections: readonly string[];
};

export const siteWings: readonly SiteWing[] = [
  {
    id: "corporate",
    label: "Corporate Advisory & Solutions",
    shortLabel: "Corporate",
    href: "/corporate",
    audience: "Enterprises · NGOs · Institutions",
    purpose: "High-ticket advisory, systems, trade, and institutional execution.",
    sections: [
      "Executive proposition",
      "Core capabilities",
      "Differentiator",
      "Selected proof / case studies",
      "Qualified consultation intake",
    ],
  },
  {
    id: "academy",
    label: "The Academy",
    shortLabel: "Academy",
    href: "/academy",
    audience: "Learners · Professionals · Operators",
    purpose: "Books, resources, courses, certifications, and practical systems.",
    sections: [
      "Topic directory",
      "Free resources",
      "Books and manuals",
      "Courses and certifications",
      "Learning pathways",
    ],
  },
  {
    id: "inner-circle",
    label: "The Inner Circle",
    shortLabel: "Inner Circle",
    href: "/inner-circle",
    audience: "Readers · Members · Serious Researchers",
    purpose: "Long-form writing, Diwan, research, private library, and membership.",
    sections: [
      "Editorial gateway",
      "Long-form writings",
      "Diwan and literary work",
      "Research / private library",
      "Membership gateway",
    ],
  },
] as const;

export const primaryNavigation = siteWings.map(({ shortLabel, href }) => ({
  label: shortLabel,
  href,
}));

export const utilityNavigation = [
  { label: "About", href: "/about" },
  { label: "Consultation", href: "/consultation" },
] as const;

export const legalNavigation = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Refunds", href: "/legal/refund" },
  { label: "Disclaimer", href: "/legal/consulting-disclaimer" },
] as const;
