/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            primary: "#080B12",
            secondary: "#101521",
          },
          card: {
            DEFAULT: "#141B29",
            hover: "#1A2336",
          },
          text: {
            primary: "#F5F7FA",
            secondary: "#A5AFBF",
          },
          accent: {
            DEFAULT: "#7C5CFC",
            glow: "rgba(124, 92, 252, 0.25)",
            secondary: "#27D9C3",
          },
          border: {
            DEFAULT: "rgba(255, 255, 255, 0.08)",
            focus: "rgba(124, 92, 252, 0.5)",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
