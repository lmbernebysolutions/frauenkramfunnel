import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coverCanvas: "#fdfbf7",
        coverSalbei: "#a7bc93",
        coverSalbeiSoft: "#eef3e8",
        coverRosa: "#d8a5a4",
        coverSand: "#e5d5bb",
        coverKhaki: "#beab80",
        erdton900: "#2b1307",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
