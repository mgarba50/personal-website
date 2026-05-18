export const navItems = [
  { label: "Executive Desk", href: "/" },
  { label: "Executive Dossier", href: "/about" },
  { label: "Strategic Advisory", href: "/advisory" },
  { label: "The Canon", href: "/books" },
  { label: "The Madrasa", href: "/courses" },
  { label: "Living Library", href: "/library" },
  { label: "Agro Command", href: "/agro" },
  { label: "Membership", href: "/membership" },
  { label: "Press", href: "/press" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export const pillars = [
  {
    title: "Publishing & Books",
    href: "/books",
    copy: "Manuals, diwans, strategic notes, and print-ready knowledge products.",
  },
  {
    title: "Courses & Certifications",
    href: "/courses",
    copy: "Practical programs for language, agriculture, technology, and publishing.",
  },
  {
    title: "Strategic Advisory",
    href: "/advisory",
    copy: "Private sessions for institutional planning, sourcing, systems, and growth.",
  },
  {
    title: "Agro-Industrial Intelligence",
    href: "/agro",
    copy: "Agrochemical trading, hydroponics, procurement, and field education.",
  },
];

export type Book = {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  description: string;
  audience: string;
  learn: string[];
  contents: string[];
  authorNote: string;
  price: string;
  formats: string[];
  coverTone: string;
  related: string[];
};

export const books: Book[] = [
  {
    title: "The Modern Farmer",
    slug: "the-modern-farmer",
    subtitle: "Practical agriculture for disciplined operators.",
    category: "Agriculture",
    description:
      "A field-oriented manual for growers, input sellers, trainers, and entrepreneurs who want practical agricultural systems that can scale.",
    audience:
      "Farmers, agro-dealers, trainers, students, and operators building commercially serious agriculture.",
    learn: [
      "How to assess farm opportunities with commercial discipline.",
      "How to structure inputs, training, and seasonal campaigns.",
      "How to connect practical field knowledge with profitable operations.",
    ],
    contents: [
      "Agriculture as an operating system",
      "Inputs, timing, and field behavior",
      "Farmer education and trust",
      "Hydroponics and controlled systems",
      "Commercial planning for local markets",
    ],
    authorNote:
      "Written for people who want agriculture to become a serious operating discipline, not a seasonal improvisation.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "emerald",
    related: ["agro-logistics-across-the-great-divide", "chinese-for-agrochemical-professionals"],
  },
  {
    title: "Agro Logistics Across the Great Divide",
    slug: "agro-logistics-across-the-great-divide",
    subtitle: "Movement, procurement, and agricultural trade between difficult markets.",
    category: "Agriculture",
    description:
      "A strategic guide to procurement, agrochemical movement, supplier communication, field distribution, and cross-border operating judgment.",
    audience:
      "Agrochemical importers, distributors, procurement teams, NGOs, and commercial agriculture planners.",
    learn: [
      "How procurement decisions affect field performance.",
      "How to think through supplier risk, shipping language, and stock timing.",
      "How to design a practical logistics intelligence file.",
    ],
    contents: [
      "The great divide in agricultural supply",
      "Supplier verification basics",
      "Agrochemical shipping language",
      "Distribution discipline",
      "Institutional procurement notes",
    ],
    authorNote:
      "Built from the intersection of agricultural trade, language work, and field-level commercial reality.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "navy",
    related: ["the-modern-farmer", "chinese-for-agrochemical-professionals"],
  },
  {
    title: "Chinese for Agrochemical Professionals",
    slug: "chinese-for-agrochemical-professionals",
    subtitle: "Supplier communication, product vocabulary, and negotiation language.",
    category: "Languages",
    description:
      "A focused language manual for agrochemical importers and procurement teams dealing with Chinese suppliers and shipping conversations.",
    audience:
      "Importers, agrochemical traders, procurement assistants, and business owners communicating with Chinese suppliers.",
    learn: [
      "Basic Chinese phrases for supplier messages.",
      "Product, packaging, inspection, and shipping vocabulary.",
      "How to write clearer WeChat and email requests.",
    ],
    contents: [
      "Business Chinese foundations",
      "Agrochemical vocabulary",
      "Supplier verification phrases",
      "Negotiation and payment language",
      "Inspection and shipment messages",
    ],
    authorNote:
      "This is a commercial language tool, designed for serious communication rather than decorative fluency.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB"],
    coverTone: "gold",
    related: ["agro-logistics-across-the-great-divide", "the-five-language-ceo"],
  },
  {
    title: "The Desert CEO",
    slug: "the-desert-ceo",
    subtitle: "Operating clarity for builders in difficult environments.",
    category: "Strategy",
    description:
      "A strategic field book for founders, operators, and institution-builders working with scarce resources and serious ambition.",
    audience: "Entrepreneurs, consultants, educators, and operators building durable work in hard markets.",
    learn: [
      "How to make disciplined decisions under constraint.",
      "How to convert knowledge into an institution.",
      "How to build systems without copying shallow startup formulas.",
    ],
    contents: [
      "Constraint as strategic training",
      "The institution before the brand",
      "Revenue discipline",
      "Operating notes for harsh markets",
      "Legacy and succession",
    ],
    authorNote:
      "A book for builders who need quiet clarity more than loud slogans.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "burgundy",
    related: ["the-strategist-of-power", "the-five-language-ceo"],
  },
  {
    title: "The Five-Language CEO",
    slug: "the-five-language-ceo",
    subtitle: "Language as a strategic operating advantage.",
    category: "Languages",
    description:
      "A practical argument for multilingual leadership across trade, education, publishing, diplomacy, and digital systems.",
    audience:
      "Founders, students, translators, advisors, and executives who need language to become an operating asset.",
    learn: [
      "How multilingual capacity improves trade and advisory work.",
      "How to structure serious language study.",
      "How to connect Arabic, Chinese, English, and local context with institutional strategy.",
    ],
    contents: [
      "Language as infrastructure",
      "The translation advantage",
      "Trade communication",
      "Learning systems for leaders",
      "Institutional memory across languages",
    ],
    authorNote:
      "Language is treated here as strategy, not ornament.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "navy",
    related: ["chinese-for-agrochemical-professionals", "the-desert-ceo"],
  },
  {
    title: "The Strategist of Power",
    slug: "the-strategist-of-power",
    subtitle: "Notes on authority, systems, and institutional movement.",
    category: "Philosophy",
    description:
      "A compact work on strategy, authority, restraint, institutional design, and the ethics of practical power.",
    audience: "Readers interested in strategy, leadership, political thought, and institution-building.",
    learn: [
      "How power moves through systems, language, and incentives.",
      "Why restraint is a strategic asset.",
      "How institutions preserve or waste authority.",
    ],
    contents: [
      "Power and discipline",
      "The architecture of authority",
      "Language and command",
      "Patronage, service, and legacy",
      "Strategic restraint",
    ],
    authorNote:
      "A sober text for readers who prefer institutional thinking to public theatrics.",
    price: "Price placeholder",
    formats: ["PDF", "EPUB", "Collector Edition"],
    coverTone: "deep",
    related: ["the-desert-ceo", "the-book-of-signs"],
  },
  {
    title: "Diwan al-Hayat",
    slug: "diwan-al-hayat",
    subtitle: "Poems, fragments, and meditations on life.",
    category: "Poetry / Diwan",
    description:
      "A literary collection of poems and reflective fragments shaped by language, memory, faith, longing, and disciplined observation.",
    audience: "Readers of poetry, reflective prose, and multilingual literary work.",
    learn: [
      "How poetic thought can preserve memory.",
      "How language carries private and public worlds.",
      "How literature can become part of institutional legacy.",
    ],
    contents: [
      "Poems of place",
      "Fragments of study",
      "Memory and distance",
      "Language and devotion",
      "Closing meditations",
    ],
    authorNote:
      "This collection belongs to the literary wing of the institution.",
    price: "Price placeholder",
    formats: ["PDF", "Print", "Collector Edition"],
    coverTone: "burgundy",
    related: ["the-book-of-signs", "the-five-language-ceo"],
  },
  {
    title: "The Book of Signs",
    slug: "the-book-of-signs",
    subtitle: "Observations on meaning, discipline, and hidden order.",
    category: "Philosophy",
    description:
      "A reflective book of short essays and signs, written for readers who care about meaning, inward discipline, and intellectual formation.",
    audience: "Serious readers, students, thinkers, and members of the private library.",
    learn: [
      "How small observations can become structured knowledge.",
      "How intellectual discipline shapes character.",
      "How a private archive can preserve meaning over time.",
    ],
    contents: [
      "Signs in work",
      "Signs in language",
      "Signs in trade",
      "Signs in study",
      "Signs in silence",
    ],
    authorNote:
      "A quiet companion text for the Living Library and membership circles.",
    price: "Price placeholder",
    formats: ["PDF", "Print", "Collector Edition"],
    coverTone: "gold",
    related: ["diwan-al-hayat", "the-strategist-of-power"],
  },
];

export type Course = {
  title: string;
  slug: string;
  category: string;
  description: string;
  outcomes: string[];
  modules: string[];
  audience: string;
  duration: string;
  certificate: string;
  price: string;
  previewLessons: string[];
};

export const courses: Course[] = [
  {
    title: "Chinese for Importers",
    slug: "chinese-for-importers",
    category: "Languages",
    description:
      "A practical business Chinese course for importers, agrochemical professionals, and procurement teams.",
    outcomes: [
      "Write clearer supplier messages.",
      "Recognize product, inspection, and shipment vocabulary.",
      "Handle basic negotiation phrases with confidence.",
    ],
    modules: [
      "Basic business Chinese",
      "Supplier communication",
      "Agrochemical vocabulary",
      "Negotiation phrases",
      "WeChat communication",
      "Inspection and shipping language",
    ],
    audience: "Importers, agrochemical traders, procurement staff, and entrepreneurs.",
    duration: "5 weeks",
    certificate: "Certificate of completion enabled",
    price: "Price placeholder",
    previewLessons: ["Supplier greeting templates", "Product specification vocabulary"],
  },
  {
    title: "Hydroponics Practical Certification",
    slug: "hydroponics-practical-certification",
    category: "Agriculture",
    description:
      "A field-focused introduction to hydroponic systems, local costing, nutrient basics, and commercial setup.",
    outcomes: [
      "Understand core hydroponic system types.",
      "Plan nutrient and water requirements.",
      "Estimate small commercial setup costs.",
    ],
    modules: [
      "Introduction to hydroponics",
      "Nutrient solutions",
      "System types",
      "Local Nigerian applications",
      "Costing",
      "Commercial setup",
    ],
    audience: "Farmers, students, trainers, NGOs, and new agricultural entrepreneurs.",
    duration: "6 weeks",
    certificate: "Practical certificate enabled after assessment",
    price: "Price placeholder",
    previewLessons: ["What hydroponics solves", "Basic system map"],
  },
  {
    title: "Agrochemical Business Masterclass",
    slug: "agrochemical-business-masterclass",
    category: "Agriculture",
    description:
      "A commercial program for agrochemical product knowledge, seasonal planning, farmer education, and sales channels.",
    outcomes: [
      "Position agricultural inputs responsibly.",
      "Build seasonal sales campaigns.",
      "Educate farmers with practical product guidance.",
    ],
    modules: [
      "Product knowledge",
      "Market positioning",
      "Farmer education",
      "Seasonal campaigns",
      "Sales channels",
      "Compliance basics",
    ],
    audience: "Agro-dealers, field educators, sales teams, and agricultural business owners.",
    duration: "4 weeks",
    certificate: "Certificate of completion enabled",
    price: "Price placeholder",
    previewLessons: ["Input category map", "Field trust checklist"],
  },
  {
    title: "AI for Entrepreneurs",
    slug: "ai-for-entrepreneurs",
    category: "Technology",
    description:
      "A practical AI workflow course for entrepreneurs building research, content, automation, and operations systems.",
    outcomes: [
      "Use AI tools for business research.",
      "Build repeatable content and operations workflows.",
      "Identify automation opportunities without overcomplicating the business.",
    ],
    modules: [
      "AI tools",
      "Automation workflows",
      "Content generation",
      "Business research",
      "Digital operations",
    ],
    audience: "Entrepreneurs, consultants, educators, and small teams.",
    duration: "3 weeks",
    certificate: "Certificate of completion enabled",
    price: "Price placeholder",
    previewLessons: ["AI operating principles", "Research prompt worksheet"],
  },
  {
    title: "Premium Book Publishing System",
    slug: "premium-book-publishing-system",
    category: "Publishing",
    description:
      "A publishing operations course for turning manuscripts into digital products, books, and sales funnels.",
    outcomes: [
      "Structure a manuscript into a marketable product.",
      "Package PDF, print, and digital editions.",
      "Prepare KDP, Selar, Gumroad, and direct sales workflows.",
    ],
    modules: [
      "Manuscript structure",
      "Cover direction",
      "PDF packaging",
      "Digital sales",
      "KDP/Selar/Gumroad",
      "Marketing funnel",
    ],
    audience: "Authors, educators, consultants, and knowledge entrepreneurs.",
    duration: "4 weeks",
    certificate: "Certificate of completion enabled",
    price: "Price placeholder",
    previewLessons: ["Book product map", "Reader promise worksheet"],
  },
];

export type AdvisoryService = {
  title: string;
  slug: string;
  shortTitle: string;
  duration: string;
  price: string;
  description: string;
  audience: string[];
  problems: string[];
  deliverables: string[];
};

export const advisoryServices: AdvisoryService[] = [
  {
    title: "Strategic Session",
    shortTitle: "60-Minute Strategy Session",
    slug: "strategic-session",
    duration: "60-90 minutes",
    price: "Price placeholder",
    description:
      "A private working session for business, publishing, education, agriculture, or institutional planning.",
    audience: ["Founders", "Authors", "Agriculture operators", "Educators", "Institution-builders"],
    problems: ["Unclear offer structure", "Scattered digital systems", "Weak product packaging", "Slow execution"],
    deliverables: ["Session brief", "Priority map", "Next-step action memo", "Recommended tools and resources"],
  },
  {
    title: "China Sourcing & Translation Advisory",
    shortTitle: "China Supplier Communication Session",
    slug: "china-sourcing",
    duration: "60-90 minutes",
    price: "Price placeholder",
    description:
      "Support for Chinese supplier communication, verification questions, agrochemical import language, and negotiation preparation.",
    audience: ["Importers", "Agrochemical traders", "Procurement teams", "New China-market buyers"],
    problems: ["Supplier ambiguity", "Poor product specification", "Weak negotiation language", "Inspection uncertainty"],
    deliverables: ["Supplier message pack", "Verification checklist", "Negotiation phrases", "Risk notes"],
  },
  {
    title: "Agro-Industrial Strategy",
    shortTitle: "Agro-Business Strategy Session",
    slug: "agro-industrial-strategy",
    duration: "90 minutes",
    price: "Price placeholder",
    description:
      "Advisory for agrochemical trading, hydroponics, market entry, training design, and procurement strategy.",
    audience: ["Agro-dealers", "Training providers", "NGOs", "Universities", "Agricultural entrepreneurs"],
    problems: ["Weak field education", "Unclear procurement plan", "Poor market entry", "Unstructured training"],
    deliverables: ["Agro strategy note", "Training outline", "Procurement checklist", "Commercial next steps"],
  },
  {
    title: "Digital Transformation Advisory",
    shortTitle: "Institutional Website Architecture Audit",
    slug: "digital-transformation",
    duration: "90 minutes",
    price: "Price placeholder",
    description:
      "Architecture for websites, automation systems, AI workflows, digital operations, and revenue-ready business systems.",
    audience: ["Consultants", "Founders", "Institutions", "Small teams", "Knowledge businesses"],
    problems: ["Disconnected tools", "Weak conversion paths", "Manual operations", "No content system"],
    deliverables: ["System audit", "Workflow map", "Automation recommendations", "Implementation sequence"],
  },
  {
    title: "Publishing System Advisory",
    shortTitle: "Publishing System Audit",
    slug: "publishing-system",
    duration: "90 minutes",
    price: "Price placeholder",
    description:
      "A publishing pipeline advisory for book strategy, digital product packaging, print-ready files, and marketplace setup.",
    audience: ["Authors", "Teachers", "Consultants", "Publishers", "Course creators"],
    problems: ["Unclear manuscript structure", "Weak cover direction", "No digital sales path", "Fragmented publishing workflow"],
    deliverables: ["Book strategy memo", "Edition plan", "Sales channel checklist", "Launch sequence"],
  },
];

export type Article = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  readingTime: string;
  publishedAt: string;
  relatedProducts: string[];
  content: string[];
};

export const articles: Article[] = [
  {
    title: "How to Start a Small Agrochemical Business in Nigeria",
    slug: "how-to-start-a-small-agrochemical-business-in-nigeria",
    category: "Agrochemicals",
    excerpt:
      "A practical outline for entering the agrochemical market with discipline, farmer trust, and responsible product education.",
    seoTitle: "How to Start a Small Agrochemical Business in Nigeria",
    metaDescription:
      "Learn the practical foundations of starting an agrochemical business in Nigeria, from product selection to farmer education and compliance awareness.",
    readingTime: "7 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["The Modern Farmer", "Agrochemical Business Masterclass"],
    content: [
      "A small agrochemical business should begin with product discipline, not random inventory. The first question is not how many products you can stock, but which crop problems your local market faces repeatedly.",
      "Start with farmer education. A seller who can explain timing, dosage, safety, and expected use cases builds trust faster than a seller who only quotes prices.",
      "Build records from the beginning: suppliers, product batches, farmer feedback, seasonal demand, and complaints. These records become your local market intelligence.",
      "Educational content on this site does not replace legal, financial, medical, or regulatory advice. Agrochemical operators should follow local laws, label instructions, and relevant safety guidance.",
    ],
  },
  {
    title: "Hydroponics for Beginners in Northern Nigeria",
    slug: "hydroponics-for-beginners-in-northern-nigeria",
    category: "Hydroponics",
    excerpt:
      "A sober introduction to hydroponic production, local constraints, and how to think before buying equipment.",
    seoTitle: "Hydroponics for Beginners in Northern Nigeria",
    metaDescription:
      "Understand hydroponics basics, costing, climate considerations, and starter planning for Northern Nigeria.",
    readingTime: "6 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Hydroponics Practical Certification", "The Modern Farmer"],
    content: [
      "Hydroponics is not magic farming. It is controlled growing, which means your water, nutrients, structure, crop selection, and discipline must be stronger than in ordinary improvisation.",
      "In Northern Nigeria, heat, water quality, power reliability, and market access matter. A small system should prove your learning before you expand your capital exposure.",
      "The best beginner plan is a narrow one: choose a crop, define the buyer, price the system, document every input, and learn from a controlled pilot.",
    ],
  },
  {
    title: "Chinese Phrases Every Agrochemical Importer Should Know",
    slug: "chinese-phrases-every-agrochemical-importer-should-know",
    category: "Chinese language",
    excerpt:
      "A business-first language note for importers who need clearer supplier conversations.",
    seoTitle: "Chinese Phrases Every Agrochemical Importer Should Know",
    metaDescription:
      "Practical Chinese communication categories for agrochemical importers: specifications, samples, inspection, shipment, and negotiation.",
    readingTime: "5 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Chinese for Importers", "Chinese for Agrochemical Professionals"],
    content: [
      "The importer does not need decorative language first. The importer needs categories: product specification, active ingredient, packaging, sample, inspection, price, shipment, and complaint.",
      "Clear supplier communication reduces avoidable confusion. Even when a translator is involved, knowing the commercial categories helps you ask better questions.",
      "A good message is short, specific, and verifiable. State the product, quantity, packaging, destination, required documents, and inspection expectations.",
    ],
  },
  {
    title: "How to Verify a Supplier in China",
    slug: "how-to-verify-a-supplier-in-china",
    category: "Strategy",
    excerpt:
      "A practical verification framework for importers before price, payment, and shipment decisions.",
    seoTitle: "How to Verify a Supplier in China",
    metaDescription:
      "A practical checklist for supplier verification, documentation, samples, inspection, and risk reduction when buying from China.",
    readingTime: "8 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["China Supplier Communication Session", "Chinese for Importers"],
    content: [
      "Supplier verification is a process, not a single screenshot. You want documents, factory or trading company clarity, references where possible, product samples, and consistent communication.",
      "Price pressure can make weak suppliers look attractive. Serious buyers separate supplier capability from sales confidence.",
      "For high-risk or regulated goods, professional inspection, legal review, and compliance checks should be part of the buying process.",
    ],
  },
  {
    title: "The Future of Agriculture in Borno State",
    slug: "the-future-of-agriculture-in-borno-state",
    category: "Agriculture",
    excerpt:
      "A strategic note on agricultural recovery, training, inputs, youth skills, and institutional partnerships.",
    seoTitle: "The Future of Agriculture in Borno State",
    metaDescription:
      "A strategic perspective on agriculture in Borno State, including training, inputs, youth skills, and institutional partnerships.",
    readingTime: "7 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Agro-Industrial Strategy", "The Modern Farmer"],
    content: [
      "Agriculture in Borno State requires more than input distribution. It requires training systems, trust, market access, youth skills, and durable institutions that can preserve knowledge.",
      "The opportunity is not only production. It is also agricultural education, equipment access, post-harvest planning, and local entrepreneurship.",
      "Partnerships with universities, NGOs, farmer groups, and private operators can turn scattered interventions into a more coherent agricultural future.",
    ],
  },
  {
    title: "How AI Can Help Small Businesses in Nigeria",
    slug: "how-ai-can-help-small-businesses-in-nigeria",
    category: "AI and automation",
    excerpt:
      "A practical introduction to AI for research, customer communication, content, and operations.",
    seoTitle: "How AI Can Help Small Businesses in Nigeria",
    metaDescription:
      "Learn practical ways Nigerian small businesses can use AI for research, content, customer communication, and digital operations.",
    readingTime: "6 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["AI for Entrepreneurs", "Digital Transformation Advisory"],
    content: [
      "AI is most useful when it is tied to a business workflow. Research, customer replies, content outlines, product descriptions, meeting notes, and operational checklists are good starting points.",
      "The serious question is not whether AI is impressive. The question is where it saves time, improves clarity, or helps the business make better decisions.",
      "Small businesses should document their repeated tasks, then choose one workflow to improve before chasing advanced automation.",
    ],
  },
  {
    title: "Why Most Self-Published Books Fail to Sell",
    slug: "why-most-self-published-books-fail-to-sell",
    category: "Publishing",
    excerpt:
      "A publishing systems note on offer clarity, reader promise, packaging, and distribution.",
    seoTitle: "Why Most Self-Published Books Fail to Sell",
    metaDescription:
      "Understand why self-published books struggle and how authors can improve reader promise, packaging, and sales systems.",
    readingTime: "6 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Premium Book Publishing System", "Publishing System Audit"],
    content: [
      "Most self-published books do not fail because printing is impossible. They fail because the author did not define the reader, the promise, the packaging, or the sales path.",
      "A book is an intellectual product. It needs positioning, a clear title, a strong cover direction, a credible sample, and a way for readers to discover and buy it.",
      "Publishing becomes easier when the author builds a system: manuscript, edition plan, product page, payment flow, delivery, follow-up, and related offers.",
    ],
  },
  {
    title: "How to Sell Agricultural Inputs to Farmers",
    slug: "how-to-sell-agricultural-inputs-to-farmers",
    category: "Agriculture",
    excerpt:
      "A field sales note on trust, timing, product explanation, farmer education, and responsible repeat business.",
    seoTitle: "How to Sell Agricultural Inputs to Farmers",
    metaDescription:
      "Learn practical principles for selling agricultural inputs to farmers through trust, product education, seasonal timing, and responsible field communication.",
    readingTime: "6 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Agrochemical Sales Field Guide", "Agrochemical Business Masterclass"],
    content: [
      "Selling agricultural inputs is not only a retail activity. It is an education activity with commercial consequences. A farmer returns when the seller explains product use honestly and avoids careless promises.",
      "Timing matters. Inputs must be tied to crop stage, weather, disease pressure, and farmer cash flow. A product sold at the wrong time can damage trust even when the product itself is good.",
      "Build simple field records: common crop problems, farmer questions, product performance notes, and seasonal demand. These records improve stock decisions and training messages.",
    ],
  },
  {
    title: "Arabic Learning for Serious Students",
    slug: "arabic-learning-for-serious-students",
    category: "Arabic language",
    excerpt:
      "A sober learning note for students who want Arabic as a disciplined intellectual and spiritual language.",
    seoTitle: "Arabic Learning for Serious Students",
    metaDescription:
      "A practical note for serious Arabic students on discipline, reading habits, vocabulary, grammar, and long-term language formation.",
    readingTime: "5 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["The Five-Language CEO", "Diwan al-Hayat"],
    content: [
      "Serious Arabic learning requires patience, structure, and respect for the language. It is not mastered by scattered apps alone.",
      "The student needs a reading path, grammar discipline, vocabulary review, listening practice, and a teacher or corrective feedback where possible.",
      "Arabic rewards continuity. Small daily work, carefully preserved notes, and repeated reading build a stronger foundation than dramatic bursts of enthusiasm.",
    ],
  },
  {
    title: "How to Build a Personal Knowledge Institution",
    slug: "how-to-build-a-personal-knowledge-institution",
    category: "Strategy",
    excerpt:
      "A blueprint for turning expertise into a serious platform with publishing, teaching, advisory, and archive functions.",
    seoTitle: "How to Build a Personal Knowledge Institution",
    metaDescription:
      "Learn how to structure a personal knowledge institution with books, courses, advisory services, articles, memberships, and archives.",
    readingTime: "9 min read",
    publishedAt: "2026-05-18",
    relatedProducts: ["Personal Knowledge Institution Blueprint", "Strategic Session"],
    content: [
      "A personal knowledge institution is not a personal brand with better typography. It is an operating structure for preserving, selling, teaching, and applying knowledge.",
      "The basic divisions are simple: publish books, teach courses, advise clients, maintain a library, build a member circle, and document impact.",
      "The discipline is in the links between them. An article leads to a book. A book leads to a course. A course leads to advisory. Advisory creates deeper field knowledge. The archive preserves the work.",
    ],
  },
];

export const membershipTiers = [
  {
    title: "Gold Circle",
    slug: "gold-circle",
    price: "Price placeholder",
    description: "For readers, students, and supporters who want steady access to premium knowledge.",
    audience: "Readers, students, early supporters, and practical learners.",
    benefits: [
      "Premium articles",
      "Selected PDFs",
      "Monthly Institutional Dispatch",
      "Discounts on books and courses",
    ],
  },
  {
    title: "Eternal Circle",
    slug: "eternal-circle",
    price: "Price placeholder",
    description: "For serious learners, clients, and institutional supporters who need deeper access.",
    audience: "Advanced learners, repeat clients, educators, and institutional supporters.",
    benefits: [
      "Premium library",
      "Course access discounts",
      "Priority advisory booking",
      "Quarterly private dispatch",
    ],
  },
  {
    title: "Majestic Circle",
    slug: "majestic-circle",
    price: "Price placeholder",
    description: "For elite clients, patrons, and institutional partners requiring private strategic access.",
    audience: "Patrons, institutional partners, senior clients, and invited collaborators.",
    benefits: [
      "Private strategy access",
      "Premium reports",
      "Collector editions",
      "Priority consulting",
      "Invitation-only briefings",
    ],
  },
];

export const leadMagnets = [
  {
    title: "10 Chinese Phrases Every Importer Should Know",
    slug: "10-chinese-phrases-every-importer-should-know",
    category: "Languages",
    description: "A concise supplier communication starter for serious importers.",
  },
  {
    title: "Hydroponics Starter Checklist",
    slug: "hydroponics-starter-checklist",
    category: "Agriculture",
    description: "A practical checklist before buying tanks, pipes, nutrients, or seedlings.",
  },
  {
    title: "Agrochemical Sales Field Guide",
    slug: "agrochemical-sales-field-guide",
    category: "Agriculture",
    description: "A field sales guide for trust, timing, and responsible product explanation.",
  },
  {
    title: "How to Turn Knowledge into a Digital Product",
    slug: "turn-knowledge-into-a-digital-product",
    category: "Publishing",
    description: "A blueprint for packaging expertise into sellable knowledge products.",
  },
  {
    title: "Personal Knowledge Institution Blueprint",
    slug: "personal-knowledge-institution-blueprint",
    category: "Strategy",
    description: "A structural map for building books, courses, advisory, and archives around expertise.",
  },
];

export const serviceProducts = [
  "60-Minute Strategy Session",
  "China Supplier Communication Session",
  "Agro-Business Strategy Session",
  "Publishing System Audit",
  "Institutional Website Architecture Audit",
];

export const adminMetrics = [
  { label: "Total revenue", value: "N0", note: "Connect Stripe, Paystack, or Flutterwave" },
  { label: "Orders this month", value: "0", note: "Awaiting first live transaction" },
  { label: "Active members", value: "0", note: "Tier assignment ready" },
  { label: "Course enrollments", value: "0", note: "Course purchase flow scaffolded" },
  { label: "New inquiries", value: "0", note: "Contact API route ready" },
  { label: "Newsletter subscribers", value: "0", note: "Dispatch signup scaffolded" },
];

export const dashboardItems = [
  "Purchased books",
  "Enrolled courses",
  "Membership status",
  "Download center",
  "Certificates",
  "Advisory bookings",
];

export const legalDisclaimer =
  "Educational, business, agriculture, and advisory content on MusaAllama.com does not replace legal, financial, medical, regulatory, or professional advice. Visitors and clients should consult qualified professionals before making regulated, financial, health, or legal decisions.";
