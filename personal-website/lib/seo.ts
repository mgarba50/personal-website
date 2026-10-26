import type { Metadata } from "next";

const siteName = "MusaAllama.com";
const baseTitle = "Musa Allama";
const defaultDescription =
  "Books, courses, strategic advisory, agro-industrial intelligence, and multilingual scholarship from Musa Allama.";

export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = "/images/institutional-hero.png",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    ...(["/admin", "/dashboard", "/checkout"].includes(path) ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description,
      url: path,
      siteName,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${baseTitle}`,
      description,
      images: [image],
    },
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
