import { site, whatsappUrl } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  eyebrow?: string
  title?: string
  description?: string
}

export function FinalCta({
  eyebrow = 'Próximo passo',
  title = 'O primeiro passo para a festa dos sonhos pode ser uma visita.',
  description = 'Conte o que você está planejando. A equipe apresenta o espaço, entende o perfil da festa e mostra todas as possibilidades para transformar a ideia em um dia inesquecível.',
}: Props) {
  return (
    <section className="bg-primary-500 relative isolate overflow-hidden pt-24 text-center md:pt-32">
      <div className="container-site relative">
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow tone="primary">{eyebrow}</Eyebrow>
          </div>
          <h2 className="text-poster mx-auto max-w-4xl text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.04]">{title}</h2>
          <p className="text-ink-950/90 mx-auto mt-6 max-w-2xl text-lg font-semibold">{description}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contato" variant="light" size="lg" icon="arrowRight">
            Solicite um orçamento
          </ButtonLink>
          <ButtonLink href={whatsappUrl()} variant="accent" size="lg" iconLeft="whatsapp">
            {site.contact.whatsapp.display}
          </ButtonLink>
        </Reveal>
      </div>
      <SoftCurve from="primary" to="accent-darkest" className="mt-20 md:mt-28" />
    </section>
  )
}
