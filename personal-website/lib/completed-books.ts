import type { Book } from "./content";

export const completedBookFrontMatter: Record<string, { author: string; edition: string }> = {
  "a-multilingual-mind": {
    author: "Musa Allama ibn Garba",
    edition: "Revised and Expanded Website Edition, 2026",
  },
  "cheating-time": {
    author: "Musa Allama Ibn Garba",
    edition: "Revised website-ready edition, 2026",
  },
  "the-illusion-of-control": {
    author: "Musa Allama Ibn Garba",
    edition: "Sovereign Executive Edition",
  },
  "knowledge-is-seed": {
    author: "Musa Allama",
    edition: "Completed manuscript edition",
  },
  "the-allama-economy": {
    author: "Musa Allama Ibn Garba",
    edition: "Completed manuscript edition",
  },
  "the-climate-resilient-farmer": {
    author: "Musa Allama Ibn Garba",
    edition: "Completed manuscript edition",
  },
  "the-entrepreneurial-polyglot": {
    author: "Musa Allama Ibn Garba",
    edition: "Completed manuscript edition",
  },
  "the-desert-ceo": {
    author: "Musa Allama Ibn Garba",
    edition: "Completed manuscript edition",
  },
  "the-five-language-ceo": {
    author: "Musa Allama",
    edition: "Completed manuscript edition",
  },
  "the-strategist-of-power": {
    author: "Musa Allama Ibn Garba",
    edition: "Completed manuscript edition",
  },
};

export const completedManuscriptSlugs = new Set(Object.keys(completedBookFrontMatter));

export const completedBooks: Book[] = [
  {
    title: "A Multilingual Mind",
    slug: "a-multilingual-mind",
    subtitle: "The Cognitive Benefits, Trade-offs, and Transformations of Speaking Five Languages",
    category: "Languages",
    description:
      "A revised and expanded study of multilingual experience, cognition, identity, communication, and the practical discipline of thinking across languages.",
    audience:
      "Polyglots, translators, language students, educators, migrants, international operators, and readers interested in multilingual cognition.",
    learn: [
      "How multilingual language control, switching, and interference work without turning research findings into mythology.",
      "How language can shape identity, perspective-taking, professional communication, and social context.",
      "How to build sustainable multilingual practice while respecting attention, fatigue, and the limits of cognition.",
    ],
    contents: [
      "Preface: The Mind That Refused One Language",
      "Sector I: The Genesis — The Hardware Metaphor",
      "Sector II: The Ascension — The Operating Systems",
      "Sector III: The Crucible — The Polyglot Programmer",
      "Sector IV: The Expanse — The Social Chameleon",
      "Sector V: The Convergence — The Long Game",
      "Sector VI: The Resolution — The Meta-Language",
      "Appendices: Practice system and thirty-day challenge",
    ],
    authorNote:
      "The revised master and print edition are complete and retained privately. Commercial release terms have not yet been supplied.",
    price: "Coming soon",
    formats: ["Private master", "6 × 9 print master", "Free reader excerpt archived privately"],
    coverTone: "navy",
    related: ["the-five-language-ceo", "the-entrepreneurial-polyglot", "chinese-for-agrochemical-professionals"],
    promise:
      "A careful, experience-led exploration of the multilingual mind that separates useful metaphor from overclaiming.",
    seoTitle: "A Multilingual Mind by Musa Allama Ibn Garba | Speaking Five Languages",
    metaDescription:
      "A revised and expanded book on multilingual cognition, language switching, identity, communication, and the practical experience of speaking five languages.",
  },
  {
    title: "Cheating Time",
    slug: "cheating-time",
    subtitle: "Metacognition and the Art of Speed-Learning — The Minimal Operating System of Consciousness",
    category: "Technology",
    description:
      "A systems-oriented book on metacognition, learning architecture, symbolic transfer, attention, second-brain systems, AI-assisted work, discipline, and legacy.",
    audience:
      "Serious learners, educators, builders, technologists, knowledge workers, and readers designing deliberate learning systems.",
    learn: [
      "How to think about learning as an architecture rather than a collection of isolated subjects.",
      "How feedback loops, second-brain systems, deliberate attention, and tool-assisted work can strengthen learning practice.",
      "How discipline, teaching, and reusable systems turn individual knowledge into durable capability.",
    ],
    contents: [
      "Front Matter and the Borderless Intellectual Economy",
      "Part I: The Architecture of Learning",
      "Part II: Symbolic Systems and Transfer",
      "Part III: The Extended Mind",
      "Part IV: Discipline, Attention, and Information",
      "Part V: Systems, Teaching, and Legacy",
      "The 30-Day Cheating Time Protocol",
      "Glossary, selected reading, and author note",
    ],
    authorNote:
      "The editable master and 6 × 9 print interior are complete and retained privately. No sale price has been supplied.",
    price: "Coming soon",
    formats: ["Private editable master", "Private 6 × 9 print interior"],
    coverTone: "gold",
    related: ["a-multilingual-mind", "the-allama-economy", "the-strategist-of-power"],
    seoTitle: "Cheating Time by Musa Allama Ibn Garba | Metacognition and Speed-Learning",
    metaDescription:
      "A systems-oriented book on metacognition, speed-learning, second-brain architecture, AI-assisted learning, attention, discipline, and knowledge systems.",
  },
  {
    title: "The Illusion of Control",
    slug: "the-illusion-of-control",
    subtitle: "A Structural Analysis of Behavior, Reinforcement, and the Gradual Loss of Agency",
    category: "Philosophy",
    description:
      "A concise executive study of reinforcement, repetition, behavioral drift, structure, and the ways repeated actions can quietly reshape agency.",
    audience:
      "Executives, professionals, educators, students, and readers interested in behavioral systems, disciplined self-governance, and decision-making.",
    learn: [
      "Why awareness alone does not guarantee stable control over repeated behavior.",
      "How reinforcement and repetition can move from isolated choices toward patterns and identity.",
      "Why deliberate structure matters when protecting agency and decision quality.",
    ],
    contents: [
      "I. The Quiet Drift of Control",
      "II. The Mechanics of Influence",
      "III. The First Fracture",
      "The Doctrine of Structural Control",
      "About the Author",
    ],
    authorNote:
      "The Sovereign Executive Edition is a finished private master. No commercial price or public download has been supplied.",
    price: "Coming soon",
    formats: ["Private Sovereign Executive Edition"],
    coverTone: "deep",
    related: ["the-desert-ceo", "the-strategist-of-power", "cheating-time"],
    seoTitle: "The Illusion of Control by Musa Allama Ibn Garba | Behavior and Agency",
    metaDescription:
      "A structural analysis of behavior, reinforcement, repetition, decision-making, and the gradual loss or preservation of agency.",
  },
  {
    title: "Knowledge is Seed",
    slug: "knowledge-is-seed",
    subtitle: "Mentorship, agricultural literacy, dignity, and the long work of capability-building",
    category: "Agriculture",
    description:
      "A completed six-sector manuscript arguing that durable relief comes from capability, mentorship, agricultural literacy, participation, and systems that let knowledge multiply.",
    audience:
      "Educators, mentors, agriculture trainers, NGOs, community builders, youth-program designers, and readers interested in practical human development.",
    learn: [
      "How mentorship can move assistance from short-term relief toward capability-building.",
      "How agricultural literacy, participation, feedback, and local mentorship can reinforce dignity and self-reliance.",
      "How a small teaching system can scale from individual learners toward families and communities.",
    ],
    contents: [
      "Preface: The Silent Forest",
      "Sector I: The Genesis — Philosophy of Aid",
      "Sector II: The Ascension — The Curriculum",
      "Sector III: The Crucible — The Mechanics",
      "Sector IV: The Expanse — Impact",
      "Sector V: The Convergence — Scaling",
      "Sector VI: The Resolution — Legacy",
    ],
    authorNote:
      "All four manuscript batches are complete through Chapter 18, The Final Sowing. The manuscript remains private pending formal release terms.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "emerald",
    related: ["the-modern-farmer", "the-climate-resilient-farmer", "the-allama-economy"],
    seoTitle: "Knowledge is Seed by Musa Allama | Mentorship, Agriculture and Capability",
    metaDescription:
      "A completed manuscript on mentorship, agricultural literacy, dignity, capability-building, community impact, and the long-term value of knowledge.",
  },
  {
    title: "The Allama Economy",
    slug: "the-allama-economy",
    subtitle: "Knowledge, language, networks, strategy, and the economics of human capability",
    category: "Business",
    description:
      "A completed twenty-four-chapter manuscript on human capital, multilingual markets, trust, networks, digital leverage, scarcity economics, and long-horizon African wealth creation.",
    audience:
      "Entrepreneurs, policy-minded readers, executives, students, multilingual operators, and builders interested in African economic capability beyond raw resources.",
    learn: [
      "How financial, social, linguistic, knowledge, and strategic capital interact.",
      "How trust, networks, multilingual access, digital tools, and scarce-resource discipline shape economic opportunity.",
      "How long-horizon thinking and knowledge infrastructure can become foundations for durable prosperity.",
    ],
    contents: [
      "Sector I: Foundations",
      "Sector II: Multilingual Market Theory",
      "Sector III: The Shadow Economy",
      "Sector IV: Digital Nomads of Africa",
      "Sector V: The Desert Model",
      "Sector VI: The Future",
      "Chapter 24: The Allama Mandate",
    ],
    authorNote:
      "All four manuscript batches are complete through The Allama Mandate. The manuscript remains private and unpriced.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "emerald",
    related: ["the-desert-ceo", "the-five-language-ceo", "the-entrepreneurial-polyglot"],
    seoTitle: "The Allama Economy by Musa Allama Ibn Garba | Knowledge and African Capability",
    metaDescription:
      "A completed manuscript on human capital, multilingual markets, networks, digital leverage, scarcity economics, and long-horizon African wealth creation.",
  },
  {
    title: "The Climate-Resilient Farmer",
    slug: "the-climate-resilient-farmer",
    subtitle: "Blending Ancient Wisdom and Modern Engineering for the Sahel",
    category: "Agriculture",
    description:
      "A completed Sahel-focused manuscript connecting resilient farm design, water and soil discipline, controlled environments, technology, regenerative practice, and agricultural stewardship.",
    audience:
      "Farmers, agriculture students, trainers, development practitioners, field operators, and institutions working in dryland and climate-stressed agriculture.",
    learn: [
      "How resilient farming combines local knowledge with modern water, soil, crop, and engineering systems.",
      "How controlled environments, regenerative practice, hydroponics, and digital tools can fit a broader resilience strategy.",
      "How agricultural resilience connects technical practice with stewardship, continuity, and long-term land care.",
    ],
    contents: [
      "The Sahelian climate reality and resilient farm design",
      "Water, soil, crop, and engineering systems",
      "Regenerative agriculture and biological soil practice",
      "Hydroponics and controlled environments",
      "AI and the farming brain",
      "The 2040 Sahel Blueprint",
      "Final Word: The Farmer as Guardian, The New Honour, The Covenant, and The Legacy",
    ],
    authorNote:
      "All four manuscript batches are complete through Chapter 22, The Legacy. The manuscript remains private pending publication release terms.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "emerald",
    related: ["the-modern-farmer", "knowledge-is-seed", "the-allama-economy"],
    seoTitle: "The Climate-Resilient Farmer by Musa Allama Ibn Garba | Sahel Agriculture",
    metaDescription:
      "A completed manuscript on resilient Sahel agriculture, water, soil, regenerative practice, controlled environments, technology, and stewardship.",
  },
  {
    title: "The Entrepreneurial Polyglot",
    slug: "the-entrepreneurial-polyglot",
    subtitle: "Turning Tongues Into Capital in a Globalized Economy",
    category: "Languages",
    description:
      "A completed fifteen-chapter field manuscript on language as commercial infrastructure, direct communication, immersion, cross-cultural operations, negotiation, and multilingual entrepreneurship.",
    audience:
      "Entrepreneurs, translators, importers, exporters, international business students, and multilingual operators working across cultures and markets.",
    learn: [
      "How direct language capability can reduce communication friction in cross-border operations.",
      "How immersion, domain vocabulary, cultural awareness, and practical communication support international work.",
      "How multilingual entrepreneurship connects language, trust, negotiation, and market access without treating translation as a substitute for judgment.",
    ],
    contents: [
      "Sector I: Language as Equity",
      "Sector II: Practical Acquisition",
      "Cross-cultural communication and commercial fluency",
      "Negotiation, trust, and direct supplier relationships",
      "International operating identity and multilingual entrepreneurship",
      "Sector VI: The Entrepreneurial Polyglot's Final Word",
      "Chapter 15: The Invisible Polyglot",
    ],
    authorNote:
      "All four manuscript batches are complete through Chapter 15. The manuscript is retained privately and has no supplied sale price.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "navy",
    related: ["a-multilingual-mind", "the-five-language-ceo", "chinese-for-agrochemical-professionals"],
    seoTitle: "The Entrepreneurial Polyglot by Musa Allama Ibn Garba | Language and Global Business",
    metaDescription:
      "A completed field manuscript on multilingual entrepreneurship, immersion, cross-cultural communication, negotiation, and international business operations.",
  },
  {
    title: "The Desert CEO",
    slug: "the-desert-ceo",
    subtitle: "Leadership, scarcity, multilingual authority, and crisis command",
    category: "Strategy",
    description:
      "A completed twenty-four-chapter leadership manuscript built around calm, scarcity, adaptability, multilingual authority, strategic timing, resilience, and crisis command.",
    audience:
      "Founders, executives, operators, educators, institution-builders, and readers interested in disciplined leadership under difficult conditions.",
    learn: [
      "How constraint, stillness, adaptability, and emotional discipline shape leadership under pressure.",
      "How speech, language choice, timing, and observation influence communication in demanding environments.",
      "How resilience, crisis command, digital leadership, and long-range vision can be organized into a coherent operating philosophy.",
    ],
    contents: [
      "Sector I: The Desert Mind",
      "Sector II: Leadership by Nature",
      "Sector III: Multilingual Authority",
      "Sector IV: Executive Strategy",
      "Sector V: Resilience & Endurance",
      "Sector VI: The Future Desert Leader",
      "Chapter 24: The Desert CEO Manifesto",
    ],
    authorNote:
      "All four manuscript batches are complete through The Desert CEO Manifesto. The manuscript remains private and unpriced.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "burgundy",
    related: ["the-strategist-of-power", "the-allama-economy", "the-five-language-ceo"],
    seoTitle: "The Desert CEO by Musa Allama Ibn Garba | Leadership Under Constraint",
    metaDescription:
      "A completed leadership manuscript on scarcity, calm, adaptability, multilingual authority, timing, resilience, digital leadership, and crisis command.",
  },
  {
    title: "The Five-Language CEO",
    slug: "the-five-language-ceo",
    subtitle: "Language as a strategic operating advantage",
    category: "Languages",
    description:
      "A completed twenty-one-chapter field manual on multilingual executive identity, cultural intelligence, negotiation, border operations, international strategy, and leadership across language worlds.",
    audience:
      "Founders, executives, translators, advisors, international operators, and students who want to understand language as an operating asset.",
    learn: [
      "How multilingual identity can support negotiation, writing, cultural intelligence, and cross-border operations.",
      "How different language contexts can change communication style, expectations, and relationship-building.",
      "How multilingual leadership connects field operations, international strategy, crisis communication, and legacy.",
    ],
    contents: [
      "Preface: The Man Who Speaks Five Worlds",
      "Sector I: The Genesis — Identity",
      "Sector II: The Five Operating Systems",
      "Sector III: The Toolkit — Executive Weapons",
      "Sector IV: The Playbook — Field Operations",
      "Sector V: The Convergence — The Global Career",
      "Sector VI: The Resolution — Future CEO",
      "Chapter 21: The Final Mandate",
    ],
    authorNote:
      "All four manuscript batches are complete through The Final Mandate. The manuscript remains private and no commercial price has been supplied.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "navy",
    related: ["a-multilingual-mind", "the-entrepreneurial-polyglot", "the-desert-ceo"],
    seoTitle: "The Five-Language CEO by Musa Allama | Multilingual Leadership",
    metaDescription:
      "A completed field manual on multilingual executive identity, cultural intelligence, negotiation, border operations, international strategy, and leadership.",
  },
  {
    title: "The Strategist of Power",
    slug: "the-strategist-of-power",
    subtitle: "Strategy, multilingual influence, tactical calm, and institutional power",
    category: "Strategy",
    description:
      "A completed twenty-seven-chapter manuscript on strategic identity, multilingual influence, field strategy, crisis psychology, patience, self-command, and future African leadership.",
    audience:
      "Executives, founders, strategists, educators, institution-builders, and readers interested in disciplined influence and leadership under pressure.",
    learn: [
      "How presence, leverage, multilingual influence, observation, and negotiation fit a broader strategic framework.",
      "How tactical calm, crisis psychology, patience, and self-command affect decision quality.",
      "How strategy can connect individual discipline with institutions, alliances, and long-horizon leadership.",
    ],
    contents: [
      "Preface: The Man Who Walks Between Worlds",
      "Sector I: Identity of the Strategist",
      "Sector II: The Geidam Laws of Power",
      "Sector III: Multilingual Influence",
      "Sector IV: Field Strategy — The Operator",
      "Sector V: The Executive Warrior",
      "Sector VI: The Inner War",
      "Sector VII: The Future Strategist",
      "Chapter 27: The Final Mandate",
    ],
    authorNote:
      "All four manuscript batches are complete through The Final Mandate. The manuscript remains private and unpriced.",
    price: "Coming soon",
    formats: ["Private completed manuscript"],
    coverTone: "deep",
    related: ["the-desert-ceo", "the-allama-economy", "the-illusion-of-control"],
    seoTitle: "The Strategist of Power by Musa Allama Ibn Garba | Strategy and Leadership",
    metaDescription:
      "A completed manuscript on strategic identity, multilingual influence, field strategy, crisis psychology, patience, self-command, and future leadership.",
  },
];

export function mergeCompletedBooks(baseBooks: Book[]) {
  const completedBySlug = new Map(completedBooks.map((book) => [book.slug, book]));
  const merged = baseBooks.map((book) => completedBySlug.get(book.slug) ?? book);
  const existingSlugs = new Set(baseBooks.map((book) => book.slug));

  for (const book of completedBooks) {
    if (!existingSlugs.has(book.slug)) merged.push(book);
  }

  return merged;
}
