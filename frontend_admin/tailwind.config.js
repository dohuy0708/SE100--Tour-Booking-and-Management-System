/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Đường dẫn tới các tệp của bạn
  ],
  theme: {
    extend: {
      colors: {
        customBG: "#F5F6FA",
      },
    },
  },
  plugins: [],
};
