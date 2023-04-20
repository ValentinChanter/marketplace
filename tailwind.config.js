/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mkDarkBlue: '#535e79',
        mkDarkGreen: '#78b1aa',
        mkGreen: '#a8dbcc',
        mkWhite: '#f5f5f5',
        mkOrange: '#efb99c',
      }
    },
  },
  plugins: [],
}