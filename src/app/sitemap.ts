import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'
import { routes } from '@/config/routes'
import { festasCarousel, galleryPhotos, photos, type Photo } from '@/content/photos'

/** Foto principal (topo) de cada página, para o sitemap de imagens. */
const heroImages: Record<string, Photo[]> = {
  '/': [photos.banner],
  '/festas': festasCarousel,
  '/estrutura': [photos.bannerEstrutura],
  '/galeria': [photos.bannerGaleria, ...galleryPhotos],
  '/clientes': [photos.bannerDepoimentos],
  '/sobre': [photos.bannerSobre],
  '/perguntas-frequentes': [photos.bannerDuvidas],
  '/trabalhe-conosco': [photos.bannerTrabalhe],
  '/contato': [photos.bannerContato],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => {
    // Sitemap de imagens ajuda a indexação no Google Imagens
    const images = [...new Set((heroImages[r.path] ?? []).map((p) => absoluteUrl(p.src)))]
    return {
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(images.length ? { images } : {}),
    }
  })
}
