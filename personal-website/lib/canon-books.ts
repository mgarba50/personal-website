import { completedBooks } from "./completed-books";
import { books as existingBooks, type Book } from "./content";
import { workingPublicationBooks } from "./working-books";

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
  ...completedBooks,
  ...workingPublicationBooks,
];

// Diwans belong to the dedicated Al-Maqam collection. Keep the general Books
// Canon focused on commercial, completed, and developing non-Diwan works.
const nonDiwanExistingBooks = existingBooks.filter(
  (book) => !book.category.toLowerCase().includes("diwan"),
);

const publicationBySlug = new Map(publicationBooks.map((book) => [book.slug, book]));

export const books: Book[] = nonDiwanExistingBooks.map(
  (book) => publicationBySlug.get(book.slug) ?? book,
);
const existingSlugs = new Set(nonDiwanExistingBooks.map((book) => book.slug));

for (const book of publicationBooks) {
  if (!existingSlugs.has(book.slug)) books.push(book);
}

const slugs = new Set(books.map((book) => book.slug));
if (slugs.size !== books.length) {
  throw new Error("Duplicate book slug detected in MusaAllama Canon.");
}
