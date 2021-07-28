const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    // your other plugins here
  ],
  {
    pageExtensions: ['tsx'],
    reactStrictMode: true,
    images: {
      domains: ['github.com', 'opengraph.githubassets.com', 'vercel.app', 'github.io'],
    },
  },
)
