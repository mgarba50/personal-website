import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "standalone",
  async redirects() {
    return [
      { source: "/assets/books/diwan-al-zill-al-mutaman/:path*", destination: "/assets/al-maqam/diwan-al-zill-al-mutaman/:path*", permanent: true },
      { source: "/books/the-modern-farmer", destination: "/academy/agriculture-development/the-modern-farmer", permanent: true },
      { source: "/books/agrochemical-sales-field-guide", destination: "/academy/agriculture-development/agrochemical-sales-field-guide", permanent: true },
      { source: "/books/chinese-for-agrochemical-professionals", destination: "/academy/language-cross-border/chinese-for-agrochemical-professionals", permanent: true },
      { source: "/books/cheating-time", destination: "/academy/learning-knowledge-systems/cheating-time", permanent: true },
      { source: "/books/a-multilingual-mind", destination: "/academy/language-cross-border/a-multilingual-mind", permanent: true },
      { source: "/books/web-development-for-world-changers", destination: "/academy/technology-digital-systems/web-development-for-world-changers", permanent: true },
      { source: "/books/the-desert-ceo", destination: "/academy/leadership-strategy/the-desert-ceo", permanent: true },
      { source: "/books/the-allama-economy", destination: "/academy/leadership-strategy/the-allama-economy", permanent: true },
      { source: "/books/the-strategist-of-power", destination: "/academy/leadership-strategy/the-strategist-of-power", permanent: true },
      { source: "/books/the-borderless-intellectual-economy", destination: "/academy/leadership-strategy/the-borderless-intellectual-economy", permanent: true },
      { source: "/books/the-five-language-ceo", destination: "/academy/language-cross-border/the-five-language-ceo", permanent: true },
      { source: "/books/the-entrepreneurial-polyglot", destination: "/academy/language-cross-border/the-entrepreneurial-polyglot", permanent: true },
      { source: "/books/bridge-of-meaning", destination: "/academy/language-cross-border/bridge-of-meaning", permanent: true },
      { source: "/books/knowledge-is-seed", destination: "/academy/agriculture-development/knowledge-is-seed", permanent: true },
      { source: "/books/the-climate-resilient-farmer", destination: "/academy/agriculture-development/the-climate-resilient-farmer", permanent: true },
      { source: "/books/agro-logistics-across-the-great-divide", destination: "/academy/agriculture-development/agro-logistics-across-the-great-divide", permanent: true },
      { source: "/books/hydroponic-mosque", destination: "/academy/agriculture-development/hydroponic-mosque", permanent: true },
      { source: "/books/nurturing-seekers-of-truth", destination: "/academy/learning-knowledge-systems/nurturing-seekers-of-truth", permanent: true },
      { source: "/books/the-book-of-signs", destination: "/inner-circle/research/the-book-of-signs", permanent: true },
      { source: "/books/the-digital-sheikh", destination: "/inner-circle/writings/the-digital-sheikh", permanent: true },
      { source: "/books/engineering-the-journey", destination: "/inner-circle/writings/engineering-the-journey", permanent: true },
      { source: "/books/the-global-seeker", destination: "/inner-circle/writings/the-global-seeker", permanent: true },
      { source: "/books/the-soul-who-will-never-disappoint", destination: "/inner-circle/writings/the-soul-who-will-never-disappoint", permanent: true },
      { source: "/books", destination: "/academy", permanent: true },
      { source: "/courses", destination: "/academy", permanent: true },
      { source: "/library", destination: "/inner-circle", permanent: true },
      { source: "/membership", destination: "/inner-circle", permanent: true },
      { source: "/al-maqam", destination: "/inner-circle/diwan", permanent: true },
      { source: "/advisory", destination: "/corporate", permanent: true },
      { source: "/agro", destination: "/corporate", permanent: true },
      { source: "/gallifrey", destination: "/corporate", permanent: true },
    ];
  },
};

export default nextConfig;
