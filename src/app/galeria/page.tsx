import type { Metadata } from 'next'
import { absoluteUrl, site } from '@/config/site'
import { galleryPhotos, photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Galeria de festas infantis em BH'
const description =
  'Fotos de festas infantis, decorações temáticas, Espaço Diversão e da estrutura da Let’s Go Festas, na Pampulha, em Belo Horizonte.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/galeria' })

export default function GaleriaPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: '/galeria', name: title, description, type: 'CollectionPage' }),
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `Galeria ${site.name}`,
            url: absoluteUrl('/galeria'),
            image: galleryPhotos.map((p) => ({
              '@type': 'ImageObject',
              contentUrl: absoluteUrl(p.src),
              caption: p.caption,
              description: p.alt,
              width: p.width,
              height: p.height,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Galeria"
        crumb={{ label: 'Galeria', href: '/galeria' }}
        tone="primary"
        image={photos.bannerGaleria}
        title="Uma galeria de festas para você imaginar a sua."
        highlight={{ festas: 'text-sticker-primary', imaginar: 'text-sticker-accent' }}
        description="Explore decorações temáticas, o Espaço Diversão e a estrutura da Let’s Go na Pampulha. Cada festa revela uma nova possibilidade para o seu grande dia."
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-site">
          <GalleryGrid items={galleryPhotos} />
          <p className="border-primary-200 bg-primary-50 text-ink-950/75 mt-10 rounded-[1.5rem] border p-6">
            Os cenários mudam a cada festa: decoração de balões com cenário a escolher, nos temas que o aniversariante
            mais ama. Quer ver mais? Acompanhe a {site.name} no{' '}
            <a
              href={site.social[0]?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 font-bold underline underline-offset-4"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </section>
      <SoftCurve from="paper" to="primary" />
      <FinalCta />
    </>
  )
}
