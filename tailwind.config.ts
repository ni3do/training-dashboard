import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "athletic-dark": "#0f0f0f",
        "athletic-light": "#f5f5f5",
      },
    },
  },
  plugins: [],
};

export default config;
