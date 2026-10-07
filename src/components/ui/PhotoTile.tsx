import Image from 'next/image'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

type Props = {
  photo: Photo
  sizes?: string
  className?: string
  /** Mostra o ícone de ampliar no hover (galeria com lightbox) */
  zoomable?: boolean
}

/** Foto em proporção fixa 4:3 com legenda sobre gradiente. Usada na prévia e na galeria. */
export function PhotoTile({ photo, sizes = '(min-width: 1024px) 800px, 100vw', className, zoomable }: Props) {
  return (
    <div className={cn('group bg-mist relative aspect-[4/3] overflow-hidden rounded-[1.75rem]', className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="from-ink-950/80 via-ink-950/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-x-5 bottom-4 translate-y-1 text-left text-white transition-transform duration-500 group-hover:translate-y-0">
        <p>
          <span className="text-primary-200 block text-[0.7rem] font-extrabold tracking-[0.16em] uppercase">
            {photo.category}
          </span>{' '}
          <span className="font-display block text-lg leading-tight">{photo.caption}</span>
        </p>
      </div>
      {zoomable && (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 grid h-10 w-10 scale-50 place-items-center rounded-full bg-white/25 text-white opacity-0 backdrop-blur-md transition duration-500 group-hover:scale-100 group-hover:opacity-100"
        >
          <Icon name="maximize" size={17} />
        </span>
      )}
    </div>
  )
}
