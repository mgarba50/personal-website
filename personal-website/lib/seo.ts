import type { Metadata } from "next";

const siteName = "MusaAllama.com";
const baseTitle = "Musa Allama";
const defaultDescription =
  "Books, courses, strategic advisory, agro-industrial intelligence, and multilingual scholarship from Musa Allama.";

export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
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
          url: "/images/institutional-hero.png",
          width: 1600,
          height: 1000,
          alt: "MusaAllama.com institutional visual",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${baseTitle}`,
      description,
      images: ["/images/institutional-hero.png"],
    },
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
