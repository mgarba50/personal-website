import { ForthcomingBookPage } from "@/components/books/forthcoming-book-page";
import { books, publicationBooks } from "@/lib/canon-books";
import { pageMetadata } from "@/lib/seo";

const book = publicationBooks.find((item) => item.slug === "diwan-al-zill-al-mutaman")!;

export const metadata = pageMetadata({
  title: book.seoTitle ?? book.title,
  description: book.metaDescription ?? book.description,
  path: `/books/${book.slug}`,
});

export default function DiwanAlZillAlMutamanPage() {
  return (
    <ForthcomingBookPage
      book={book}
      allBooks={books}
      author="موسى العلامة بن غَرْبَه اليَرْوَاوِي"
      edition="طبعة القارئ المنقحة — قريبًا"
      language="ar"
    />
  );
}
