/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "769px",
      lg: "1024px",
      // xl: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        sm: "16px",
        lg: "16px",
        xl: "8rem",
      },
    },
    extend: {
      colors: {
        "main-1": "#FFD370",
        "sub-1": "#D87355",
        "black-1": " #333333",
      },
    },
  },
  plugins: [],
};
