/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cute-dark': '#1a1b1e',
        'cute-pink': '#ff79c6',
        'cute-purple': '#bd93f9',
        'cute-cyan': '#8be9fd',
      },
      borderRadius: {
        'cute': '2rem',
      },
    },
  },
  plugins: [],
}
