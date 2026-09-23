import { completedBooks } from "./completed-books";
import { books as existingBooks, type Book } from "./content";
import { workingPublicationBooks } from "./working-books";

const recoveredCoverBySlug: Record<string, string> = {
  "a-multilingual-mind": "/assets/books/a-multilingual-mind/cover.webp",
  "cheating-time": "/assets/books/cheating-time/cover.webp",
  "the-illusion-of-control": "/assets/books/the-illusion-of-control/cover.webp",
  "knowledge-is-seed": "/assets/books/knowledge-is-seed/cover.webp",
  "the-allama-economy": "/assets/books/the-allama-economy/cover.webp",
  "the-climate-resilient-farmer": "/assets/books/the-climate-resilient-farmer/cover.webp",
  "the-entrepreneurial-polyglot": "/assets/books/the-entrepreneurial-polyglot/cover.webp",
  "the-desert-ceo": "/assets/books/the-desert-ceo/cover.webp",
  "the-five-language-ceo": "/assets/books/the-five-language-ceo/cover.webp",
  "the-strategist-of-power": "/assets/books/the-strategist-of-power/cover.webp",
};

function bindRecoveredCover(book: Book): Book {
  return {
    ...book,
    coverImage: book.coverImage ?? recoveredCoverBySlug[book.slug],
  };
}

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
].map(bindRecoveredCover);

// Diwans belong to the dedicated Al-Maqam collection. Keep the general Books
// Canon focused on commercial, completed, and developing non-Diwan works.
const nonDiwanExistingBooks = existingBooks.filter(
  (book) => !book.category.toLowerCase().includes("diwan"),
);

const publicationBySlug = new Map(publicationBooks.map((book) => [book.slug, book]));

export const books: Book[] = nonDiwanExistingBooks.map((book) =>
  bindRecoveredCover(publicationBySlug.get(book.slug) ?? book),
);
const existingSlugs = new Set(nonDiwanExistingBooks.map((book) => book.slug));

for (const book of publicationBooks) {
  if (!existingSlugs.has(book.slug)) books.push(bindRecoveredCover(book));
}

const slugs = new Set(books.map((book) => book.slug));
if (slugs.size !== books.length) {
  throw new Error("Duplicate book slug detected in MusaAllama Canon.");
}
