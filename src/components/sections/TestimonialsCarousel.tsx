'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Testimonial } from '@/content/testimonials'
import { GoogleG, Stars } from '@/components/ui/GoogleRating'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const AUTOPLAY_MS = 6000
/** Acima disso o card mostra só o começo e oferece "Ler avaliação completa" */
const LONG_QUOTE = { compact: 200, full: 360 }

/**
 * Carrossel de depoimentos: arrasta no celular (scroll-snap nativo), setas e bolinhas,
 * passa sozinho a cada 6s e pausa quando a pessoa interage (ou prefere menos movimento).
 */
export function TestimonialsCarousel({ items, full = false }: { items: Testimonial[]; full?: boolean }) {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [pages, setPages] = useState(items.length)
  const [paused, setPaused] = useState(false)
  const [reading, setReading] = useState<Testimonial | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  // quantos "passos" existem = cards - cards visíveis + 1
  const measure = useCallback(() => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')
    const perView = Math.max(1, Math.round(el.clientWidth / step))
    setPages(Math.max(1, items.length - perView + 1))
    setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / step)))
  }, [items.length])

  const goTo = useCallback((i: number) => {
    const el = track.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const frame = requestAnimationFrame(measure)
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  useEffect(() => {
    if (paused || pages <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') goTo(active + 1 >= pages ? 0 : active + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [active, pages, paused, goTo])

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {items.map((t, i) => {
          const pink = i % 2 === 0
          const google = t.source === 'google'
          return (
            <li
              key={`${t.author ?? ''}-${t.party}-${i}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}`}
              className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
            >
              <figure
                className={cn(
                  'flex h-full flex-col rounded-[2rem] border-2 bg-white p-7 transition duration-300 hover:-translate-y-1.5 md:p-8',
                  pink ? 'border-primary-100 shadow-[0_8px_0_#f6c3dc]' : 'border-accent-100 shadow-[0_8px_0_#a9e3e9]',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  {t.rating ? (
                    <span className="flex items-center gap-2">
                      <Stars value={t.rating} size={18} />
                      <span className="sr-only">Nota {t.rating} de 5</span>
                    </span>
                  ) : (
                    <Icon name="quote" size={28} className={pink ? 'text-primary-300' : 'text-accent-300'} />
                  )}
                  {google && <GoogleG size={22} />}
                </div>
                <p className="font-display mt-4 text-[1.45rem] leading-snug">“{t.highlight}”</p>
                <blockquote
                  className={cn('text-ink-950/75 mt-3 leading-relaxed', full ? 'line-clamp-7' : 'line-clamp-4')}
                >
                  <p>{t.quote}</p>
                </blockquote>
                {t.quote.length > (full ? LONG_QUOTE.full : LONG_QUOTE.compact) && (
                  <button
                    type="button"
                    onClick={() => {
                      setReading(t)
                      dialog.current?.showModal()
                    }}
                    className="text-ink-950 mt-3 self-start font-bold underline decoration-2 underline-offset-4 hover:no-underline"
                  >
                    Ler avaliação completa<span className="sr-only"> de {t.author ?? 'cliente'}</span>
                  </button>
                )}
                <div className="mb-7" />
                <figcaption className="border-ink-950/8 mt-auto flex items-center gap-3 border-t pt-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid h-11 w-11 shrink-0 place-items-center rounded-full text-white',
                      pink ? 'bg-primary-700' : 'bg-accent-700',
                    )}
                  >
                    <Icon name="user" size={22} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{t.author ?? 'Família da aniversariante'}</span>
                    <span className="text-ink-950/70 text-sm">{t.party}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Depoimento anterior"
            className="btn-toy text-ink-950 bg-accent-400 grid h-12 w-12 place-items-center rounded-full [--btn-depth:#0f7476] disabled:opacity-40"
          >
            <Icon name="arrowRight" size={20} strokeWidth={2.6} className="rotate-180" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
                aria-current={active === i}
                className="grid h-6 w-6 place-items-center"
              >
                <span
                  className={cn(
                    'block h-2.5 rounded-full transition-all duration-300',
                    active === i ? 'bg-primary-500 w-7' : 'bg-ink-950/20 w-2.5',
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(Math.min(pages - 1, active + 1))}
            disabled={active >= pages - 1}
            aria-label="Próximo depoimento"
            className="btn-toy text-ink-950 bg-primary-300 grid h-12 w-12 place-items-center rounded-full [--btn-depth:#a83d64] disabled:opacity-40"
          >
            <Icon name="arrowRight" size={20} strokeWidth={2.6} />
          </button>
        </div>
      )}

      {/* Avaliação completa */}
      <dialog
        ref={dialog}
        aria-labelledby="avaliacao-titulo"
        onClose={() => setReading(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="backdrop:bg-ink-950/70 m-auto w-[min(640px,92vw)] max-w-none rounded-[2rem] border-4 border-white bg-white p-0 shadow-[0_10px_0_#a9e3e9] backdrop:backdrop-blur-sm"
      >
        {reading && (
          <figure className="max-h-[85vh] overflow-y-auto p-7 md:p-10">
            <div className="flex items-center justify-between gap-3">
              {reading.rating ? <Stars value={reading.rating} size={20} /> : <span />}
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Fechar"
                className="bg-mist hover:bg-accent-100 grid h-11 w-11 place-items-center rounded-full transition"
              >
                <Icon name="x" size={20} strokeWidth={2.4} />
              </button>
            </div>
            <p id="avaliacao-titulo" className="font-display mt-4 text-2xl leading-snug md:text-3xl">
              “{reading.highlight}”
            </p>
            <blockquote className="text-ink-950/80 mt-4 text-lg leading-relaxed">
              <p>{reading.quote}</p>
            </blockquote>
            <figcaption className="border-ink-950/8 mt-6 flex items-center gap-3 border-t pt-5">
              {reading.source === 'google' && <GoogleG size={24} />}
              <span>
                <span className="block font-bold">{reading.author ?? 'Família da aniversariante'}</span>
                <span className="text-ink-950/70 text-sm">{reading.party}</span>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </div>
  )
}
