import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private'],
    },
    sitemap: [
      'https://hamdankhubaib.in/sitemap.xml',
      'https://hamdankhubaib.in/sitemap.xml',
      'https://www.hamdankhubaib.in/sitemap.xml',
    ],
  }
}

