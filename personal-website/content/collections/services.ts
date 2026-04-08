import type { ServiceTier } from "@/lib/types";

export const serviceTiers: ServiceTier[] = [
  {
    id: "enterprise-corridors",
    title: "Tier 1 - Enterprise Corridors",
    summary: "High-ticket advisory for complex agro-industrial expansion, regional trade architecture, and institutional-scale deployment across Asia-Africa corridors.",
    audience: "Agro-industrial groups, regional operators, trading houses, development actors, and serious enterprise principals.",
    cta: "Apply for Advisory",
    pricing: "From enterprise scoping and retained mandate pricing",
    delivery: "Brief intake, internal review, fit assessment, strategy call, proposal corridor, and execution path.",
    offers: [
      "Agro-industrial expansion and hydroponics",
      "Global supply chain diplomacy between Asia and Africa",
      "Fleet management and automation",
      "Cross-border operational systems design"
    ]
  },
  {
    id: "systems-transformation",
    title: "Tier 2 - Institutional Systems Transformation",
    summary: "Architecture for institutions that need better automation, knowledge systems, publishing logic, technical workflow, and operational resilience.",
    audience: "Founder-led institutions, family enterprises, education platforms, and strategic operators building future-proof systems.",
    cta: "Request Transformation Review",
    pricing: "From structured audit and transformation engagement pricing",
    delivery: "Systems audit, workflow diagnosis, architecture recommendation, roadmap design, and implementation advisory.",
    offers: [
      "System architecture",
      "Automation strategy and systems analysis",
      "Executive publishing and knowledge infrastructure",
      "Digital operating model redesign"
    ]
  },
  {
    id: "diplomatic-desk",
    title: "Tier 3 - Diplomatic Desk Strategy Session",
    summary: "A premium clarity corridor for focused executive problem-solving, directional synthesis, and next-step design.",
    audience: "Executives, founders, directors, sovereign operators, and serious decision-makers.",
    cta: "Book Diplomatic Desk Session",
    pricing: "$500 approved-session deposit before scheduling",
    delivery: "Pre-session brief, one 90-minute strategy intensive, written synthesis, and routed next steps.",
    offers: [
      "90-minute strategy intensive",
      "Executive clarity and decision support",
      "Focused advisory on systems, logistics, or institutional direction"
    ]
  }
];

export const engagementModels = [
  "Apply for Advisory intake for Tier 1 and Tier 2 mandates",
  "Approved paid Diplomatic Desk strategy session for Tier 3",
  "Retained executive counsel where a mandate requires continuity",
  "Proposal or invoice routing for enterprise deployments",
  "Manual bank transfer corridor for institutional clients"
];

export const qualificationStandards = [
  "Mandate seriousness and operational timing",
  "Alignment between ambition, budget, and deployment horizon",
  "Geopolitical, multilingual, or systems complexity",
  "Readiness for disciplined implementation after advice is given"
];
