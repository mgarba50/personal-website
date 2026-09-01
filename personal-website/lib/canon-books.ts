import { books as existingBooks, type Book } from "./content";

export const publicationBooks: Book[] = [
  {
    title: "The Borderless Intellectual Economy",
    slug: "the-borderless-intellectual-economy",
    subtitle: "The Gallifrey Model for Global Firm Collaboration",
    category: "Business",
    description:
      "A practical operating manual for designing distributed, multilingual, and cross-border firms around trust, protocols, talent networks, and digital infrastructure.",
    audience:
      "Founders, consultants, project directors, multilingual operators, and institutions that need global reach without building a heavy physical empire.",
    learn: [
      "How to structure knowledge brokerage and expectation engineering across borders.",
      "How to coordinate distributed talent through documented operating protocols and handovers.",
      "How to build cross-cultural conflict resolution, quality assurance, and evidence discipline into remote work.",
      "How to use AI-assisted workflows while preserving human review and executive approval.",
    ],
    contents: [
      "Section I — Introduction to the Borderless Intellectual Economy",
      "Section II — The Gallifrey Model",
      "Section III — How I Built Gallifrey International",
      "Section IV — Operational Workflows",
      "Section V — Technology and Tools of Global Collaboration",
      "Section VI — The Future",
      "Section VII — Implementation Blueprint",
    ],
    authorNote:
      "By Musa Allama Ibn Garba. The book presents the Gallifrey Model as an operating framework drawn from cross-border collaboration experience; internal Gallifrey case studies remain authorial accounts unless separately verified.",
    price: "Coming soon",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "navy",
    related: ["the-five-language-ceo", "the-strategist-of-power", "the-desert-ceo"],
    coverImage: "/assets/books/the-borderless-intellectual-economy/cover.webp",
    previewHref: "/assets/books/the-borderless-intellectual-economy/preview.html",
    promise: "Stop treating geography as the architecture of your firm.",
    primaryCta: "Request release notice",
    secondaryCta: "Preview sample",
    seoTitle: "The Borderless Intellectual Economy | Musa Allama Ibn Garba",
    metaDescription:
      "Build a multilingual, distributed, and execution-driven firm using the Gallifrey Model for global collaboration.",
  },
  {
    title: "ديوان الظلّ المؤتمن",
    slug: "diwan-al-zill-al-mutaman",
    subtitle: "في مدائح المصطفى وآل بيته الأطهار",
    category: "Poetry / Diwan",
    description:
      "ديوان صوفي وجداني في سبعة أبواب، ينتقل من الأمان والكساء والحنين إلى السكينة والقوة والقرب.",
    audience:
      "قراء الشعر العربي والمدائح النبوية والأدب الصوفي، والمهتمون بالديوان العربي المعاصر والقراءة الوجدانية.",
    learn: [
      "قراءة سبعة أبواب وجدانية تتدرج من الأمان والكساء إلى الحنين والسكينة والقرب.",
      "التعرّف إلى بناء الديوان بعد تنقية التكرار التقني وترتيب الأبيات في سياقها المقصود.",
      "قراءة 176 بيتًا في طبعة قارئ منقحة بصريًا مع بقاء المراجعة العروضية النهائية مرحلة مستقلة.",
    ],
    contents: [
      "البعد الأول — باب الأمان الأولي",
      "البعد الثاني — باب الكساء النوراني",
      "البعد الثالث — باب الحنين",
      "البعد الرابع — مقام السكينة",
      "البعد الخامس — سر الليل",
      "البعد السادس — باب القوة",
      "البعد السابع — باب القرب والوصول",
    ],
    authorNote:
      "نظم موسى العلامة بن غَرْبَه اليَرْوَاوِي. هذه طبعة قارئ منقحة في البناء والصف والإخراج، وليست ادعاءً بمراجعة عروضية نقدية نهائية بيتًا بيتًا.",
    price: "Coming soon",
    formats: ["PDF", "EPUB", "Print"],
    coverTone: "gold",
    related: ["diwan-al-hayat", "the-book-of-signs"],
    coverImage: "/assets/books/diwan-al-zill-al-mutaman/cover.webp",
    previewHref: "/assets/books/diwan-al-zill-al-mutaman/preview.html",
    promise: "سبعة أبواب في الشوق والأمان والسكينة.",
    primaryCta: "طلب إشعار الإصدار",
    secondaryCta: "قراءة المقتطف",
    seoTitle: "ديوان الظل المؤتمن | موسى العلامة بن غربة",
    metaDescription:
      "ديوان عربي صوفي في مدائح المصطفى وآل بيته، منظّم في سبعة أبواب وجدانية.",
  },
];

export const books: Book[] = [...existingBooks, ...publicationBooks];

const slugs = new Set(books.map((book) => book.slug));
if (slugs.size !== books.length) {
  throw new Error("Duplicate book slug detected in MusaAllama Canon.");
}
