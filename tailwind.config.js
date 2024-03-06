/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        evento: {
          100: "#6e8df5",
          200: "#250c41",
          300: "#9cbe60",
          400: "#cada97",
          500: "#8ddd99",
          600: "#95a1ed",
          700: "#4e4fb0",
          800: "#546cb4",
          900: "#188697",
        },
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
