const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './helpers/**/*.{ts,tsx}', './contents/**/*.mdx'],
  darkMode: 'class',
  theme: {
    extend: {
      nightwind: {
        typography: false,
        transitionDuration: false,
        colorClasses: [
          // "gradient",
          // "ring",
          // "ring-offset",
          'divide',
          // "placeholder",
        ],
      },
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      colors: {
        amber: colors.amber,
        cyan: colors.cyan,
        lime: colors.lime,
        /////
        primary: colors.indigo,
        gray: colors.neutral,
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('nightwind'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}

/*
typography: theme => ({
  DEFAULT: {
    css: {
      color: theme('colors.slate[900]'),
      a: {
        color: theme('colors.primary[500]'),
        '&:hover': {
          color: theme('colors.primary[600]'),
        },
        code: { color: theme('colors.primary[400]') },
      },
      h1: {
        fontWeight: '700',
        letterSpacing: theme('letterSpacing.tight'),
        color: theme('colors.slate[900]'),
      },
      h2: {
        fontWeight: '700',
        letterSpacing: theme('letterSpacing.tight'),
        color: theme('colors.slate.900'),
      },
      h3: {
        fontWeight: '600',
        color: theme('colors.slate[900]'),
      },
      'h4,h5,h6': {
        color: theme('colors.slate[900]'),
      },
      details: {
        backgroundColor: theme('colors.slate[100]'),
        paddingLeft: '4px',
        paddingRight: '4px',
        paddingTop: '2px',
        paddingBottom: '2px',
        borderRadius: '0.25rem',
      },
      hr: { borderColor: theme('colors.slate[200]') },
      'ol li:before': {
        fontWeight: '600',
        color: theme('colors.slate[500]'),
      },
      'ul li:before': {
        backgroundColor: theme('colors.slate[500]'),
      },
      strong: { color: theme('colors.slate[600]') },
      blockquote: {
        color: theme('colors.slate[900]'),
        borderLeftColor: theme('colors.slate[200]'),
      },
    },
  },
  dark: {
    css: {
      color: theme('colors.slate[100]'),
      a: {
        color: theme('colors.primary[500]'),
        '&:hover': {
          color: theme('colors.primary[400]'),
        },
        code: { color: theme('colors.primary[400]') },
      },
      h1: {
        fontWeight: '700',
        letterSpacing: theme('letterSpacing.tight'),
        color: theme('colors.slate.50'),
      },
      h2: {
        fontWeight: '700',
        letterSpacing: theme('letterSpacing.tight'),
        color: theme('colors.slate[50]'),
      },
      h3: {
        fontWeight: '600',
        color: theme('colors.slate[50]'),
      },
      'h4,h5,h6': {
        color: theme('colors.slate[50]'),
      },
      code: {
        backgroundColor: theme('colors.slate[800]'),
      },
      details: {
        backgroundColor: theme('colors.slate[800]'),
      },
      hr: { borderColor: theme('colors.slate[700]') },
      'ol li:before': {
        fontWeight: '600',
        color: theme('colors.slate[400]'),
      },
      'ul li:before': {
        backgroundColor: theme('colors.slate[400]'),
      },
      strong: { color: theme('colors.slate[100]') },
      thead: {
        color: theme('colors.slate[100]'),
      },
      tbody: {
        tr: {
          borderBottomColor: theme('colors.slate[700]'),
        },
      },
      blockquote: {
        color: theme('colors.slate[100]'),
        borderLeftColor: theme('colors.slate[700]'),
      },
    },
  },
}),*/
