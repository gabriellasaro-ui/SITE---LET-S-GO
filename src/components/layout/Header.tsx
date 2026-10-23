'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'

const SCROLL_THRESHOLD = 40

/** Transparente só com a página no topo, sobre um hero; ao começar a rolar vira branco (não fica sobre o título). */
function isOverHero(y: number) {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  return Boolean(hero) && y < SCROLL_THRESHOLD
}

/**
 * Fixo no topo. No topo da página, sobre o hero (`data-hero`), fica transparente com textos brancos;
 * ao começar a rolar vira branco, mais compacto e com sombra.
 */
export function Header() {
  const { scrollY } = useScroll()
  const [overHero, setOverHero] = useState(true)

  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (y) => setOverHero(isOverHero(y)))

  // Recalcula ao carregar/trocar de página (ex.: refresh já no meio da página)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOverHero(isOverHero(window.scrollY)))
    return () => cancelAnimationFrame(id)
  }, [pathname])

  const scrolled = !overHero
  const brandMark = site.seal ?? site.logo

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b-4 transition-[background-color,box-shadow,border-color] duration-500',
        scrolled
          ? 'border-accent-400 bg-white shadow-[0_14px_40px_-12px_rgb(5_3_45/0.45)]'
          : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="focus:text-ink-950 sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <div
        className={cn(
          'container-site flex items-center justify-between gap-6 transition-[height] duration-500',
          scrolled ? 'h-[68px]' : 'h-[84px]',
        )}
      >
        <Link
          href="/"
          aria-label={`${site.name}: página inicial`}
          className="shrink-0 transition-transform duration-300 hover:scale-105 hover:-rotate-3"
        >
          <Image
            src={brandMark.src}
            alt={brandMark.alt}
            width={brandMark.width}
            height={brandMark.height}
            priority
            className={cn('w-auto transition-[height] duration-500', scrolled ? 'h-14' : 'h-[72px]')}
          />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <NavLinks onDark={overHero} />
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={site.cta.href} variant="primary" icon="arrowRight" className="h-11 px-5 max-[380px]:hidden">
            {site.cta.label}
          </ButtonLink>
          <MobileMenu onDark={overHero} />
        </div>
      </div>
    </header>
  )
}
