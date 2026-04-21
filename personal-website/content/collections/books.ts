import type { Book } from "@/lib/types";

export const bookVolumes = [
  {
    id: "executive-strategy-and-geopolitics",
    title: "Volume I: Executive Strategy and Geopolitics",
    summary: "Manuals on power, negotiation, and cross-border commercial dominance."
  },
  {
    id: "agro-industrial-systems-and-technology",
    title: "Volume II: Agro-Industrial Systems and Technology",
    summary: "Blueprints for sustainable infrastructure, logistics, and digital empowerment."
  },
  {
    id: "philosophical-strategy-and-the-sovereign-mind",
    title: "Volume III: Philosophical Strategy and the Sovereign Mind",
    summary: "The synthesis of classical wisdom, cognitive science, and spiritual integrity."
  },
  {
    id: "the-magnum-opus-diwan-archive",
    title: "Volume IV: The Magnum Opus (The Diwan Archive)",
    summary: "Monumental didactic poetry collections with bilingual and audio-ready presentation."
  }
] as const;

export const books: Book[] = [
  {
    title: "The Strategist of Power",
    subtitle: "Executive command, negotiation, and lasting influence",
    slug: "the-strategist-of-power",
    volume: bookVolumes[0].id,
    abstract:
      "A master manual of calm authority, pattern recognition, and executive psychology. Guides leaders on high-stakes negotiation, crisis management, and the architecture of lasting influence.",
    themes: ["Executive power", "Negotiation", "Influence"],
    audience: ["Executives", "Advisors", "Institution builders"],
    languages: ["English"],
    formats: ["Institutional PDF", "Hardcover"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/book-the-strategist-of-power.png",
    featured: true,
    excerpt: [
      "Calm authority is not passivity. It is a disciplined refusal to surrender the frame of the room.",
      "Power endures when it is architected, not merely performed."
    ]
  },
  {
    title: "The Desert CEO",
    subtitle: "Leadership forged by scarcity and pressure",
    slug: "the-desert-ceo",
    volume: bookVolumes[0].id,
    abstract:
      "Leadership philosophy forged by scarcity and pressure. An exploration of executive resilience, multilingual authority, and decision-making in unforgiving markets.",
    themes: ["Leadership", "Resilience", "Scarcity"],
    audience: ["Executives", "Founders", "Market operators"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/book-the-desert-ceo.jpg",
    featured: true,
    excerpt: [
      "Unforgiving markets expose the difference between performance and structure.",
      "The leader formed under pressure learns to read risk without becoming ruled by it."
    ]
  },
  {
    title: "The Five-Language CEO",
    subtitle: "Multilingual influence for the global boardroom",
    slug: "the-five-language-ceo",
    volume: bookVolumes[0].id,
    abstract:
      "Mastering the global boardroom. Teaches the deployment of multilingual influence (English, Hausa, Arabic, Kanuri, and Code) for high-level diplomacy, emotional intelligence, and cross-cultural negotiation.",
    themes: ["Languages", "Diplomacy", "Boardroom communication"],
    audience: ["Executives", "Negotiators", "Intermediaries"],
    languages: ["English", "Arabic-ready"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/book-the-five-language-ceo.jpg",
    featured: true,
    excerpt: [
      "Language is never only grammar. It is leverage, trust, timing, and emotional navigation.",
      "The multilingual executive carries more than vocabulary into the room. He carries optionality."
    ]
  },
  {
    title: "The Allama Economy",
    subtitle: "Wealth, intellect, and the desert model",
    slug: "the-allama-economy",
    volume: bookVolumes[0].id,
    abstract:
      "A new model for wealth and intellectual capital in Africa. Deconstructs the informal economy, digital leadership, and the \"desert model\" of wealth creation.",
    themes: ["Africa", "Wealth creation", "Informal economy"],
    audience: ["Entrepreneurs", "Strategists", "Policy thinkers"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/bridge-of-meaning-cover.jpg",
    featured: false,
    excerpt: [
      "Economies are not only measured by capital flows, but by the architectures of intelligence that make capital usable.",
      "The desert model rewards mobility, adaptability, and pattern literacy."
    ]
  },
  {
    title: "The Entrepreneurial Polyglot",
    subtitle: "Cultural fluency as economic power",
    slug: "the-entrepreneurial-polyglot",
    volume: bookVolumes[0].id,
    abstract:
      "How linguistic mastery translates into economic power. Cross-continental business strategies and cultural fluency for the global operator.",
    themes: ["Entrepreneurship", "Polyglot strategy", "Cross-continental business"],
    audience: ["Founders", "Global operators", "Intermediaries"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/the-entrepreneurial-polyglot.jpg",
    featured: false,
    excerpt: [
      "Economic power often follows the individual who can move meaning across worlds without loss.",
      "Cultural fluency reduces friction where ordinary operators stall."
    ]
  },
  {
    title: "Agro-Logistics Across the Great Divide",
    subtitle: "Regional trade and closed-loop supply systems",
    slug: "agro-logistics-across-the-great-divide",
    volume: bookVolumes[1].id,
    abstract:
      "The definitive field guide for importing, exporting, and sustaining West African trade. Covers border intelligence, closed-loop supply chains, and regional integration.",
    themes: ["Agro-logistics", "Trade", "Regional integration"],
    audience: ["Agro operators", "Traders", "Procurement teams"],
    languages: ["English"],
    formats: ["Institutional PDF", "Field manual"],
    status: "In development",
    commerceMode: "Institutional order",
    cover: "/assets/article-geopolitical-logistics.jpg",
    featured: true,
    excerpt: [
      "Trade intelligence is as important as transport capacity.",
      "The healthiest supply chains are designed as loops of memory, not just sequences of movement."
    ]
  },
  {
    title: "The Hydroponic Mosque",
    subtitle: "Spiritual architecture meets food resilience",
    slug: "the-hydroponic-mosque",
    volume: bookVolumes[1].id,
    abstract:
      "A revolutionary blueprint synthesizing agricultural engineering, technology, and spiritual architecture to secure year-round food production and community resilience in the Sahel.",
    themes: ["Hydroponics", "Community resilience", "Spiritual architecture"],
    audience: ["Community leaders", "Agricultural planners", "Institutions"],
    languages: ["English", "Arabic-ready"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/collection-of-books-featured.png",
    featured: true,
    excerpt: [
      "Infrastructure can nourish both the body and the moral imagination of a community.",
      "A resilient food future begins where engineering and stewardship stop seeing each other as strangers."
    ]
  },
  {
    title: "The Climate-Resilient Farmer",
    subtitle: "Agriculture for disruption and recovery",
    slug: "the-climate-resilient-farmer",
    volume: bookVolumes[1].id,
    abstract:
      "A strategic survival guide for the future of agriculture. Details soil regeneration, automated water management, and the economic planning required to combat climate disruption.",
    themes: ["Climate resilience", "Soil", "Water management"],
    audience: ["Farm operators", "Agricultural planners", "Impact investors"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Institutional order",
    cover: "/assets/The-Climate-Resilent-Farmer.jpg",
    featured: false,
    excerpt: [
      "Resilience is not improvised in the middle of disruption. It is designed before the shock arrives.",
      "Water intelligence and soil intelligence are executive matters in the future of food."
    ]
  },
  {
    title: "Web Development for World-Changers",
    subtitle: "Digital literacy as institutional leverage",
    slug: "web-development-for-world-changers",
    volume: bookVolumes[1].id,
    abstract:
      "A pedagogical framework for teaching digital literacy and systems architecture to African youth, transforming beginners into architects of the digital economy.",
    themes: ["Web development", "Digital literacy", "Youth empowerment"],
    audience: ["Students", "Educators", "Training institutions"],
    languages: ["English"],
    formats: ["Digital paid PDF"],
    status: "Institutional release",
    commerceMode: "Digital paid PDF",
    cover: "/assets/Engineering-the-journey.JPG",
    featured: false,
    excerpt: [
      "Digital literacy is not only employability. It is structured entry into the logic of systems.",
      "A student who can build software begins to see society itself as something that can be redesigned."
    ]
  },
  {
    title: "The Meta-Intellectual",
    subtitle: "A manifesto for vertical intelligence",
    slug: "the-meta-intellectual",
    volume: bookVolumes[2].id,
    abstract:
      "A unified theory of consciousness and learning. A manifesto for developing vertical intelligence, mastering attention, and operating as a polymath in the modern age.",
    themes: ["Consciousness", "Learning", "Attention"],
    audience: ["Thinkers", "Students", "Polymaths"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/bridge-of-meaning-cover.jpg",
    featured: true,
    excerpt: [
      "Attention is the first treasury of the serious mind.",
      "Polymathy is not accumulation alone. It is the ordering of knowledge into usable form."
    ]
  },
  {
    title: "The Digital Sheikh",
    subtitle: "Spiritual integrity in algorithmic times",
    slug: "the-digital-sheikh",
    volume: bookVolumes[2].id,
    abstract:
      "Maintaining spiritual integrity and psychological sovereignty in the age of algorithmic distraction. Classical Sufi wisdom synthesized with modern cognitive science.",
    themes: ["Spiritual integrity", "Cognitive science", "Distraction"],
    audience: ["Executives", "Seekers", "Educators"],
    languages: ["English", "Arabic-ready"],
    formats: ["Digital paid PDF"],
    status: "Institutional release",
    commerceMode: "Digital paid PDF",
    cover: "/assets/Diwan-Manazil-Noor.PNG",
    featured: true,
    excerpt: [
      "Psychological sovereignty begins with the recovery of attention from algorithmic capture.",
      "The classical path still speaks to modern minds when translated without dilution."
    ]
  },
  {
    title: "A Multilingual Mind",
    subtitle: "Cognitive expansion through language mastery",
    slug: "a-multilingual-mind",
    volume: bookVolumes[2].id,
    abstract:
      "An exploration of cognitive expansion. How mastering multiple languages rewires the brain for rapid learning, deeper synthesis, and cross-cultural adaptability.",
    themes: ["Language", "Cognition", "Learning"],
    audience: ["Students", "Translators", "Executives"],
    languages: ["English", "Arabic-ready"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/the-entrepreneurial-polyglot.jpg",
    featured: false,
    excerpt: [
      "Every new language creates new angles from which reality can be grasped.",
      "The multilingual mind gains both memory and mercy: memory for patterns, mercy for difference."
    ]
  },
  {
    title: "The Book of Signs",
    subtitle: "Pattern recognition, destiny, and executive action",
    slug: "the-book-of-signs",
    volume: bookVolumes[2].id,
    abstract:
      "A philosophical guide to reading life, people, and environments. Teaches advanced pattern recognition and the alignment of executive action with spiritual destiny.",
    themes: ["Signs", "Pattern recognition", "Destiny"],
    audience: ["Executives", "Strategists", "Reflective practitioners"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/bridge-of-meaning-cover.jpg",
    featured: false,
    excerpt: [
      "The skilled reader of signs is not superstitious. He is observant enough to see patterns before they harden into outcomes.",
      "Destiny does not excuse inaction. It disciplines it."
    ]
  },
  {
    title: "Knowledge Is the Seed",
    subtitle: "A blueprint for cultivation of minds and communities",
    slug: "knowledge-is-the-seed",
    volume: bookVolumes[2].id,
    abstract:
      "A mentor's blueprint for intellectual development, unyielding curiosity, and the cultivation of community knowledge.",
    themes: ["Knowledge", "Mentorship", "Community"],
    audience: ["Mentors", "Students", "Community builders"],
    languages: ["English"],
    formats: ["Digital paid PDF"],
    status: "Institutional release",
    commerceMode: "Digital paid PDF",
    cover: "/assets/knowledge-is-the-seed.jpg",
    featured: false,
    excerpt: [
      "Knowledge becomes seed when it is carried into the soil of other lives.",
      "A true mentor builds ecosystems of curiosity rather than followers."
    ]
  },
  {
    title: "The Transcendent Society",
    subtitle: "A civilizational design manifesto",
    slug: "the-transcendent-society",
    volume: bookVolumes[2].id,
    abstract:
      "A civilizational manifesto for the 21st century. Designing communities and cities that thrive ethically, technologically, and ecologically.",
    themes: ["Civilization", "Cities", "Ethics", "Ecology"],
    audience: ["Institution builders", "Policy thinkers", "Urban strategists"],
    languages: ["English"],
    formats: ["Institutional PDF"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/Engineering-the-journey.JPG",
    featured: false,
    excerpt: [
      "The healthy society is not anti-technology. It is technologically capable and ethically governed.",
      "Cities must be designed to protect attention, dignity, and ecological continuity."
    ]
  },
  {
    title: "Diwan al-Hayat wa al-Dirasa",
    subtitle: "The Life and Study Diwan",
    slug: "diwan-al-hayat-wa-al-dirasa",
    volume: bookVolumes[3].id,
    abstract:
      "An unprecedented 4,000+ verse encyclopedia in Bahr al-Rajaz. Synthesizes all human knowledge—philosophy, science, ethics, and the arts—into 16 master chapters.",
    themes: ["Diwan", "Encyclopedic poetry", "Knowledge systems"],
    audience: ["Readers", "Scholars", "Institutions"],
    languages: ["Arabic", "English-ready"],
    formats: ["Flagship manuscript", "Institutional order"],
    status: "Institutional release",
    commerceMode: "Institutional order",
    commercialTier: "Flagship Masterpiece",
    cover: "/assets/Diwan-Manazil-Noor.PNG",
    featured: true,
    excerpt: [
      "The didactic archive culminates here as one long poetic architecture of study, life, and disciplined knowing.",
      "This flagship volume anchors the entire Diwan universe."
    ]
  },
  {
    title: "The Agro-Logistics and Modern Farming Diwan",
    subtitle: "Verse for operations, crops, and field intelligence",
    slug: "the-agro-logistics-and-modern-farming-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "A poetic and practical manual on hydroponics, aeroponics, and regional crop trade, drawn directly from the operations of Geidam Agro-Allied.",
    themes: ["Agriculture", "Diwan", "Hydroponics"],
    audience: ["Agro operators", "Students", "Institutions"],
    languages: ["Arabic", "English-ready"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Institutional order",
    cover: "/assets/The-Climate-Resilent-Farmer.jpg",
    featured: false,
    excerpt: [
      "The field, the warehouse, and the market speak to one another through نظم as well as logistics.",
      "Operational knowledge becomes portable when converted into memorable verse."
    ]
  },
  {
    title: "The Executive Skills and Life Mastery Diwan",
    subtitle: "Classical verse for modern leadership discipline",
    slug: "the-executive-skills-and-life-mastery-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "Time management, visionary planning, and leadership decision-making codified into classical verse for the modern entrepreneur.",
    themes: ["Leadership", "Productivity", "Diwan"],
    audience: ["Executives", "Founders", "Students"],
    languages: ["Arabic", "English-ready"],
    formats: ["Digital paid PDF"],
    status: "Institutional release",
    commerceMode: "Digital paid PDF",
    cover: "/assets/Cheating-Time.JPG",
    featured: false,
    excerpt: [
      "Discipline is easier to remember when wisdom is made rhythmic.",
      "Life mastery requires meter as well as method."
    ]
  },
  {
    title: "The Languages and Communication Diwan",
    subtitle: "The rhetoric of intercultural bridging",
    slug: "the-languages-and-communication-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "The poetic principles of linguistic mastery across Arabic, Mandarin, English, and French, highlighting the rhetoric of intercultural bridging.",
    themes: ["Languages", "Communication", "Diwan"],
    audience: ["Translators", "Students", "Diplomats"],
    languages: ["Arabic", "English-ready", "Mandarin-aware"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/the-entrepreneurial-polyglot.jpg",
    featured: false,
    excerpt: [
      "Language is bridge-work. Verse makes the bridge memorable.",
      "Communication is strongest when rhetoric and empathy move together."
    ]
  },
  {
    title: "The Universal Logic and Cognition Diwan",
    subtitle: "Reasoning, error avoidance, and metaphysical thought",
    slug: "the-universal-logic-and-cognition-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "A rigorous poetic exploration of deductive reasoning, error avoidance, and metaphysical thought.",
    themes: ["Logic", "Cognition", "Metaphysics"],
    audience: ["Students", "Philosophers", "Analysts"],
    languages: ["Arabic", "English-ready"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/Engineering-the-journey.JPG",
    featured: false,
    excerpt: [
      "The disciplined mind must learn not only how to think, but how to avoid its most elegant mistakes.",
      "Verse can preserve logical structure without reducing wonder."
    ]
  },
  {
    title: "The Ethics and Morality Diwan",
    subtitle: "Virtue for the modern professional",
    slug: "the-ethics-and-morality-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "The timeless rules of virtue, courage, justice, and self-control, structured for the modern professional.",
    themes: ["Ethics", "Virtue", "Professional conduct"],
    audience: ["Professionals", "Leaders", "Students"],
    languages: ["Arabic", "English-ready"],
    formats: ["Digital paid PDF"],
    status: "Institutional release",
    commerceMode: "Digital paid PDF",
    cover: "/assets/bridge-of-meaning-cover.jpg",
    featured: false,
    excerpt: [
      "Without ethics, competence becomes dangerous.",
      "Moral structure is what lets power remain useful to others."
    ]
  },
  {
    title: "The Science and Cosmos Diwan",
    subtitle: "Physics, astronomy, biology, and observable law in verse",
    slug: "the-science-and-cosmos-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "Physics, mathematics, astronomy, and biology explained through verse, emphasizing observable laws and ecological consciousness.",
    themes: ["Science", "Cosmos", "Ecology"],
    audience: ["Students", "Readers", "Educators"],
    languages: ["Arabic", "English-ready"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/Engineering-the-journey.JPG",
    featured: false,
    excerpt: [
      "Scientific law and poetic beauty are not enemies.",
      "The cosmos becomes more teachable when knowledge is carried on a memorable line."
    ]
  },
  {
    title: "The Arts and Aesthetics Diwan",
    subtitle: "Creative expression, architecture, and beauty",
    slug: "the-arts-and-aesthetics-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "Principles of creative expression, architecture, and beauty.",
    themes: ["Art", "Architecture", "Beauty"],
    audience: ["Artists", "Designers", "Readers"],
    languages: ["Arabic", "English-ready"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/collection-of-books-featured.png",
    featured: false,
    excerpt: [
      "Beauty has rules, but its deepest rules are felt before they are codified.",
      "Aesthetic formation belongs inside serious education."
    ]
  },
  {
    title: "The Concluding Wisdom Diwan",
    subtitle: "Reflection, moral legacy, and future education",
    slug: "the-concluding-wisdom-diwan",
    volume: bookVolumes[3].id,
    abstract:
      "The capstone volume focusing on moral legacy, profound reflection, and the vision for future global education initiatives.",
    themes: ["Legacy", "Reflection", "Education"],
    audience: ["Readers", "Institutions", "Students"],
    languages: ["Arabic", "English-ready"],
    formats: ["Institutional order"],
    status: "In development",
    commerceMode: "Request manuscript",
    cover: "/assets/bridge-of-meaning-cover.jpg",
    featured: false,
    excerpt: [
      "The final wisdom of a body of work lies in what it trains the next generation to become.",
      "Legacy is not the past remembered, but the future prepared."
    ]
  }
];
