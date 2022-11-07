/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  fontFamily: {
    sans: ["Roboto"],
    serif: ["Georgia"],
  },
  theme: {
    extend: {
      colors: {
        darkBlue: "#131532",
        mainBlue: "#6671fa",
        middleBlue: "#ebeffe",
        lightBlue: "#f0f3fc",
        bgBlue: "#f6fafd",
        mainRed: "#e7533d",
        mainYello: "#f9b84b",
        mainGreen: "#20998d",
        lightGray: "#f7f7f7",
        darkGray: "#404149",
        kakaoYello: "#FEE500",
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
