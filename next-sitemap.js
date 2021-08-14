module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/server-sitemap.xml`,
    ],
  },
}
