/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0c0a0e',
          900: '#0f0d14',
          800: '#14111c',
          700: '#1a1627',
          600: '#221d35',
          500: '#2d2747',
        },
        gold: {
          300: '#f0c97a',
          400: '#e8b55a',
          500: '#d4a853',
          600: '#c09040',
          700: '#a67a30',
        },
        rose: {
          med: '#e8748a',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
