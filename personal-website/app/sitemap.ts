import type { MetadataRoute } from "next";
import env from "@/lib/env";
import { books } from "@/content/collections/books";
import { articles } from "@/content/collections/articles";
import { poems } from "@/content/collections/poems";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/advisory",
    "/inner-diwan",
    "/canon",
    "/library",
    "/diwan",
    "/madrasa",
    "/institute",
    "/agro-industrial",
    "/impact",
    "/press",
    "/album",
    "/shop",
    "/contact",
    "/search",
    "/policies",
    "/policies/privacy",
    "/policies/terms",
    "/policies/refunds",
    "/policies/booking",
    "/policies/payments",
    "/policies/ip"
  ].map((path) => ({
    url: `${env.siteUrl}${path}`,
    lastModified: new Date()
  }));

  return [
    ...routes,
    ...books.map((book) => ({ url: `${env.siteUrl}/canon/${book.slug}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${env.siteUrl}/library/${article.slug}`, lastModified: new Date(article.date) })),
    ...poems.map((poem) => ({ url: `${env.siteUrl}/diwan/${poem.slug}`, lastModified: new Date() }))
  ];
}
