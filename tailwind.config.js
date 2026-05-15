/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black:'#000000', dark:'#0b0b0b', surface:'#111111',
          border:'#1a1a1a', muted:'#222222',
          red:'#dc2626', 'red-dark':'#991b1b', 'red-light':'#ef4444',
          white:'#ffffff',
        }
      },
      fontFamily: {
        display:   ['"Bebas Neue"', 'cursive'],
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        body:      ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
