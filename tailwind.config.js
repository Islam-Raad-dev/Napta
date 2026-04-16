/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A3021', // Royal Dark Green
          light: '#F9F9F9', // Ivory White
        },
        accent: {
          mustard: '#E1AD01', // Calming Mustard Yellow
          charcoal: '#2D2D2D', // Smoky Grey for text
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(26, 48, 33, 0.1), 0 0 20px -5px rgba(26, 48, 33, 0.05)',
        '3d-btn': '0 4px 0 0 #0D1911, 0 8px 15px rgba(0, 0, 0, 0.2)',
        '3d-btn-pressed': '0 2px 0 0 #0D1911, 0 4px 8px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
