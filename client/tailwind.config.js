/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': 'Nunito Sans, sans-serif',
      'cursive': 'Bungee, cursive, serif'
    },
    extend: {
      colors: {
        'accent': '#72FDCB',
        'accent-dark': '#6BEEBF',
        'dark': '#121212',
        'dark-gray': '#373737'
      },
    },
  },
  plugins: [],
}

