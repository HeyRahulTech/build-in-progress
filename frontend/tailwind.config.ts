import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#F97316", // Industrial Orange
          600: "#EA580C",
        },
        navy: {
          800: "#1E3A8A", // Navy Blue
          900: "#172554",
        },
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          500: "#64748B", // Slate Gray
          900: "#0F172A",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
