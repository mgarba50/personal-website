import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Inter } from "next/font/google";
import { ConversionTracker } from "@/components/commerce/conversion-tracker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://musaallama.com"),
  title: {
    default: "Musa Allama | Institutional Digital Headquarters",
    template: "%s | Musa Allama",
  },
  description:
    "Books, courses, strategic advisory, agro-industrial intelligence, and multilingual scholarship from Musa Allama.",
  openGraph: {
    title: "Musa Allama | Institutional Digital Headquarters",
    description:
      "A private institution of knowledge, strategy, publishing, agriculture, and practical transformation.",
    url: "https://musaallama.com",
    siteName: "MusaAllama.com",
    images: [
      {
        url: "/images/institutional-hero.png",
        width: 1600,
        height: 1000,
        alt: "Institutional study visual for MusaAllama.com",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musa Allama",
    description:
      "Books, courses, advisory, agro-industrial intelligence, and multilingual scholarship.",
    images: ["/images/institutional-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${amiri.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-vellum text-charcoal">
        <ConversionTracker />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
