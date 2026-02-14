/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0c0a1f',
        'deep-indigo': '#1e1b4b',
        'electric-cyan': '#22d3ee',
        'neon-purple': '#a855f7',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
