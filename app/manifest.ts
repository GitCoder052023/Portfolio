import { MetadataRoute } from 'next'
import { SITE_CONFIG } from './config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name + ' - Full-Stack Developer',
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: '/',

    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['technology', 'productivity'],
  }
}
