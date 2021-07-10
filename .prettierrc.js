module.exports = {
  arrowParens: 'avoid',
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 120,
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "html",
      },
    },
  ],
}
