const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './helpers/**/*.{ts,tsx}', './contents/**/*.mdx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        cyan: colors.cyan,
        lime: colors.lime,
      },
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
