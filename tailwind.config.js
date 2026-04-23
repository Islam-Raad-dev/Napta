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
          dark: 'oklch(28% 0.04 150)', // Royal Dark Green
          light: 'oklch(98% 0.005 150)', // Ivory White (tinted toward brand hue)
        },
        accent: {
          mustard: 'oklch(76% 0.17 85)', // Calming Mustard Yellow
          charcoal: 'oklch(30% 0.01 150)', // Smoky Grey for text (tinted)
        },
        dark: {
          base: 'oklch(22% 0.03 150)',     // Primary dark-mode background
          deep: 'oklch(18% 0.02 150)',     // Deepest surfaces (footer, inputs)
          surface: 'oklch(26% 0.03 150)',  // Card/elevated surfaces in dark
          elevated: 'oklch(28% 0.04 150)', // Most prominent dark surface
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'fluid-h1': 'clamp(3.5rem, 8vw, 9.5rem)',
        'fluid-h2': 'clamp(2.5rem, 6vw, 6.5rem)',
        'fluid-h3': 'clamp(2rem, 4vw, 4rem)',
        'fluid-h4': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      boxShadow: {
        'luxury': '0 4px 12px rgba(26, 48, 33, 0.05), 0 1px 3px rgba(26, 48, 33, 0.02)',
        'precise-luxury': '0 2px 8px rgba(26, 48, 33, 0.04), 0 0 0 1px rgba(26, 48, 33, 0.03)',
      }
    },
  },
  plugins: [],
}
