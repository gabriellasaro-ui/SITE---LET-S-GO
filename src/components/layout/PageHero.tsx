import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Photo } from '@/content/photos'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { HighlightsMarquee } from '@/components/ui/HighlightsMarquee'
import { JsonLd } from '@/components/seo/JsonLd'
import { HeroCarousel } from '@/components/motion/HeroCarousel'
import { Rise, SplitWords } from '@/components/motion/SplitWords'
import { breadcrumbSchema } from '@/lib/schema'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow: string
  /** Texto simples ganha animação palavra por palavra */
  title: string
  /** Palavras do título com efeito adesivo colorido, ex.: { festa: 'text-sticker-primary' } */
  highlight?: Record<string, string>
  description: ReactNode
  /** Caminho atual + rótulo, usado no breadcrumb visível e no BreadcrumbList */
  crumb: { label: string; href: string }
  /** Cor do bloco: rosa forte ou turquesa (alterne entre páginas) */
  tone?: 'primary' | 'accent'
  /** Foto de fundo (banner). Com foto, os textos ficam brancos sobre uma camada escura. */
  image?: Photo
  /** Várias fotos: o banner vira carrossel (troca a cada 6s) */
  images?: Photo[]
  children?: ReactNode
}

/** Topo das páginas internas: bloco de cor (ou banner com foto), H1 animado e faixa de diferenciais logo abaixo. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  tone = 'accent',
  image,
  images,
  highlight,
  children,
}: Props) {
  const media = Boolean(image || images?.length)
  return (
    <>
      <section
        data-hero
        className={cn(
          'relative isolate overflow-hidden pt-[84px]',
          // com foto: tela cheia e conteúdo centralizado (igual ao hero da home)
          media
            ? 'flex h-svh min-h-[560px] flex-col'
            : cn('pb-24 md:pb-32', tone === 'primary' ? 'bg-primary-500' : 'bg-accent-400'),
        )}
      >
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: crumb.label, path: crumb.href },
          ])}
        />

        {images?.length ? (
          <>
            <HeroCarousel photos={images} />
            {/* camada escura para leitura (mesma da home) */}
            <div
              aria-hidden="true"
              className="bg-ink-950/25 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(5_3_45/0.6)_0%,rgb(5_3_45/0.45)_55%,rgb(5_3_45/0.3)_100%)]"
            />
          </>
        ) : null}

        {image && !images?.length && (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="-z-20 object-cover object-[center_45%]"
            />
            {/* camada escura para leitura (mesma da home) */}
            <div
              aria-hidden="true"
              className="bg-ink-950/25 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(5_3_45/0.6)_0%,rgb(5_3_45/0.45)_55%,rgb(5_3_45/0.3)_100%)]"
            />
          </>
        )}

        <div
          className={cn(
            'container-site relative w-full',
            media ? 'flex flex-1 flex-col items-center justify-center pb-[84px] text-center' : 'pt-14 md:pt-20',
          )}
        >
          {/* breadcrumb e badge só na versão sem foto (o BreadcrumbList segue no JSON-LD) */}
          {!media && (
            <Rise>
              <nav aria-label="Você está em" className="mb-6 text-sm font-bold">
                <ol className={cn('flex items-center gap-2', image ? 'text-white/85' : 'text-ink-950')}>
                  <li>
                    <Link
                      href="/"
                      className={cn(
                        'underline-offset-4 transition hover:underline',
                        image ? 'hover:text-white' : 'hover:text-ink-950',
                      )}
                    >
                      Início
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className={image ? 'text-white' : 'text-ink-950'}>
                    {crumb.label}
                  </li>
                </ol>
              </nav>
              <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
            </Rise>
          )}
          <h1
            className={cn(
              'text-poster max-w-4xl',
              media
                ? 'mx-auto text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.03]'
                : 'text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.04]',
            )}
          >
            <SplitWords text={title} delay={0.1} highlight={highlight} />
          </h1>
          <Rise delay={0.45} visible>
            <p
              className={cn(
                'mt-6 max-w-2xl text-lg leading-relaxed font-semibold md:text-xl',
                media ? 'mx-auto font-bold text-white [text-shadow:0_2px_12px_rgb(5_3_45/0.7)]' : 'text-ink-950/90',
              )}
            >
              {description}
            </p>
          </Rise>
          {children && (
            <Rise delay={0.6} className={cn('mt-9 flex flex-wrap gap-4', media && 'justify-center')}>
              {children}
            </Rise>
          )}
        </div>
      </section>
      {/* faixa contrasta com o topo: rosa sob foto ou topo turquesa; turquesa sob topo rosa */}
      <HighlightsMarquee tone={!media && tone === 'primary' ? 'accent' : 'primary'} />
    </>
  )
}
