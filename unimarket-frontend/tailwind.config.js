/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan all your src folder including nested folders
    "./public/index.html"
  ],
  darkMode: 'class', // Enable dark mode via adding 'dark' class to html/body
  theme: {
    extend: {
      colors: {
        primary: '#005EB8',     // your blue
        secondary: '#FFB6C1',   // your pink
        dark: '#003366',        // dark navy
      },
    },
  },
  plugins: [],
}
