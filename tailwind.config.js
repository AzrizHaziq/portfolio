module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'zen': ['zen-tokyo']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
