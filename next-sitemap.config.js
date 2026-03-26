/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://domainkamu.com",
  generateRobotsTxt: true,

  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/dashboard"],
      },
    ],
  },

  exclude: ["/admin/*", "/dashboard/*"],
};
