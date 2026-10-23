import { site } from '@/config/site'
import { photos } from '@/content/photos'
import { funZone } from '@/content/structure'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { CountUp } from '@/components/motion/Effects'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

const stats = [
  { value: site.yearsOfHistory ?? 20, label: 'anos de festa' },
  { value: funZone.length, label: 'atrações' },
  { value: 4, label: 'horas de festa' },
]

export function IntroSection() {
  return (
    <section className="bg-paper pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Nosso espaço</Eyebrow>
            <h2 className="text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05]">
              Um espaço para festas onde cada detalhe vira <span className="text-sticker-primary">diversão</span>.
            </h2>
            <p className="text-ink-950/70 mt-6 max-w-lg text-lg leading-relaxed">
              Salão climatizado, área externa com vista para a Lagoa da Pampulha e uma equipe que cuida de tudo, do
              convite à lembrancinha. Você só aproveita.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-10 grid max-w-md grid-cols-3 gap-4" stagger={0.1}>
            {stats.map((s) => (
              <StaggerItem as="li" key={s.label}>
                <CountUp to={s.value} className="font-display text-accent-600 text-5xl leading-none md:text-6xl" />
                <span className="text-ink-950/70 mt-1 block text-sm font-bold">{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <ButtonLink href="/estrutura" variant="dark" icon="arrowRight" className="mt-10">
              Conheça o espaço
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal scale={0.94} className="mx-auto w-full max-w-[560px]">
          <ParallaxImage
            src={photos.areaExterna.src}
            alt={photos.areaExterna.alt}
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="photo-frame aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  )
}
