import type { Metadata } from "next";
import Script from "next/script";
import { Amiri, Cormorant_Garamond, Inter } from "next/font/google";
import { ConversionTracker } from "@/components/commerce/conversion-tracker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import "./architecture.css";

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
        <Script id="tawk-live-chat" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script");
              var s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/6ae0c14aef4a433475174dc9/1k5uv633d";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
