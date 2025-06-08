/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary-color) / <alpha-value>)",
        primaryLight: "hsl(var(--primary-color-lighter) / <alpha-value>)",
        secondary: "hsl(var(--secondary-color) / <alpha-value>)",
        text: "hsl(var(--text-color) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
