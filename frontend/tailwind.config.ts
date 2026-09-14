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
        blue: {
          DEFAULT: '#1b5fd4',
          light: '#4a90e2',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
