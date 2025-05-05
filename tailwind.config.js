/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for next-themes
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'sans-serif'], // override default
      },
    },
  },
  plugins: [],
}
