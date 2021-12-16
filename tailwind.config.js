const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        orange: {
          ...colors.orange,
          50: '#FFEDEB',
        },
        primary: '#FF5841',
        secondary: '#212D40',
      },
      zIndex: {
       '1000': 1000,
        'auto': 'auto',
      },
      grid: ["responsive", "hover", "focus"],
      zIndex: {
        '-5': '-5',
       }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
