import type { Metadata } from 'next'
import { occasions, parties } from '@/content/parties'
import { festasCarousel } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { partiesSchema, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { PartyCard } from '@/components/sections/PartyCard'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Festa Coquetel e Festa Kids em BH'
const description =
  'Festa Coquetel para a família toda e Festa Kids para aniversariantes a partir de 6 anos, na Pampulha. Veja o que inclui, a duração e peça seu orçamento.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/festas' })

const comparison: { label: string; coquetel: string; kids: string }[] = [
  { label: 'Para quem', coquetel: 'Família toda: crianças e adultos', kids: 'Só a turma do aniversariante' },
  { label: 'Idade indicada', coquetel: 'Convidados de todas as idades', kids: 'Aniversariantes a partir de 6 anos' },
  { label: 'Duração', coquetel: '4 horas (+30 min antes e depois)', kids: '4 horas' },
  { label: 'Buffet infantil', coquetel: 'Sim', kids: 'Sim, com doces e bolo' },
  { label: 'Buffet adulto', coquetel: 'Salgados sem limite, doces e bolo', kids: 'Não se aplica' },
  { label: 'Bebidas', coquetel: 'Água, suco e refrigerante sem limite', kids: 'Água, suco e refrigerante' },
  { label: 'Equipe', coquetel: 'Equipe de profissionais completa', kids: 'Monitores, cozinha, segurança e limpeza' },
  { label: 'Decoração', coquetel: 'Balões com cenário a escolher', kids: 'Balões com cenário a escolher' },
  { label: 'Convites e lembrancinhas', coquetel: 'Inclusos', kids: 'Inclusos' },
  { label: 'Refeição completa', coquetel: 'Opcional: almoço, jantar ou rodízio de pizza', kids: 'Não se aplica' },
]

const steps = [
  {
    title: 'Conte sua ideia',
    text: 'Fale com a equipe pelo WhatsApp ou formulário: data, formato e número de convidados.',
  },
  { title: 'Visite o espaço', text: 'Conheça o salão e o Espaço Diversão pessoalmente e tire todas as dúvidas.' },
  {
    title: 'Receba a proposta',
    text: 'A equipe apresenta disponibilidade, cardápio, cenários e a proposta para a sua festa.',
  },
  { title: 'É festa!', text: 'No grande dia, a equipe cuida de tudo para você aproveitar cada momento.' },
]

export default function FestasPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ path: '/festas', name: title, description }), partiesSchema(parties)]} />
      <PageHero
        eyebrow="Festas"
        crumb={{ label: 'Festas', href: '/festas' }}
        tone="accent"
        images={festasCarousel}
        title="A festa do seu filho, do jeitinho que ele sonhou."
        highlight={{ festa: 'text-sticker-primary', sonhou: 'text-sticker-accent' }}
        description="Na Let’s Go, você escolhe entre a Festa Coquetel, para reunir a família toda, e a Festa Kids, para a turma de aniversariantes a partir de 6 anos. Os dois formatos têm buffet, decoração e uma equipe preparada para fazer acontecer."
      >
        <ButtonLink href="#festa-coquetel" variant="light" icon="arrowRight">
          Festa Coquetel
        </ButtonLink>
        <ButtonLink href="#festa-kids" variant="accent" icon="arrowRight">
          Festa Kids
        </ButtonLink>
      </PageHero>

      <section className="bg-mist py-24 md:py-32">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          {parties.map((party, i) => (
            <PartyCard key={party.slug} party={party} headingLevel="h2" detailed delay={i * 0.15} />
          ))}
        </div>
      </section>
      <SoftCurve from="mist" to="paper" />
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Compare"
            title="Festa Coquetel ou Festa Kids?"
            description="Um resumo lado a lado para ajudar na escolha. Na dúvida, a equipe ajuda a definir o melhor formato para o aniversariante."
          />
          {/* Mobile: cards empilhados */}
          <div className="grid gap-4 md:hidden">
            {(
              [
                ['coquetel', 'Festa Coquetel', 'bg-metal-primary'],
                ['kids', 'Festa Kids', 'bg-metal-accent'],
              ] as const
            ).map(([key, name, bg]) => (
              <div key={key} className="ring-ink-950/10 overflow-hidden rounded-[1.75rem] bg-white ring-1">
                <p className={`${bg} font-display text-ink-950 px-6 py-4 text-lg font-bold`}>{name}</p>
                <dl className="divide-ink-950/8 divide-y px-6">
                  {comparison.map((row) => (
                    <div key={row.label} className="py-3.5">
                      <dt className="text-ink-950/60 text-xs font-extrabold tracking-[0.14em] uppercase">
                        {row.label}
                      </dt>
                      <dd className="text-ink-950/80 mt-1">{row[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto rounded-[2rem] border-4 border-white shadow-[0_8px_0_#ffc4e6] md:block">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left">
              <caption className="sr-only">Comparativo entre Festa Coquetel e Festa Kids da Let’s Go Festas</caption>
              <thead>
                <tr className="text-ink-950">
                  <th scope="col" className="bg-mist p-5 text-sm font-extrabold tracking-[0.14em] uppercase md:p-6">
                    Item
                  </th>
                  <th scope="col" className="font-display bg-primary-300 p-5 text-2xl md:p-6">
                    <span>Festa Coquetel</span>
                  </th>
                  <th scope="col" className="font-display bg-accent-400 p-5 text-2xl md:p-6">
                    <span>Festa Kids</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-ink-950/8 even:bg-mist/60 border-t">
                    <th scope="row" className="p-5 font-bold md:p-6">
                      {row.label}
                    </th>
                    <td className="text-ink-950/75 p-5 md:p-6">{row.coquetel}</td>
                    <td className="text-ink-950/75 p-5 md:p-6">{row.kids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <SoftCurve from="paper" to="accent" />
      <section className="bg-accent-400 relative overflow-hidden py-24 md:py-32">
        <div className="container-site relative">
          <SectionHeading
            tone="accent"
            eyebrow="Como funciona"
            title="Do primeiro contato ao grande dia em 4 passos."
          />
          <Stagger as="ol" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.14}>
            {steps.map((s, i) => (
              <StaggerItem
                as="li"
                key={s.title}
                className="h-full rounded-[2rem] border-4 border-white bg-white p-8 shadow-[0_8px_0_#0f7476] transition duration-300 odd:-rotate-1 even:rotate-1 hover:-translate-y-2 hover:rotate-0"
              >
                <span className="text-sticker-primary font-display text-6xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="text-ink-950/75 mt-3 leading-relaxed font-semibold">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <SoftCurve from="accent" to="paper" flip />
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Outras ocasiões"
            title="A estrutura da Let’s Go também recebe outros eventos."
            description="O mesmo salão climatizado, com painel de LED e vista para a lagoa, está preparado para celebrações de todas as idades."
          />
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {occasions.map((o, i) => (
              <StaggerItem as="li" key={o.title} className="border-ink-950/8 h-full rounded-[2rem] border bg-white p-8">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl ${i % 2 ? 'bg-accent-200' : 'bg-primary-200'}`}
                >
                  <Icon name={o.icon} size={26} />
                </span>
                <h3 className="mt-6 text-xl font-bold">{o.title}</h3>
                <p className="text-ink-950/70 mt-3 leading-relaxed">{o.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <SoftCurve from="paper" to="primary" />
      <FinalCta
        title="Conte para a gente como você imagina essa festa."
        description="Informe o formato, a data prevista e o número aproximado de convidados. A equipe entra em contato com disponibilidade e todas as possibilidades da Let’s Go."
      />
    </>
  )
}
