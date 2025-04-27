/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4843D9',
          600: '#3a36b8',
        }
      }
    }
  },
  plugins: [],
}

