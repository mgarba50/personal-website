import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MusaAllama.com",
    short_name: "Musa Allama",
    description:
      "Official digital headquarters for strategic advisory, trade intelligence, and practical education.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1118",
    theme_color: "#0b1118",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
