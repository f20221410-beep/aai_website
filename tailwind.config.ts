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
        background: "#090C10",   // near-black primary bg
        surface: "#0D1B2A",      // deep blue-black card bg
        surfaceAlt: "#111827",   // dark gray-blue alt sections
        electricBlue: "#3B82F6", // accent highlights & CTAs
        rustBrown: "#A0522D",    // warm accent buttons
        cream: "#E8DDD0",        // premium body text
        dimmed: "#6B7280",       // secondary muted text
        white: "#F9FAFB",        // bold headings
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        dmSerif: ["var(--font-dm-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
