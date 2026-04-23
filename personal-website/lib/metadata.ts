import type { Metadata } from "next";
import env from "@/lib/env";

const defaultDescription =
  "Strategic Intelligence & Policy Advisory.";

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/"
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = new URL(path, env.siteUrl);

  return {
    title,
    description,
    metadataBase: new URL(env.siteUrl),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: env.siteName,
      type: "website",
      images: [
        {
          url: "/assets/og-default.png",
          width: 1200,
          height: 630,
          alt: `${env.siteName} executive brand card`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-default.png"]
    }
  };
}
