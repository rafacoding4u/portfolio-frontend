import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        elegant: ["Inter Tight", "sans-serif"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2A2D34", // Color de fondo principal
        secondary: "#F8F9FA",
        darkBg: "#181A1B", // Fondo en modo oscuro
        darkCard: "#25282C", // Tarjetas en modo oscuro
        accent: "#F59E0B", // Color para destacar
      },
    },
  },
  plugins: [],
} satisfies Config;
