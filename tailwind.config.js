/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  fontFamily: {
    sans: ["Roboto"],
    serif: ["Georgia"],
  },
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        "dark-blue": "#131532",
        "main-blue	": "#6671fa",
        "middle-blue": "#ebeffe",
        "light-blue	": "#f0f3fc",
        "bg-blue": "#f6fafd",
        "main-red": "#e7533d",
        "main-yello": "#f9b84b",
        "main-green": "#20998d",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      border: {},
    },
  },
  variants: {
    extends: {},
  },
  plugins: [],
};
