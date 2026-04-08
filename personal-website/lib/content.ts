import { articles } from "@/content/collections/articles";
import { books } from "@/content/collections/books";
import { courses } from "@/content/collections/courses";
import { initiatives } from "@/content/collections/initiatives";
import { mediaCollections } from "@/content/collections/media";
import { poems } from "@/content/collections/poems";
import { products } from "@/content/collections/products";
import { serviceTiers } from "@/content/collections/services";

export function getFeaturedBooks() {
  return books.filter((book) => book.featured);
}

export function getFeaturedArticles() {
  return articles.filter((article) => article.featured);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function findBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function findArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function findPoemBySlug(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}

export const collections = {
  articles,
  books,
  courses,
  initiatives,
  mediaCollections,
  poems,
  products,
  serviceTiers
};
