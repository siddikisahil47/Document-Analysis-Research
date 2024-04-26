/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'secondary': '#121310',
        'primary': '#442b1a',
        'heading': '#e3dbb7',
        'text': '#b29d73',
      },
      // fontFamily: {
      //   custom: ['basement', 'sans-serif'],
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
