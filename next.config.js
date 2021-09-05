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
      domains: ['github.com', 'opengraph.githubassets.com', 'vercel.app', 'github.io', 'source.unsplash.com'],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
  },
)

// https://github.com/leerob/leerob.io/blob/main/next.config.js
const securityHeaders = [
  // https://securityheaders.com
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com *.google-analytics.com`,
      `child-src *.youtube.com *.google.com *.twitter.com`,
      `style-src 'self' 'unsafe-inline' *.googleapis.com`,
      `img-src * blob: data:`,
      `worker-src *.azrizhaziq.com`,
      `media-src 'none'`,
      `connect-src *`,
      `font-src 'self'`,
    ].join('; '),
  },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  { key: 'X-Frame-Options', value: 'DENY' },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  { key: 'X-DNS-Prefetch-Control', value: 'on' },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]
