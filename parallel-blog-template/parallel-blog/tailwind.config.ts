import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "ui-monospace",
          "monospace",
        ],
      },
      colors: {
        navy: {
          DEFAULT: "#1e3a5f",
          light: "#2d5285",
          50: "#eff4fb",
          100: "#d6e4f0",
        },
        accent: {
          DEFAULT: "#e85d26",
          light: "#f4835a",
        },
        oxford: {
          DEFAULT: "#002147",
        },
      },
      maxWidth: {
        prose: "72ch",
        article: "80ch",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
          },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover":
          "0 4px 16px -2px rgb(30 58 95 / 0.12), 0 2px 6px -2px rgb(30 58 95 / 0.08)",
      },
      borderRadius: {
        sm: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
