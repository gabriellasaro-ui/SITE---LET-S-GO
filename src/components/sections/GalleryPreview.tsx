import Link from 'next/link'
import { photos } from '@/content/photos'
import { ButtonLink } from '@/components/ui/Button'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'

const preview = [photos.balancoFloral, photos.superHerois, photos.internet]

export function GalleryPreview() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Galeria"
          title="Imagine a festa do seu filho acontecendo aqui."
          description="Temas, cenários e cores que mudam a cada festa. Inspire-se em algumas comemorações que já aconteceram na Let’s Go."
          action={
            <ButtonLink href="/galeria" variant="dark" icon="arrowRight">
              Ver galeria completa
            </ButtonLink>
          }
        />
        <Stagger as="ul" className="grid gap-5 sm:grid-cols-3" stagger={0.1}>
          {preview.map((photo) => (
            <StaggerItem as="li" key={photo.src}>
              <Link
                href="/galeria"
                aria-label={`${photo.category} ${photo.caption}: ver galeria`}
                className="block rounded-[1.75rem]"
              >
                <PhotoTile photo={photo} />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
