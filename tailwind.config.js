/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d1411e",
        "hover-primary": "#DA4A27",
        "text-gray":"#4D4D4D",
        "text-gray-1":"#E2E2E2"
      },
    },
  },
  plugins: [],
};
