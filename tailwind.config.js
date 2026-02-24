// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./node_modules/@heroui/theme/dist/components/(form|input|modal|navbar|header).js"
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Recommended if using a 'src' directory
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};