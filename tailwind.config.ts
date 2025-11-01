import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C62828",
          50: "#FCE8E6",
          100: "#F9D0CD",
          200: "#F3A19A",
          300: "#ED7267",
          400: "#E74334",
          500: "#C62828",
          600: "#A01F20",
          700: "#7A1718",
          800: "#530F10",
          900: "#2C0708",
        },
        accent: {
          DEFAULT: "#E0A800",
          50: "#FCF8E3",
          100: "#FAF1C6",
          200: "#F7E49D",
          300: "#F4D774",
          400: "#F1CA4B",
          500: "#E0A800",
          600: "#B8860B",
          700: "#8A6409",
          800: "#5C4206",
          900: "#2E2103",
        },
        dark: {
          DEFAULT: "#111827",
          50: "#F3F4F6",
          100: "#E5E7EB",
          200: "#D1D5DB",
          300: "#9CA3AF",
          400: "#6B7280",
          500: "#4B5563",
          600: "#374151",
          700: "#1F2937",
          800: "#111827",
          900: "#030712",
        },
        light: {
          DEFAULT: "#F7F5F0",
          50: "#FFFFFF",
          100: "#FCFCFA",
          200: "#F9F7F3",
          300: "#F5F2EC",
          400: "#F2EDE5",
          500: "#F7F5F0",
          600: "#C4C2B5",
          700: "#918F7B",
          800: "#5E5C52",
          900: "#2B2929",
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
