/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors:{
        'modal': 'rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
  darkMode: "class"
}