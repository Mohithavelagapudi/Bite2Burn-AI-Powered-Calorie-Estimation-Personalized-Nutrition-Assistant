/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src//*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('/src/assets/background.jpg')",
      },
    },
  },
  plugins: [],
};