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
  const [next, setNext] = useState<number | null>(null)
  const [nextLoaded, setNextLoaded] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => {
      setNext((active + 1) % photos.length)
      setNextLoaded(false)
    }, interval)
    return () => window.clearTimeout(id)
  }, [active, interval, photos.length])

  useEffect(() => {
    if (next === null || !nextLoaded) return
    const id = window.setTimeout(() => {
      setActive(next)
      setNext(null)
      setNextLoaded(false)
    }, 900)
    return () => window.clearTimeout(id)
  }, [next, nextLoaded])

  const displayed = nextLoaded && next !== null ? next : active
  const show = (index: number) => {
    if (index === active) {
      setNext(null)
      setNextLoaded(false)
      return
    }
    setNext(index)
    setNextLoaded(false)
  }

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={photos[active].src}
          alt=""
          fill
          quality={75}
          priority={active === 0}
          sizes="100vw"
          className={cn(
            'object-cover transition-opacity duration-700 ease-in-out',
            nextLoaded ? 'opacity-0' : 'opacity-100',
          )}
        />
        {next !== null && next !== active ? (
          <Image
            key={photos[next].src}
            src={photos[next].src}
            alt=""
            fill
            quality={75}
            sizes="100vw"
            onLoad={() => setNextLoaded(true)}
            className={cn(
              'object-cover transition-opacity duration-700 ease-in-out',
              nextLoaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        ) : null}
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
            onClick={() => show(i)}
            aria-label={`Mostrar foto ${i + 1}: ${photo.caption}`}
            aria-pressed={i === displayed}
            className="group relative h-2.5 w-12 overflow-hidden rounded-full bg-white/35 transition hover:bg-white/55"
          >
            {i === displayed && (
              <span
                key={displayed}
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
