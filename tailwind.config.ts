
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          hover: "#8a74f4",
        },
        music: {
          background: "#1A1F2C",
          card: "#252A3C",
          hover: "#2C324A",
          text: "#FFFFFF",
          textSecondary: "#9BA1B0",
          border: "#323847",
          accent: "#9b87f5",
        },
      },
      keyframes: {
        "music-bar": {
          "0%, 100%": { height: "0.75rem" },
          "50%": { height: "1.5rem" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "music-bar": "music-bar 1.2s linear infinite",
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
