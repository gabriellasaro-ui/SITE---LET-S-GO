import { photos } from '@/content/photos'
import { funZone } from '@/content/structure'
import { ButtonLink } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Sticker } from '@/components/ui/Sticker'
import { CountUp, TiltCard } from '@/components/motion/Effects'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

const highlights: {
  name: string
  icon: IconName
  value?: number
  big: string
  caption: string
  card: string
  bubble: string
}[] = [
  {
    name: 'Kid Play',
    icon: 'route',
    value: 18,
    big: 'm',
    caption: 'de percurso de aventura',
    card: 'bg-white',
    bubble: 'bg-primary-500 text-white',
  },
  {
    name: 'Escorregador',
    icon: 'rotate',
    big: '360º',
    caption: 'de giro completo',
    card: 'bg-primary-300',
    bubble: 'bg-white text-primary-700',
  },
  {
    name: 'Cinema',
    icon: 'clapperboard',
    big: '6D',
    caption: 'de pura imersão',
    card: 'bg-sun',
    bubble: 'bg-ink-950 text-white',
  },
]

type Props = {
  /** Home: só foto + algumas atrações (cards de destaque e lista completa ficam em /estrutura) */
  compact?: boolean
  showLink?: boolean
  id?: string
}

export function FunZoneSection({ compact, showLink = true, id }: Props) {
  const chips = compact ? funZone.slice(0, 6) : funZone
  return (
    <section id={id} className="bg-accent-600 relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="container-site relative">
        <SectionHeading
          tone="deep"
          eyebrow="Espaço Diversão"
          title={
            <>
              Um parque de diversões <span className="text-sticker-primary">inteirinho</span> dentro do buffet.
            </>
          }
          description="Enquanto os adultos aproveitam o salão, a criançada explora um mundo de brinquedos, games e aventuras, com estrutura pensada para a segurança dos pequenos."
          action={
            showLink ? (
              <ButtonLink href="/estrutura#espaco-diversao" variant="light" icon="arrowRight">
                Ver toda a estrutura
              </ButtonLink>
            ) : undefined
          }
        />

        <Reveal scale={0.94}>
          <ParallaxImage
            src={photos.playground.src}
            alt={photos.playground.alt}
            sizes="(min-width: 1280px) 1240px, 100vw"
            strength={6}
            className="aspect-[16/9] -rotate-1 rounded-[2rem] border-8 border-white shadow-[0_12px_0_#0f7476] md:aspect-[3/1]"
          >
            <Sticker tone="white" tilt={-4} className="absolute bottom-5 left-5 text-[0.95rem]">
              <Icon name="sparkles" size={16} className="text-primary-500" /> {funZone.length} atrações para a criançada
            </Sticker>
          </ParallaxImage>
        </Reveal>

        {!compact && (
          <Stagger className="mt-6 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {highlights.map((h) => (
              <StaggerItem key={h.name} className="h-full">
                <TiltCard
                  max={5}
                  className={cn(
                    'text-ink-950 flex h-full items-center gap-4 rounded-2xl border-[3px] border-white p-4 shadow-[0_5px_0_#0f7476]',
                    h.card,
                  )}
                >
                  <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', h.bubble)}>
                    <Icon name={h.icon} size={22} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-xl">{h.name}</span>
                      <span className="font-display text-xl opacity-70">
                        {h.value ? <CountUp to={h.value} /> : null}
                        {h.value ? ` ${h.big}` : h.big}
                      </span>
                    </span>
                    <span className="block text-sm font-bold opacity-75">{h.caption}</span>
                  </span>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {!compact && (
          <Reveal>
            <h3 className="text-poster mt-12 mb-5 text-2xl">Todas as {funZone.length} atrações</h3>
          </Reveal>
        )}
        <Stagger as="ul" className={cn('flex flex-wrap gap-2', compact && 'mt-8')} stagger={0.03}>
          {chips.map((f) => (
            <StaggerItem
              as="li"
              key={f.name}
              className="text-ink-950 flex items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-extrabold shadow-[0_3px_0_#0f7476] transition duration-300 hover:-translate-y-0.5 hover:-rotate-2"
            >
              <span className="bg-accent-600 grid h-7 w-7 place-items-center rounded-full text-white">
                <Icon name={f.icon} size={14} strokeWidth={2.4} />
              </span>
              {f.name}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
