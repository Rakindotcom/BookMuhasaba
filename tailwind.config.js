/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kalpurush': ['Kalpurush', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}