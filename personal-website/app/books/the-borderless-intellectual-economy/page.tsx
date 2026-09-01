import { ForthcomingBookPage } from "@/components/books/forthcoming-book-page";
import { books, publicationBooks } from "@/lib/canon-books";
import { pageMetadata } from "@/lib/seo";

const book = publicationBooks.find((item) => item.slug === "the-borderless-intellectual-economy")!;

export const metadata = pageMetadata({
  title: book.seoTitle ?? book.title,
  description: book.metaDescription ?? book.description,
  path: `/books/${book.slug}`,
});

export default function BorderlessIntellectualEconomyPage() {
  return (
    <ForthcomingBookPage
      book={book}
      allBooks={books}
      author="Musa Allama Ibn Garba"
      edition="Revised Website Reader Edition — Coming soon"
      language="en"
    />
  );
}
