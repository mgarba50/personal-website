import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/checkout",
        "/account",
        "/auth",
        "/login",
        "/signup",
        "/forgot-password",
        "/api/",
      ],
    },
    sitemap: "https://musaallama.com/sitemap.xml",
    host: "https://musaallama.com",
  };
}
