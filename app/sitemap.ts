import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hamdankhubaib.in',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://hamdankhubaib.in#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hamdankhubaib.in#projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hamdankhubaib.in#goals',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://hamdankhubaib.in#contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}

