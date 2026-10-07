import type { Metadata } from 'next'
import { fullAddress, site } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

const title = `Sobre nós: ${site.yearsOfHistory} anos de festas na Pampulha`
const description = `Há ${site.yearsOfHistory} anos a ${site.name} realiza festas infantis na orla da Lagoa da Pampulha, em BH, com qualidade, seriedade e cuidado em cada detalhe.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/sobre' })

const values: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Qualidade',
    text: 'Buffet saboroso, decoração caprichada e estrutura bem cuidada em cada festa.',
    icon: 'sparkles',
  },
  {
    title: 'Seriedade',
    text: 'Compromisso com o que foi combinado, do primeiro contato ao fim da festa.',
    icon: 'check',
  },
  {
    title: 'Cuidado',
    text: 'Monitores, segurança e uma estrutura pensada para crianças de todas as idades.',
    icon: 'baby',
  },
  {
    title: 'Alegria',
    text: 'No fim, o que importa é a criança feliz e a família tranquila para aproveitar.',
    icon: 'party',
  },
]

const team: { role: string; text: string; icon: IconName }[] = [
  {
    role: 'Atendimento comercial',
    text: 'Entende o sonho da família e monta a proposta ideal para a festa.',
    icon: 'phone',
  },
  {
    role: 'Coordenação de festas',
    text: 'Acompanha o grande dia de perto para tudo sair como planejado.',
    icon: 'users',
  },
  {
    role: 'Monitores e operação',
    text: 'Cuidam da diversão e da segurança da criançada em cada atração.',
    icon: 'goal',
  },
]

export default function SobrePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/sobre', name: title, description, type: 'AboutPage' })} />
      <PageHero
        eyebrow="Sobre nós"
        crumb={{ label: 'Sobre', href: '/sobre' }}
        tone="accent"
        image={photos.bannerSobre}
        title={`${site.yearsOfHistory} anos transformando aniversários em memórias.`}
        highlight={{ aniversários: 'text-sticker-primary', memórias: 'text-sticker-accent' }}
        description="A Let’s Go nasceu para fazer festas infantis com estrutura, carinho e atenção aos detalhes. Mais do que um salão de festas, queremos criar o cenário certo para cada história."
      />

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Eyebrow>Nossa história</Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.06] font-semibold">
              Uma estrutura pensada para superar expectativas.
            </h2>
            <p className="text-ink-950/70 mt-6 text-lg leading-relaxed">
              Na orla da Lagoa da Pampulha, em Belo Horizonte, a {site.name} reúne uma estrutura completa com uma equipe
              focada em entender cada família e entregar a melhor festa possível. Qualidade, seriedade e compromisso
              fazem parte da nossa essência há {site.yearsOfHistory} anos.
            </p>
            <p className="text-ink-950/70 mt-4 text-lg leading-relaxed">
              Nossa missão é simples: oferecer uma experiência à altura do momento, com diversão para as crianças,
              conforto para os convidados e tranquilidade para os pais em cada etapa da festa.
            </p>
          </Reveal>
          <Reveal scale={0.94} className="mx-auto w-full max-w-[560px]">
            <ParallaxImage
              src={photos.lounge.src}
              alt={photos.lounge.alt}
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="photo-frame aspect-[3/2]"
            />
          </Reveal>
        </div>
      </section>
      <SoftCurve from="paper" to="mist" />
      <section className="bg-mist py-24 md:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="O que nos move" title="Valores que aparecem em cada festa." />
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className="ring-ink-950/8 h-full rounded-[2rem] bg-white p-8 ring-1">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl ${i % 2 ? 'bg-accent-200' : 'bg-primary-200'}`}
                >
                  <Icon name={v.icon} size={26} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="text-ink-950/70 mt-3 leading-relaxed">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <SoftCurve from="mist" to="primary" flip />
      <section className="bg-primary-500 relative overflow-hidden py-24 md:py-32">
        <div className="container-site relative">
          <SectionHeading
            tone="primary"
            eyebrow="Pessoas"
            title="Uma equipe focada na festa do seu filho."
            description="Gente que gosta de festa e leva cada detalhe a sério, do atendimento à última lembrancinha."
          />
          <Stagger as="ul" className="grid gap-4 md:grid-cols-3">
            {team.map((t) => (
              <StaggerItem
                as="li"
                key={t.role}
                className="h-full rounded-[2rem] border-4 border-white bg-white p-8 shadow-[0_8px_0_#a83d64] transition duration-300 hover:-translate-y-2"
              >
                <span className="bg-accent-600 grid h-14 w-14 place-items-center rounded-2xl text-white">
                  <Icon name={t.icon} size={26} strokeWidth={2.2} />
                </span>
                <h3 className="mt-6 text-2xl">{t.role}</h3>
                <p className="text-ink-950/75 mt-3 leading-relaxed font-semibold">{t.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <SoftCurve from="primary" to="paper" />
      <section className="bg-paper py-24 md:py-28">
        <div className="container-site">
          <div className="border-ink-950/10 rounded-[2.25rem] border bg-white p-8 md:p-12">
            <h2 className="font-display text-xl font-bold md:text-2xl">Ficha da {site.name}</h2>
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {[
                { t: 'Nome', d: site.name },
                { t: 'Segmento', d: site.category },
                { t: 'Tempo de história', d: `${site.yearsOfHistory} anos` },
                { t: 'Endereço', d: fullAddress },
                { t: 'Região', d: `${site.address.region}, ${site.address.landmark}` },
                { t: 'Atende', d: site.areaServed.join(', ') },
                { t: 'WhatsApp', d: site.contact.whatsapp.display },
                { t: 'E-mail', d: site.contact.email },
              ].map((item) => (
                <div key={item.t} className="border-accent-400 border-l-4 pl-4">
                  <dt className="text-accent-700 text-xs font-extrabold tracking-[0.16em] uppercase">{item.t}</dt>
                  <dd className="text-ink-950/80 mt-1.5 leading-relaxed">{item.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <SoftCurve from="paper" to="primary" flip />
      <FinalCta />
    </>
  )
}
