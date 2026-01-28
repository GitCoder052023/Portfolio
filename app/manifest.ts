import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hamdan Khubaib - Full-Stack Developer',
    short_name: 'Hamdan Khubaib',
    description:
      'Backend-first full-stack developer focused on building scalable, reliable, and maintainable software solutions. Experienced in designing systems that solve real-world problems and scale with growth.',
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
