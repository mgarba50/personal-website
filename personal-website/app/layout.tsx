import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buildMetadata } from "@/lib/metadata";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic"
});

export const metadata: Metadata = buildMetadata({
  title: "Musa Allama Ibn Garba | Strategic Intelligence & Policy Advisory",
  path: "/"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${arabic.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <div className="relative z-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
