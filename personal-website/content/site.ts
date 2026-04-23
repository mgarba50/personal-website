import type { ActionLink, CredibilitySignal, Domain, Metric, NavItem, TimelineEvent } from "@/lib/types";

export const primaryNavigation: NavItem[] = [
  { href: "/", label: "Executive Desk" },
  { href: "/about", label: "Executive Dossier" },
  { href: "/advisory", label: "Strategic Advisory" },
  { href: "/canon", label: "The Canon" },
  { href: "/library", label: "Living Library" },
  { href: "/madrasa", label: "The Madrasa" },
  { href: "/institute", label: "The Institute" },
  { href: "/diwan", label: "The Diwan" },
  { href: "/agro-industrial", label: "Agro Command" },
  { href: "/impact", label: "Institutional Impact" },
  { href: "/press", label: "Press Vault" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Diplomatic Desk" }
];

export const heroActions: ActionLink[] = [
  { href: "/advisory", label: "Enter Strategic Advisory", variant: "primary" },
  { href: "/canon", label: "Explore The Canon", variant: "secondary" },
  { href: "/impact", label: "View Institutional Impact", variant: "ghost" }
];

export const homeMetrics: Metric[] = [
  { value: "27+", label: "Countries navigated" },
  { value: "6", label: "Languages spoken and deployed" },
  { value: "10", label: "Unit automated fleet expansion target" },
  { value: "GHCI", label: "Gallifrey Human Capital Initiative endowment corridor" }
];

export const interventionDomains: Domain[] = [
  {
    title: "Agro-industrial systems",
    summary: "Operational architecture for hydroponics, irrigation, fleet automation, agrochemical sourcing, and resilient field-to-market systems.",
    bullets: [
      "High-yield hydroponic deployment",
      "Automated sensor-driven irrigation",
      "International agrochemical sourcing and B2B procurement"
    ]
  },
  {
    title: "Global trade diplomacy",
    summary: "Cross-border commercial diplomacy across Asia-Africa corridors, multilingual negotiation, and strategic trade messaging.",
    bullets: [
      "China-Africa trade corridor fluency",
      "Multilingual negotiation and intermediary positioning",
      "Border intelligence and supply-chain diplomacy"
    ]
  },
  {
    title: "Systems architecture and education",
    summary: "Automation-first operating models, digital literacy pipelines, publishing systems, and executive education design.",
    bullets: [
      "System architecture for institutions and operators",
      "Web development and systems analysis teaching",
      "Executive certification and knowledge infrastructure"
    ]
  },
  {
    title: "Intellectual and spiritual strategy",
    summary: "Confidential work at the intersection of executive clarity, ethical architecture, multilingual scholarship, and legacy structuring.",
    bullets: [
      "Executive Clarity Audit",
      "Corporate Ethical Architecture",
      "Legacy and waqf structuring"
    ]
  }
];

export const credibilitySignals: CredibilitySignal[] = [
  {
    title: "Academic and technical grounding",
    summary: "Electronic and Information Engineering training in China, paired with systems analysis teaching and multilingual technical fluency.",
    metric: "China-trained systems discipline"
  },
  {
    title: "Multilingual geopolitical reach",
    summary: "Arabic, Hausa, Kanuri, English, and Mandarin Chinese are deployed as working instruments of trade, scholarship, and strategic connection.",
    metric: "Cross-cultural authority"
  },
  {
    title: "Human capital mandate",
    summary: "The Gallifrey Human Capital Initiative extends the platform beyond commerce into rehabilitation, agro-sustenance, and technical education for adopted IDP children.",
    metric: "Legacy architecture"
  }
];

export const executiveTimeline: TimelineEvent[] = [
  {
    year: "China formation",
    title: "Engineering, language discipline, and translation work",
    summary: "Formal training in Electronic and Information Engineering at Liaoning University of Technology, alongside Mandarin acquisition and translation work for Islamic texts."
  },
  {
    year: "27-country footprint",
    title: "Travel, study, and systems exposure across continents",
    summary: "Operational and intellectual exposure across more than 27 countries, deepening cross-border perspective in agriculture, sacred sciences, and executive systems."
  },
  {
    year: "Operational command",
    title: "Geidam Agro-Allied and Gallifrey International leadership",
    summary: "Leadership across agro-industrial logistics, import-export operations, global resource connection, and multilingual institutional brokerage."
  },
  {
    year: "Institutional future",
    title: "Publishing, teaching, and human capital architecture",
    summary: "Expansion into didactic publishing, executive education, and the Gallifrey Human Capital Initiative as a long-horizon legacy platform."
  }
];

export const pressDownloads = [
  {
    title: "Selected publications spread",
    description: "A visual spread of flagship books and intellectual properties suitable for early press and partner context.",
    href: "/assets/collection-of-books-featured.png"
  },
  {
    title: "Approved portrait",
    description: "Current executive portrait asset for media, partner, and institutional reference.",
    href: "/assets/musa-allama-executive-portrait.jpg"
  },
  {
    title: "Flagship title cover",
    description: "Current cover art for The Strategist of Power, available as a visual reference until the formal press kit is prepared.",
    href: "/assets/book-the-strategist-of-power.png"
  }
];

export const footerGroups = [
  {
    title: "Institution",
    links: [
      { href: "/", label: "Executive Desk" },
      { href: "/about", label: "Executive Dossier" },
      { href: "/press", label: "Press Vault" },
      { href: "/contact", label: "Diplomatic Desk" }
    ]
  },
  {
    title: "Knowledge",
    links: [
      { href: "/canon", label: "The Canon" },
      { href: "/library", label: "Living Library" },
      { href: "/diwan", label: "The Diwan" },
      { href: "/madrasa", label: "The Madrasa" },
      { href: "/institute", label: "The Institute" }
    ]
  },
  {
    title: "Commerce",
    links: [
      { href: "/advisory", label: "Strategic Advisory" },
      { href: "/inner-diwan", label: "The Inner Diwan" },
      { href: "/shop", label: "Digital Products" },
      { href: "/impact", label: "Institutional Impact" }
    ]
  }
];
