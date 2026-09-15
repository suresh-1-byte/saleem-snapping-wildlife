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
        black: "#000000",
        charcoal: {
          DEFAULT: "#2B2B2B",
          light: "#4A4A4A",
        },
        white: "#FFFFFF",
        "earthy-green": {
          DEFAULT: "hsl(115, 20%, 50%)",
          light: "hsl(115, 20%, 60%)",
          dark: "hsl(115, 20%, 40%)",
        },
        "muted-olive": "#858b68",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        playfair: ["var(--font-playfair)", "serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
