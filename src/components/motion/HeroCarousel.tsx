'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'

type Props = {
  photos: Photo[]
  /** Tempo de cada foto, em ms */
  interval?: number
}

/**
 * Fundo do hero em carrossel: troca de foto com fade suave a cada `interval`.
 * Os indicadores ficam na base; o ativo "enche" durante o tempo da foto.
 */
export function HeroCarousel({ photos, interval = 6000 }: Props) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % photos.length), interval)
    return () => window.clearInterval(id)
  }, [active, interval, photos.length])

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            quality={90}
            priority={i === 0}
            sizes="100vw"
            className={cn(
              'object-cover transition-opacity duration-[1400ms] ease-in-out',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2.5"
        role="group"
        aria-label="Fotos do banner"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Mostrar foto ${i + 1}: ${photo.caption}`}
            aria-pressed={i === active}
            className="group relative h-2.5 w-12 overflow-hidden rounded-full bg-white/35 transition hover:bg-white/55"
          >
            {i === active && (
              <span
                key={active}
                className="absolute inset-0 origin-left rounded-full bg-white"
                style={{ animation: `carousel-fill ${interval}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  )
}
