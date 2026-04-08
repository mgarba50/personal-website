import { collections } from "@/lib/content";
import type { SearchRecord } from "@/lib/types";

export const searchRecords: SearchRecord[] = [
  ...collections.books.map((book) => ({
    type: "Book" as const,
    title: book.title,
    href: `/canon/${book.slug}`,
    summary: book.abstract,
    tags: [...book.themes, ...book.languages]
  })),
  ...collections.articles.map((article) => ({
    type: "Article" as const,
    title: article.title,
    href: `/library/${article.slug}`,
    summary: article.summary,
    tags: [article.category, ...article.tags]
  })),
  ...collections.poems.map((poem) => ({
    type: "Poetry" as const,
    title: poem.title,
    href: `/diwan/${poem.slug}`,
    summary: poem.summary,
    tags: [poem.collection, "Arabic", "Poetry"]
  })),
  ...collections.courses.map((course) => ({
    type: "Course" as const,
    title: course.title,
    href: "/madrasa",
    summary: course.summary,
    tags: [course.format, course.access]
  })),
  ...collections.serviceTiers.map((service) => ({
    type: "Service" as const,
    title: service.title,
    href: "/advisory",
    summary: service.summary,
    tags: [service.audience, service.pricing]
  })),
  ...collections.products.map((product) => ({
    type: "Product" as const,
    title: product.name,
    href: "/shop",
    summary: product.description,
    tags: [product.type, product.price]
  })),
  ...collections.mediaCollections.map((media) => ({
    type: "Media" as const,
    title: media.title,
    href: "/album",
    summary: media.description,
    tags: [media.type, ...media.tags]
  })),
  ...collections.initiatives.map((initiative) => ({
    type: "Initiative" as const,
    title: initiative.title,
    href: "/impact",
    summary: initiative.summary,
    tags: [initiative.impactType, ...initiative.assets]
  }))
];

export function filterSearchRecords(query = "", type = "All") {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedType = type.trim();

  return searchRecords.filter((record) => {
    const matchesType = normalizedType === "All" || record.type === normalizedType;
    if (!matchesType) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = `${record.title} ${record.summary} ${record.tags.join(" ")}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
