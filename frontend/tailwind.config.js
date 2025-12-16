/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A7F3D0",    // Mint Green
        secondary: "#BFDBFE",  // Light Blue
        accent: "#E9D5FF",     // Lavender
        calm: "#F0FDF4",
        soft: "#FAFAFA",
      },
    },
  },
  plugins: [],
}