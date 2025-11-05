/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFD700',
          dark: '#333333',
        },
        gray: {
          light: '#F8F8F8',
          medium: '#E0E0E0',
          dark: '#666666',
        },
      },
    },
  },
  plugins: [],
}

