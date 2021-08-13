const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withPWA, { pwa: { dest: 'public', dynamicStartUrl: false, disable: process.env.NODE_ENV === 'development' } }],
  ],
  {
    experimental: { esmExternals: true },
    pageExtensions: ['ts', 'tsx'],
    reactStrictMode: true,
    images: {
      domains: ['github.com', 'opengraph.githubassets.com', 'vercel.app', 'github.io'],
    },
  },
)
