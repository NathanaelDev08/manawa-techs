/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C1A',
          50: '#FFF3E6',
          100: '#FFE0BF',
          200: '#FFCD99',
          300: '#FFBA73',
          400: '#FFA74D',
          500: '#FF8C1A',
          600: '#E67300',
          700: '#B35900',
          800: '#804000',
          900: '#4D2600',
        },
        secondary: {
          DEFAULT: '#0066CC',
          50: '#E6F0FF',
          100: '#BFD9FF',
          200: '#99C2FF',
          300: '#73ABFF',
          400: '#4D94FF',
          500: '#0066CC',
          600: '#004D99',
          700: '#003366',
          800: '#001A33',
          900: '#000D1A',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
