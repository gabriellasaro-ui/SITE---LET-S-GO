import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Let's Go",
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#05032d',
    theme_color: '#05032d',
    lang: 'pt-BR',
    icons: [
      { src: '/images/marca/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/marca/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
