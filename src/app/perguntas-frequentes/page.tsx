import type { Metadata } from 'next'
import { allFaqs, faqGroups } from '@/content/faq'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { FaqList } from '@/components/sections/FaqList'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Perguntas frequentes sobre festa infantil'
const description =
  'Onde fica a Let’s Go, o que inclui a Festa Coquetel e a Festa Kids, duração, atrações, estacionamento, acessibilidade e como agendar uma visita.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/perguntas-frequentes' })

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ path: '/perguntas-frequentes', name: title, description }), faqSchema(allFaqs)]} />
      <PageHero
        eyebrow="Perguntas frequentes"
        crumb={{ label: 'Dúvidas', href: '/perguntas-frequentes' }}
        tone="accent"
        image={photos.bannerDuvidas}
        title="Perguntas frequentes sobre a Let’s Go Festas."
        highlight={{ Perguntas: 'text-sticker-primary', Festas: 'text-sticker-accent' }}
        description="Reunimos as dúvidas mais comuns de quem procura um buffet infantil em Belo Horizonte. Respostas rápidas para você planejar a festa com tranquilidade."
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          <nav aria-label="Categorias de perguntas" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-primary-700 mb-4 text-xs font-extrabold tracking-[0.18em] uppercase">Categorias</p>
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slug(g.title)}`}
                    className="border-ink-950/10 hover:border-ink-950 inline-block rounded-full border-2 px-4 py-2 text-sm font-bold transition"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-16">
            {faqGroups.map((g) => (
              <section
                key={g.title}
                id={slug(g.title)}
                className="scroll-mt-28"
                aria-labelledby={`${slug(g.title)}-titulo`}
              >
                <h2 id={`${slug(g.title)}-titulo`} className="mb-4 text-2xl font-bold md:text-3xl">
                  {g.title}
                </h2>
                <FaqList items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <SoftCurve from="paper" to="primary" />
      <FinalCta
        title="Ainda ficou alguma dúvida?"
        description="Fale com a equipe pelo WhatsApp ou agende uma visita. Teremos o maior prazer em mostrar a Let’s Go e responder tudo pessoalmente."
      />
    </>
  )
}
