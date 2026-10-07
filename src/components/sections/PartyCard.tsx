import type { Party } from '@/content/parties'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Sticker } from '@/components/ui/Sticker'
import { cn } from '@/lib/cn'
import { TiltCard } from '@/components/motion/Effects'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  party: Party
  headingLevel?: 'h2' | 'h3'
  detailed?: boolean
  /** Home: só foto, resumo, duração e botão (lista completa fica em /festas) */
  compact?: boolean
}

/** Card em formato de convite: foto, selo, o que inclui e CTA direto para orçamento. */
export function PartyCard({ party, headingLevel: H = 'h3', detailed, compact, delay = 0 }: Props & { delay?: number }) {
  const pink = party.tone === 'pink'
  const Sub = H === 'h2' ? 'h3' : 'h4'
  return (
    <Reveal delay={delay} y={60} className="h-full">
      <TiltCard max={4} className="h-full rounded-[2.25rem]">
        <article
          id={party.slug}
          className="group ring-ink-950/8 relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_80px_-40px_rgb(5_3_45/0.45)] ring-1"
        >
          <ParallaxImage
            src={party.photo.src}
            alt={party.photo.alt}
            sizes="(min-width: 1024px) 1200px, 100vw"
            strength={5}
            className="aspect-[3/2]"
            imgClassName="transition-transform duration-700 group-hover:scale-105"
          >
            <div
              aria-hidden="true"
              className="from-ink-950/70 via-ink-950/10 absolute inset-0 bg-gradient-to-t to-transparent"
            />
            <Sticker tone={pink ? 'primary' : 'accent'} tilt={pink ? -4 : 4} className="absolute top-5 left-5">
              {party.badge}
            </Sticker>
            <H className="absolute right-6 bottom-5 left-6 text-4xl font-semibold text-white md:text-5xl">
              {party.name}
            </H>
          </ParallaxImage>

          {/* serrilhado de convite */}
          <div aria-hidden="true" className={cn('h-3 w-full', pink ? 'bg-metal-primary' : 'bg-metal-accent')} />

          <div className="flex flex-1 flex-col p-7 md:p-9">
            <p className="text-ink-950/75 text-lg leading-relaxed">{detailed ? party.description : party.summary}</p>

            <p
              className={cn(
                'mt-6 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-bold',
                pink ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700',
              )}
            >
              <Icon name="clock" size={16} /> {party.duration}
            </p>

            {!compact && (
              <>
                <Sub className="text-ink-950/60 mt-7 font-sans text-xs font-extrabold tracking-[0.16em] uppercase">
                  A {party.name} inclui
                </Sub>
                <ul className="mt-4 grid gap-3">
                  {party.includes.map((item) => (
                    <li key={item} className="flex gap-3 leading-snug">
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                          pink ? 'bg-primary-300' : 'bg-accent-400',
                        )}
                      >
                        <Icon name="check" size={13} strokeWidth={3} className="text-ink-950" />
                      </span>
                      {item}
                    </li>
                  ))}
                  {party.optional?.map((item) => (
                    <li key={item} className="text-ink-950/60 flex gap-3 leading-snug">
                      <span className="border-ink-950/25 mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-dashed">
                        <Icon name="plus" size={12} strokeWidth={3} />
                      </span>
                      {item} <em className="text-xs font-bold tracking-wide uppercase not-italic">(opcional)</em>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className={cn('mt-auto', compact ? 'pt-7' : 'pt-9')}>
              <ButtonLink
                href={compact ? `/festas#${party.slug}` : `/contato?festa=${party.slug}`}
                variant={pink ? 'primary' : 'accent'}
                icon="arrowRight"
                className="w-full sm:w-auto"
              >
                {compact ? `Ver a ${party.name}` : `Quero orçamento da ${party.name}`}
              </ButtonLink>
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}
