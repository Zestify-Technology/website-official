/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Chrome, Safari, Edge */
          'scrollbar-width': 'none',   // Firefox
          '-ms-overflow-style': 'none', // IE 10+
          '&::-webkit-scrollbar': { display: 'none' }, // Webkit
        }
      });
    }
  ],
}