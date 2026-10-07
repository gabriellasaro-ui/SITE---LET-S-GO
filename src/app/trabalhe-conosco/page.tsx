import type { Metadata } from 'next'
import { site } from '@/config/site'
import { photos } from '@/content/photos'
import { careerAreas } from '@/content/form'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { CareerForm } from '@/components/forms/CareerForm'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

const title = 'Trabalhe conosco: vagas em buffet infantil'
const description = `Quer trabalhar com festas infantis em BH? Cadastre seu currículo na ${site.name}: monitores, garçons, cozinha, decoração, limpeza e atendimento.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/trabalhe-conosco' })

const perks: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Ambiente de festa',
    text: 'Trabalhar onde a alegria das crianças faz parte da rotina, em um espaço completo na orla da Pampulha.',
    icon: 'party',
  },
  {
    title: 'Equipe parceira',
    text: 'Gente que se ajuda para cada festa sair perfeita, do salão à cozinha e ao Espaço Diversão.',
    icon: 'users',
  },
  {
    title: `${site.yearsOfHistory} anos de estrada`,
    text: 'Uma casa com história em Belo Horizonte, onde dá para aprender e crescer junto.',
    icon: 'trophy',
  },
]

const steps = [
  { title: 'Preencha o formulário', text: 'Conte quem você é, a área de interesse e sua disponibilidade.' },
  { title: 'Banco de talentos', text: 'Seu cadastro fica guardado e é consultado sempre que abre uma vaga.' },
  { title: 'A gente te chama', text: 'Se o seu perfil combinar com a vaga, a equipe entra em contato.' },
]

export default function TrabalheConoscoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/trabalhe-conosco', name: title, description })} />
      <PageHero
        eyebrow="Trabalhe conosco"
        crumb={{ label: 'Trabalhe conosco', href: '/trabalhe-conosco' }}
        tone="accent"
        image={photos.bannerTrabalhe}
        title="Venha fazer parte da equipe que faz a festa acontecer."
        highlight={{ equipe: 'text-sticker-primary', festa: 'text-sticker-accent' }}
        description={`Na ${site.name}, cada festa é feita por muita gente boa. Se você gosta de gente, de criança e de trabalhar com alegria, cadastre seu currículo.`}
      >
        <ButtonLink href="#candidatura" variant="primary" icon="arrowRight">
          Quero me candidatar
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Por que a Let’s Go"
            title="Um lugar para trabalhar com alegria."
            description="Por trás de cada aniversário tem monitores, garçons, cozinha, decoração, limpeza e atendimento trabalhando juntos."
          />
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3">
            {perks.map((p, i) => (
              <StaggerItem
                as="li"
                key={p.title}
                className="ring-ink-950/8 h-full rounded-[2rem] bg-white p-8 ring-1 transition duration-300 hover:-translate-y-2"
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl ${i % 2 ? 'bg-accent-200' : 'bg-primary-200'}`}
                >
                  <Icon name={p.icon} size={26} />
                </span>
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="text-ink-950/70 mt-3 leading-relaxed">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14 text-center">
            <h3 className="text-2xl">Áreas do banco de talentos</h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {careerAreas
                .filter((a) => a !== 'Outra área')
                .map((a, i) => (
                  <li
                    key={a}
                    className={`text-ink-950 rounded-full px-5 py-2.5 font-bold ${i % 2 ? 'bg-accent-100' : 'bg-primary-100'}`}
                  >
                    {a}
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <SoftCurve from="paper" to="mist" />
      <section id="candidatura" className="bg-mist scroll-mt-24 py-20 md:py-28">
        <div className="container-site grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="bg-primary-500 relative overflow-hidden rounded-[2rem] border-4 border-white p-8 shadow-[0_8px_0_#a83d64] md:p-10">
            <Eyebrow tone="primary">Como funciona</Eyebrow>
            <h2 className="text-poster text-4xl">Três passos simples</h2>
            <ol className="mt-8 grid gap-3">
              {steps.map((s, i) => (
                <li key={s.title} className="text-ink-950 flex gap-4 rounded-2xl bg-white p-5 shadow-[0_5px_0_#a83d64]">
                  <span className="bg-accent-400 font-display grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-lg font-extrabold">{s.title}</span>
                    <span className="text-ink-950/75 mt-1 block leading-relaxed">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-ink-950 mt-8 flex gap-3 border-t-2 border-white/40 pt-6 font-semibold">
              <Icon name="lightbulb" size={22} className="mt-0.5 shrink-0" />
              Primeiro emprego? Pode se candidatar também. Vontade de aprender conta muito por aqui.
            </p>
          </aside>
          <CareerForm />
        </div>
      </section>
      <SoftCurve from="mist" to="accent-darkest" flip />
    </>
  )
}
