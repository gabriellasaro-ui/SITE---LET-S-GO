import { venueFeatures, type Feature } from '@/content/structure'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

type Props = {
  features?: Feature[]
  eyebrow?: string
  title?: string
  description?: string
  showLink?: boolean
  /** Cor de fundo da seção (classe Tailwind) */
  bg?: 'bg-paper' | 'bg-mist'
  className?: string
}

/** Lista compacta de comodidades: ícone pequeno + título + uma linha, em 2 colunas com divisórias. */
export function FeaturesSection({
  features = venueFeatures.slice(0, 6),
  eyebrow = 'Por que a Let’s Go',
  title = 'Por que escolher a Let’s Go para a festa do seu filho em BH?',
  description,
  showLink = true,
  bg = 'bg-paper',
  className,
}: Props) {
  return (
    <section className={cn(bg, 'py-24 md:py-28', className)}>
      <div className="container-site">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            showLink ? (
              <ButtonLink href="/estrutura" variant="outline-dark" icon="arrowRight">
                Estrutura completa
              </ButtonLink>
            ) : undefined
          }
        />
        <Stagger as="ul" className="grid gap-x-12 md:grid-cols-2" stagger={0.05}>
          {features.map((f, i) => (
            <StaggerItem
              as="li"
              key={f.title}
              className="group border-ink-950/10 flex items-start gap-4 border-b py-5 transition-colors"
            >
              <span
                className={cn(
                  'grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                  i % 2 === 0 ? 'bg-primary-500' : 'bg-accent-600',
                )}
              >
                <Icon name={f.icon} size={20} strokeWidth={2.2} />
              </span>
              <span>
                <h3 className="text-lg leading-tight">{f.title}</h3>
                <p className="text-ink-950/65 mt-1 leading-snug">{f.text}</p>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
