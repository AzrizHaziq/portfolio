module.exports = {
  siteUrl: process.env.URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${process.env.URL}/sitemap.xml`, `${process.env.URL}/server-sitemap.xml`],
  },
}
