module.exports = {
  siteUrl: process.env.VERCEL_URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${process.env.VERCEL_URL}/sitemap.xml`,
      `${process.env.VERCEL_URL}/server-sitemap.xml`,
    ],
  }
}
