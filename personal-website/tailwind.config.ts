import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-strong": "var(--color-surface-strong)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        danger: "var(--color-danger)",
        success: "var(--color-success)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        arabic: ["var(--font-arabic)"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(26, 36, 51, 0.12)",
        card: "0 18px 44px rgba(26, 36, 51, 0.08)"
      },
      borderRadius: {
        shell: "32px"
      },
      maxWidth: {
        shell: "84rem"
      },
      transitionTimingFunction: {
        dignified: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: [typography]
};

export default config;
