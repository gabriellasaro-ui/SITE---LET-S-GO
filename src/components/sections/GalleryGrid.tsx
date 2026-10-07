'use client'

import { AnimatePresence, LayoutGroup, LazyMotion, m } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Photo, PhotoCategory } from '@/content/photos'
import { Icon } from '@/components/ui/Icon'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { cn } from '@/lib/cn'

// Animação de layout (filtro) só aqui: o resto do site usa o pacote leve do Motion
const loadLayoutFeatures = () => import('@/components/motion/features-layout').then((mod) => mod.default)

type Filter = 'Todas' | PhotoCategory

export function GalleryGrid({ items }: { items: Photo[] }) {
  const [filter, setFilter] = useState<Filter>('Todas')
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const categories: Filter[] = ['Todas', ...Array.from(new Set(items.map((p) => p.category)))]
  const visible = filter === 'Todas' ? items : items.filter((p) => p.category === filter)
  const current = visible[index]

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => (i + dir + visible.length) % visible.length)
  }

  const content = (
    <>
      <LayoutGroup>
        <div role="group" aria-label="Filtrar fotos" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c)
                setIndex(0)
              }}
              className={cn(
                'font-display relative rounded-full px-5 py-2.5 text-base tracking-wide transition',
                filter === c ? 'text-ink-950' : 'text-ink-950/75 hover:text-ink-950 bg-white hover:-rotate-2',
              )}
            >
              {filter === c && (
                <m.span
                  layoutId="filtro-ativo"
                  className="bg-accent-400 absolute inset-0 rounded-full shadow-[0_4px_0_#0f7476]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <m.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((photo, i) => (
              <m.li
                data-reveal=""
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`${photo.category} ${photo.caption}: ampliar foto`}
                  className="block w-full cursor-zoom-in rounded-[1.75rem]"
                >
                  <PhotoTile photo={photo} zoomable />
                </button>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </LayoutGroup>

      <dialog
        ref={dialogRef}
        aria-label="Visualização da foto"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="backdrop:bg-ink-950/90 m-auto w-[min(1100px,94vw)] max-w-none overflow-visible bg-transparent p-0 backdrop:backdrop-blur-md"
      >
        {current && (
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <m.div
                  key={current.src}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 80, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -80, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="94vw"
                    quality={90}
                    className="object-contain"
                  />
                </m.div>
              </AnimatePresence>
            </div>
            <figcaption className="mt-4 text-center font-bold text-white">
              {current.caption}{' '}
              <span className="text-white/60">
                • {index + 1} de {visible.length}
              </span>
            </figcaption>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="text-ink-950 grid h-12 w-12 rotate-180 place-items-center rounded-full bg-white transition hover:scale-110"
              >
                <Icon name="arrowRight" />
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Fechar"
                className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <Icon name="x" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima foto"
                className="text-ink-950 grid h-12 w-12 place-items-center rounded-full bg-white transition hover:scale-110"
              >
                <Icon name="arrowRight" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  )
  return <LazyMotion features={loadLayoutFeatures}>{content}</LazyMotion>
}
