import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConversionTracker } from "@/components/commerce/conversion-tracker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import "./architecture.css";

const inter = localFont({ src: "./fonts/inter-latin.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const cormorant = localFont({ src: "./fonts/cormorant-garamond-latin.woff2", variable: "--font-display", weight: "500 700", display: "swap" });
const amiri = localFont({ src: [{ path: "./fonts/amiri-regular.ttf", weight: "400" }, { path: "./fonts/amiri-bold.ttf", weight: "700" }], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://musaallama.com"),
  applicationName: "MusaAllama.com",
  title: {
    default: "Musa Allama | Strategic Advisory, Trade & Practical Education",
    template: "%s | Musa Allama",
  },
  description:
    "The official headquarters of Musa Allama: strategic advisory, agro-industrial intelligence, multilingual trade, digital systems, and practical education.",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Musa Allama | Official Digital Headquarters",
    description:
      "Strategic advisory, agro-industrial intelligence, multilingual trade, digital systems, and practical education.",
    url: "/",
    siteName: "MusaAllama.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/institutional-hero.png",
        width: 1600,
        height: 1000,
        alt: "MusaAllama.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa Allama | Official Digital Headquarters",
    description:
      "Strategic advisory, trade intelligence, digital systems, and practical education.",
    images: ["/images/institutional-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${amiri.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-vellum text-charcoal">
        <a className="sa-skip-link" href="#main-content">
          Skip to content
        </a>
        <ConversionTracker />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
