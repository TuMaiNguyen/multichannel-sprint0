// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fbff',
          100: '#dff6ff',
          200: '#bfeaff',
          300: '#99dcff',
          400: '#6ac7fb',
          500: '#3fb0f5',
          600: '#268ed6',
          700: '#1c70ab',
          800: '#1b5a86',
          900: '#1a4a6e',
        },
        mint: {
          50: '#f3fbf7',
          100:'#e0f7ec',
          200:'#baf0d7',
          300:'#84e3bd',
          400:'#4fd29f',
          500:'#2bbb86',
          600:'#19976d',
          700:'#16775a',
          800:'#155f4b',
          900:'#124f3f',
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,.06)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
