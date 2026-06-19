import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        card: "#111827",
        primary: { DEFAULT: "#8B5CF6", foreground: "#ffffff" },
        secondary: { DEFAULT: "#06B6D4", foreground: "#ffffff" },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: { DEFAULT: "#1F2937", foreground: "#9CA3AF" },
        border: "#1F2937",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.25)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.25)",
      },
      keyframes: {
        "pulse-emergency": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "pulse-emergency": "pulse-emergency 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
