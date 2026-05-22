export type FlagshipProduct = {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  productType: string;
  shortLine: string;
  audience: string[];
  learn: string[];
  contents: string[];
  launchPrice: string;
  standardPrice: string;
  bundleLabel: string;
  bundlePrice: string;
  printPrice?: string;
  licensePrice?: string;
  primaryCta: string;
  secondaryCta: string;
  relatedUpsells: string[];
  relatedBookSlugs: string[];
  coverImage: string;
  previewHref: string;
  coverTone: string;
  salesOrder: number;
  bonuses: string[];
  faq: { question: string; answer: string }[];
  waitlistSlug: string;
  waitlistTitle: string;
  seoTitle: string;
  metaDescription: string;
  authorNote: string;
};

export type BundleOffer = {
  title: string;
  slug: string;
  includes: string[];
  price: string;
  note: string;
};

export type LeadMagnet = {
  title: string;
  slug: string;
  category: string;
  description: string;
  routesTo: string;
};

export type CourseWaitlist = {
  title: string;
  slug: string;
  description: string;
  relatedBookSlugs: string[];
};

export const bankDetails = {
  accountName: "Musa Garba",
  accountNumber: "2083408157",
  bank: "Sterling Bank",
  notice: "Please use your order number or book title as payment narration where possible.",
};

export const flagshipProducts: FlagshipProduct[] = [
  {
    title: "The Modern Farmer",
    slug: "the-modern-farmer",
    subtitle: "Transforming Land into Enterprise, Institution, and Legacy",
    category: "Agriculture / Farming / Agribusiness / Wealth Creation",
    productType: "Digital PDF Book",
    shortLine:
      "A practical blueprint for profitable agriculture in Africa: science, business, technology, profit, and legacy.",
    audience: [
      "Farmers",
      "Agro-entrepreneurs",
      "Agriculture students",
      "Youth entering agriculture",
      "Training centers",
      "NGOs and development workers",
      "Anyone who wants to turn farming into a serious business",
    ],
    learn: [
      "How to treat agriculture as a serious enterprise.",
      "How to identify profitable agricultural opportunities.",
      "How to understand the agricultural value chain.",
      "How to plan farming operations better.",
      "How to use technology, data, and systems in agriculture.",
      "How to move from farming activity to institution-building.",
    ],
    contents: [
      "Agriculture as a serious enterprise",
      "Profitable opportunity selection",
      "Value chains, markets, and operating discipline",
      "Planning farm operations with better systems",
      "Technology, data, and practical field intelligence",
      "From farming activity to institution and legacy",
    ],
    launchPrice: "NGN 3,500",
    standardPrice: "NGN 5,000",
    bundleLabel: "PDF + Modern Farmer Profit Checklist",
    bundlePrice: "NGN 7,500",
    printPrice: "NGN 15,000 - NGN 20,000",
    primaryCta: "Buy PDF",
    secondaryCta: "Download Free Profit Checklist",
    relatedUpsells: [
      "Hydroponics Practical Certification",
      "Agrochemical Business Masterclass",
      "Modern Farmer Profit Checklist",
    ],
    relatedBookSlugs: ["agrochemical-sales-field-guide", "chinese-for-agrochemical-professionals"],
    coverImage: "/assets/books/the-modern-farmer/cover.jpg",
    previewHref: "/assets/books/the-modern-farmer/the-modern-farmer-preview.pdf",
    coverTone: "emerald",
    salesOrder: 1,
    bonuses: ["Modern Farmer Profit Checklist", "Launch buyer implementation notes"],
    faq: [
      {
        question: "Is this only for experienced farmers?",
        answer:
          "No. It is written for farmers, students, entrepreneurs, and institutions that want to approach agriculture as a serious operating system.",
      },
      {
        question: "How is the PDF delivered?",
        answer:
          "For V1 manual payment, access is delivered by email or secure link after payment confirmation.",
      },
      {
        question: "Can I request a print copy?",
        answer:
          "Yes. Print copies are handled by manual request while production quantities and delivery details are confirmed.",
      },
    ],
    waitlistSlug: "modern-farmer-agribusiness-program",
    waitlistTitle: "Modern Farmer Agribusiness Program",
    seoTitle: "The Modern Farmer by Musa Allama | Profitable Agriculture in Africa",
    metaDescription:
      "A practical guide to profitable modern farming, agribusiness, technology, systems, and agricultural legacy-building in Africa.",
    authorNote:
      "Written for readers who want agriculture to become a serious enterprise, not a seasonal improvisation.",
  },
  {
    title: "Agrochemical Sales Field Guide",
    slug: "agrochemical-sales-field-guide",
    subtitle: "How to Sell Agrochemicals with Technical Confidence, Farmer Trust, and Exceptional Profit",
    category: "Agrochemical Sales / Agribusiness / Farmer Advisory / Technical Selling",
    productType: "Digital PDF Book",
    shortLine:
      "A complete technical and commercial manual for selling herbicides, insecticides, fungicides, fertilizers, and crop protection products.",
    audience: [
      "Agrochemical shop owners",
      "Agrochemical salespeople",
      "Field officers",
      "Agro dealers",
      "Distributors",
      "Technical advisors",
      "Fertilizer sellers",
      "Input suppliers",
      "Agriculture students",
      "Young people entering agrochemical business",
    ],
    learn: [
      "How the agrochemical industry works.",
      "How to sell with technical credibility.",
      "How to diagnose farmer problems.",
      "How to explain agrochemical products clearly.",
      "How to sell herbicides, insecticides, fungicides, fertilizers, and foliar nutrients.",
      "How to calculate dosage and mixing rates.",
      "How to handle farmer objections.",
      "How to build customer loyalty and seasonal sales campaigns.",
    ],
    contents: [
      "The agrochemical industry and its commercial logic",
      "Technical selling and farmer trust",
      "Diagnosing crop and field problems",
      "Herbicides, insecticides, fungicides, fertilizers, and foliar nutrients",
      "Dosage, mixing rates, safety, and objections",
      "Seasonal sales campaigns and dealer growth",
    ],
    launchPrice: "NGN 5,000",
    standardPrice: "NGN 7,500",
    bundleLabel: "Professional PDF + Sales Templates",
    bundlePrice: "NGN 12,000",
    printPrice: "NGN 20,000 - NGN 30,000",
    licensePrice: "NGN 50,000 - NGN 150,000 dealer/team license",
    primaryCta: "Buy PDF",
    secondaryCta: "Download Free Agrochemical Sales Checklist",
    relatedUpsells: [
      "Agrochemical Business Masterclass",
      "Chinese for Agrochemical Professionals",
      "Agro-Industrial Strategy Advisory",
      "Dealer Training Package",
    ],
    relatedBookSlugs: ["the-modern-farmer", "chinese-for-agrochemical-professionals"],
    coverImage: "/assets/books/agrochemical-sales-field-guide/cover.jpg",
    previewHref: "/assets/books/agrochemical-sales-field-guide/agrochemical-sales-field-guide-preview.pdf",
    coverTone: "burgundy",
    salesOrder: 2,
    bonuses: ["Agrochemical Sales Checklist", "Dealer conversation templates", "Seasonal campaign planning notes"],
    faq: [
      {
        question: "Why is this commercially important?",
        answer:
          "It speaks directly to people who want to make money selling agrochemicals while building farmer trust and technical confidence.",
      },
      {
        question: "Does it replace label or regulatory guidance?",
        answer:
          "No. It is educational and commercial guidance. Sellers must still follow product labels, safety instructions, and local regulations.",
      },
      {
        question: "Can a dealer buy for a team?",
        answer:
          "Yes. Dealer and team licenses are available by manual order for shops, sales teams, and training groups.",
      },
    ],
    waitlistSlug: "agrochemical-business-masterclass",
    waitlistTitle: "Agrochemical Business Masterclass",
    seoTitle: "Agrochemical Sales Field Guide by Musa Allama | Sell Agrochemicals with Confidence",
    metaDescription:
      "A complete guide for selling agrochemicals with technical confidence, farmer trust, diagnostic skill, and exceptional profit.",
    authorNote:
      "Designed as the most commercially direct Phase 1 book for sellers, dealers, and agrochemical field operators.",
  },
  {
    title: "Chinese for Agrochemical Professionals",
    slug: "chinese-for-agrochemical-professionals",
    subtitle:
      "The Complete Practical Mandarin Field Manual for Importers, Translators, Agrochemical Sales Experts, and Supplier Negotiators",
    category: "Chinese Language / Agrochemical Trade / Importation / Supplier Communication",
    productType: "Digital PDF Book",
    shortLine:
      "A practical Mandarin field manual for agrochemical importers, translators, sales experts, and supplier negotiators.",
    audience: [
      "Agrochemical importers",
      "Agrochemical dealers",
      "Chinese translators",
      "Supplier negotiators",
      "Procurement officers",
      "China-facing business people",
      "Agrochemical sales teams",
      "Students preparing for Chinese trade work",
    ],
    learn: [
      "Business Chinese phrases.",
      "Agrochemical vocabulary.",
      "Supplier inquiry language.",
      "Pricing and MOQ communication.",
      "Shipping and logistics terms.",
      "WeChat and WhatsApp supplier templates.",
      "Chinese business culture and relationship-building.",
      "Practical interpreter and translator field guidance.",
    ],
    contents: [
      "Business Chinese foundations for importers",
      "Agrochemical product vocabulary",
      "Supplier inquiry, MOQ, price, and sample messages",
      "Shipping, logistics, documents, and inspection terms",
      "WeChat and WhatsApp supplier templates",
      "Interpreter field notes and China-facing business culture",
    ],
    launchPrice: "NGN 7,500",
    standardPrice: "NGN 10,000",
    bundleLabel: "PDF + Chinese Phrases Guide",
    bundlePrice: "NGN 15,000",
    licensePrice: "NGN 25,000 book + Chinese course waitlist bundle",
    primaryCta: "Buy PDF",
    secondaryCta: "Download Free Chinese Phrases Guide",
    relatedUpsells: [
      "Chinese for Importers and Agrochemical Professionals Course",
      "China Supplier Communication Session",
      "China Sourcing Advisory",
    ],
    relatedBookSlugs: ["agrochemical-sales-field-guide", "the-modern-farmer"],
    coverImage: "/assets/books/chinese-for-agrochemical-professionals/cover.jpg",
    previewHref: "/assets/books/chinese-for-agrochemical-professionals/chinese-for-agrochemical-professionals-preview.pdf",
    coverTone: "gold",
    salesOrder: 3,
    bonuses: ["Chinese Phrases Guide", "Supplier message templates", "Course waitlist priority"],
    faq: [
      {
        question: "Do I need to know Chinese already?",
        answer:
          "No. The book is practical and field-oriented, with language categories for importers, translators, and supplier-facing teams.",
      },
      {
        question: "Is there a course connected to this book?",
        answer:
          "Yes. The course waitlist is open for Chinese for Importers and Agrochemical Professionals.",
      },
      {
        question: "Can this help with supplier negotiation?",
        answer:
          "Yes. It includes supplier inquiry language, pricing and MOQ communication, shipping terms, and message templates.",
      },
    ],
    waitlistSlug: "chinese-for-importers-and-agrochemical-professionals",
    waitlistTitle: "Chinese for Importers and Agrochemical Professionals",
    seoTitle: "Chinese for Agrochemical Professionals | Mandarin for Agrochemical Importers",
    metaDescription:
      "A practical Mandarin field manual for agrochemical importers, translators, supplier negotiators, and China-Africa trade professionals.",
    authorNote:
      "A commercial Mandarin tool for serious China-facing agricultural trade, not decorative language study.",
  },
];

export const bundleOffers: BundleOffer[] = [
  {
    title: "Agro Starter Bundle",
    slug: "agro-starter-bundle",
    includes: ["The Modern Farmer", "Agrochemical Sales Field Guide", "Modern Farmer Profit Checklist"],
    price: "NGN 10,000 launch price",
    note: "Available by manual order.",
  },
  {
    title: "Agro Dealer Pro Bundle",
    slug: "agro-dealer-pro-bundle",
    includes: [
      "Agrochemical Sales Field Guide",
      "Chinese for Agrochemical Professionals",
      "Agrochemical Sales Checklist",
      "Chinese Phrases Guide",
    ],
    price: "NGN 15,000 launch price",
    note: "Available by manual order.",
  },
  {
    title: "Complete Phase 1 Canon Bundle",
    slug: "complete-phase-1-canon-bundle",
    includes: [
      "The Modern Farmer",
      "Chinese for Agrochemical Professionals",
      "Agrochemical Sales Field Guide",
      "All available lead magnets and checklists",
    ],
    price: "NGN 20,000 launch price",
    note: "Available by manual order.",
  },
];

export const phaseOneLeadMagnets: LeadMagnet[] = [
  {
    title: "10 Chinese Phrases Every Agrochemical Importer Should Know",
    slug: "10-chinese-phrases-every-agrochemical-importer-should-know",
    category: "Chinese trade communication",
    description: "A starter guide for clearer supplier messages and agrochemical import conversations.",
    routesTo: "Chinese for Agrochemical Professionals",
  },
  {
    title: "Hydroponics Starter Checklist",
    slug: "hydroponics-starter-checklist",
    category: "Hydroponics",
    description: "A practical checklist before buying tanks, pipes, nutrients, seedlings, or training.",
    routesTo: "The Modern Farmer / Hydroponics Practical Certification",
  },
  {
    title: "Agrochemical Sales Field Guide Preview / Checklist",
    slug: "agrochemical-sales-field-guide-preview-checklist",
    category: "Agrochemical sales",
    description: "A practical checklist for trust, timing, diagnosis, dosage questions, and responsible selling.",
    routesTo: "Agrochemical Sales Field Guide",
  },
  {
    title: "Modern Farmer Profit Checklist",
    slug: "modern-farmer-profit-checklist",
    category: "Agribusiness",
    description: "A profit-first checklist for turning farming activity into a clearer business operation.",
    routesTo: "The Modern Farmer",
  },
  {
    title: "How to Turn Your Knowledge into a Digital Product",
    slug: "turn-knowledge-into-a-digital-product",
    category: "Publishing",
    description: "A blueprint for turning expertise into a paid book, checklist, course, or advisory offer.",
    routesTo: "Premium Book Publishing System Course",
  },
];

export const courseWaitlists: CourseWaitlist[] = [
  {
    title: "Chinese for Importers and Agrochemical Professionals",
    slug: "chinese-for-importers-and-agrochemical-professionals",
    description: "For importers, translators, dealers, and China-facing procurement teams.",
    relatedBookSlugs: ["chinese-for-agrochemical-professionals"],
  },
  {
    title: "Agrochemical Business Masterclass",
    slug: "agrochemical-business-masterclass",
    description: "For dealers, field sellers, sales teams, and agrochemical entrepreneurs.",
    relatedBookSlugs: ["agrochemical-sales-field-guide"],
  },
  {
    title: "Hydroponics Practical Certification",
    slug: "hydroponics-practical-certification",
    description: "For practical growers, students, NGOs, and training centers.",
    relatedBookSlugs: ["the-modern-farmer"],
  },
  {
    title: "Modern Farmer Agribusiness Program",
    slug: "modern-farmer-agribusiness-program",
    description: "For readers ready to turn farming knowledge into systems, products, and serious enterprise.",
    relatedBookSlugs: ["the-modern-farmer"],
  },
];

export const orderStatuses = [
  "Pending Payment",
  "Payment Submitted",
  "Payment Under Review",
  "Payment Approved",
  "Download Sent",
  "Cancelled",
];

export const adminPaymentActions = [
  "View submitted receipts",
  "Approve payment",
  "Reject payment",
  "Add note",
  "Send download link",
  "Mark order completed",
];

export const analyticsEvents = [
  "product_card_click",
  "preview_click",
  "buy_pdf_click",
  "manual_checkout_started",
  "payment_proof_submitted",
  "payment_approved",
  "lead_magnet_signup",
  "course_waitlist_signup",
  "bundle_inquiry",
  "print_copy_request",
];

export const customerMessageTemplates = [
  {
    title: "Payment Submitted",
    subject: "Payment Received for Review - MusaAllama.com",
    body: [
      "Hello [Name],",
      "Thank you for submitting payment for [Book Title].",
      "Your payment is now under review.",
      "Order Number: [Order Number]",
      "Once confirmed, your book access will be sent to you.",
      "MusaAllama.com",
    ],
  },
  {
    title: "Payment Approved",
    subject: "Your Book Access Is Ready - [Book Title]",
    body: [
      "Hello [Name],",
      "Your payment has been confirmed.",
      "You now have access to: [Book Title]",
      "Download Link: [Secure Link]",
      "Thank you for purchasing from MusaAllama.com.",
    ],
  },
  {
    title: "Payment Issue",
    subject: "Action Needed on Your Book Order",
    body: [
      "Hello [Name],",
      "We reviewed your payment submission for [Book Title], but we need additional confirmation.",
      "Please reply with a clearer receipt or contact us on WhatsApp.",
      "Order Number: [Order Number]",
    ],
  },
];

export function getFlagshipProduct(slug: string) {
  return flagshipProducts.find((product) => product.slug === slug);
}
