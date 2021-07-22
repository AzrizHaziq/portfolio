module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      nightwind: {
        typography: true,
        transitionDuration: false,
        colorClasses: [
          // "gradient",
          // "ring",
          // "ring-offset",
          'divide',
          // "placeholder",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('nightwind'), require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
}
