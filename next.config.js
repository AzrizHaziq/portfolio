// https://github.com/Automattic/node-canvas/issues/1779#issuecomment-895885846
// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(`${process.env.PWD}/node_modules/canvas/build/Release:`)
) {
  process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${
    process.env.LD_LIBRARY_PATH || ''
  }`
}

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
