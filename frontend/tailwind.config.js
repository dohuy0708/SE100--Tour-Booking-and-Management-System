/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main: "#0B5DA7",
        secd: "#E2EAF8",
        red: "#FF0000",
      },
      spacing: {
        hbanner: "500px",
      },
    },
  },
  plugins: [],
};
