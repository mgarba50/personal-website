import type { CorporateCapability, CorporateCaseStudy, CorporateService } from "./types";

export const corporateCapabilities: readonly CorporateCapability[] = [
  {
    "slug": "agro-industrial-trade-logistics",
    "title": "Agro-Industrial Trade & Logistics",
    "summary": "We engineer robust supply chains that bridge international manufacturing hubs with emerging agricultural markets, from China–West Africa trade corridors to local deployment."
  },
  {
    "slug": "systems-digital-infrastructure",
    "title": "Systems Architecture & Digital Infrastructure",
    "summary": "We design resilient custom web applications, institutional portals, workflow systems, and automation architecture for serious operations."
  },
  {
    "slug": "corporate-structuring-brand",
    "title": "Corporate Structuring & Brand Identity",
    "summary": "We support institutional structure, documentation, compliance pathways, executive brand systems, and corporate presentation."
  }
];

export const corporateServices: readonly CorporateService[] = [
  {
    "slug": "strategic-session",
    "capabilitySlug": "corporate-structuring-brand",
    "title": "Strategic Session",
    "summary": "A private working session for business, publishing, education, agriculture, or institutional planning.",
    "outcome": "A prioritized operating path with a clear action memo.",
    "startingFee": "NGN 50,000",
    "duration": "60–90 minutes",
    "audience": [
      "Founders",
      "Authors",
      "Agriculture operators",
      "Educators",
      "Institution-builders"
    ],
    "deliverables": [
      "Session brief",
      "Priority map",
      "Next-step action memo",
      "Recommended tools and resources"
    ],
    "seo": {
      "title": "Strategic Session | Musa Allama",
      "description": "Private strategic advisory for business, publishing, education, agriculture, and institutional planning."
    }
  },
  {
    "slug": "china-sourcing",
    "capabilitySlug": "agro-industrial-trade-logistics",
    "title": "China Sourcing & Translation Advisory",
    "summary": "Support for Chinese supplier communication, verification questions, agrochemical import language, and negotiation preparation.",
    "outcome": "A cleaner supplier-communication and verification workflow.",
    "startingFee": "NGN 75,000",
    "duration": "60–90 minutes",
    "audience": [
      "Importers",
      "Agrochemical traders",
      "Procurement teams",
      "New China-market buyers"
    ],
    "deliverables": [
      "Supplier message pack",
      "Verification checklist",
      "Negotiation phrases",
      "Risk notes"
    ],
    "seo": {
      "title": "China Sourcing & Translation Advisory | Musa Allama",
      "description": "Supplier communication, verification, import language, and negotiation preparation for China-facing buyers."
    }
  },
  {
    "slug": "agro-industrial-strategy",
    "capabilitySlug": "agro-industrial-trade-logistics",
    "title": "Agro-Industrial Strategy",
    "summary": "Advisory for agrochemical trading, hydroponics, market entry, training design, and procurement strategy.",
    "outcome": "A practical agro-business or procurement strategy anchored to field realities.",
    "startingFee": "NGN 100,000",
    "duration": "90 minutes",
    "audience": [
      "Agro-dealers",
      "Training providers",
      "NGOs",
      "Universities",
      "Agricultural entrepreneurs"
    ],
    "deliverables": [
      "Agro strategy note",
      "Training outline",
      "Procurement checklist",
      "Commercial next steps"
    ],
    "seo": {
      "title": "Agro-Industrial Strategy | Musa Allama",
      "description": "Advisory for agrochemical trading, hydroponics, market entry, training design, and procurement strategy."
    }
  },
  {
    "slug": "digital-transformation",
    "capabilitySlug": "systems-digital-infrastructure",
    "title": "Digital Transformation Advisory",
    "summary": "Architecture for websites, automation systems, AI workflows, digital operations, and revenue-ready institutional systems.",
    "outcome": "A sequenced digital operating architecture rather than a disconnected tool list.",
    "startingFee": "NGN 150,000",
    "duration": "90 minutes",
    "audience": [
      "Consultants",
      "Founders",
      "Institutions",
      "Small teams",
      "Knowledge businesses"
    ],
    "deliverables": [
      "System audit",
      "Workflow map",
      "Automation recommendations",
      "Implementation sequence"
    ],
    "seo": {
      "title": "Digital Transformation Advisory | Musa Allama",
      "description": "Architecture for institutional websites, automation, AI workflows, digital operations, and revenue-ready systems."
    }
  },
  {
    "slug": "publishing-system",
    "capabilitySlug": "systems-digital-infrastructure",
    "title": "Publishing System Advisory",
    "summary": "A publishing pipeline advisory for book strategy, digital product packaging, print-ready files, and marketplace setup.",
    "outcome": "A publication and sales pipeline that connects manuscript, editions, channels, and launch.",
    "startingFee": "NGN 100,000",
    "duration": "90 minutes",
    "audience": [
      "Authors",
      "Teachers",
      "Consultants",
      "Publishers",
      "Course creators"
    ],
    "deliverables": [
      "Book strategy memo",
      "Edition plan",
      "Sales channel checklist",
      "Launch sequence"
    ],
    "seo": {
      "title": "Publishing System Advisory | Musa Allama",
      "description": "Publishing pipeline advisory for book strategy, digital product packaging, print editions, and sales channels."
    }
  }
];

export const corporateCaseStudies: readonly CorporateCaseStudy[] = [];
