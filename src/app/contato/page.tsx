import type { Metadata } from 'next'
import { Suspense } from 'react'
import { directionsUrl, fullAddress, site, whatsappUrl } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { LeadForm } from '@/components/forms/LeadForm'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

const title = 'Contato e orçamento de festa infantil'
const description = `Fale com a Let’s Go: WhatsApp ${site.contact.whatsapp.display}, telefones ${site.contact.phones.map((p) => p.display).join(' e ')}. Endereço, mapa e orçamento de festa infantil na Pampulha.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/contato' })

type Channel = {
  icon: IconName
  label: string
  links: { text: string; href: string; external?: boolean }[]
  hint: string
}

const channels: Channel[] = [
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    links: [{ text: site.contact.whatsapp.display, href: whatsappUrl(), external: true }],
    hint: 'O jeito mais rápido de falar com a equipe.',
  },
  {
    icon: 'phone',
    label: 'Telefones',
    links: site.contact.phones.map((p) => ({ text: p.display, href: `tel:${p.e164}` })),
    hint: 'Ligue para tirar dúvidas ou agendar sua visita.',
  },
  {
    icon: 'mail',
    label: 'E-mail',
    links: [{ text: site.contact.email, href: `mailto:${site.contact.email}` }],
    hint: 'Para propostas, parcerias e documentos.',
  },
  {
    icon: 'instagram',
    label: 'Redes sociais',
    links: site.social.map((s) => ({ text: s.label, href: s.href, external: true })),
    hint: 'Festas recentes, novidades e bastidores.',
  },
]

const info: { icon: IconName; label: string; value: string }[] = [
  { icon: 'mapPin', label: 'Endereço', value: fullAddress },
  { icon: 'waves', label: 'Referência', value: `Na orla da Lagoa da ${site.address.region}` },
  { icon: 'car', label: 'Estacionamento', value: 'Estacionamento para os convidados' },
  { icon: 'accessibility', label: 'Acessibilidade', value: 'Acesso adaptado para pessoas com mobilidade reduzida' },
  ...(site.openingHours ?? []).map((h) => ({
    icon: 'clock' as const,
    label: 'Atendimento',
    value: `${h.days}: ${h.opens}–${h.closes}`,
  })),
]

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/contato', name: title, description, type: 'ContactPage' })} />
      <PageHero
        eyebrow="Fale conosco"
        crumb={{ label: 'Contato', href: '/contato' }}
        tone="primary"
        image={photos.bannerContato}
        title="Vamos transformar sua ideia em uma festa inesquecível?"
        highlight={{ ideia: 'text-sticker-primary', inesquecível: 'text-sticker-accent' }}
        description="Consulte a disponibilidade da sua data, agende uma visita ou receba uma proposta para a festa infantil na Pampulha. A equipe responde rapidinho."
      >
        <ButtonLink href={whatsappUrl()} variant="primary" iconLeft="whatsapp">
          Chamar no WhatsApp
        </ButtonLink>
        <ButtonLink href="#como-chegar" variant="light" icon="navigation">
          Como chegar
        </ButtonLink>
      </PageHero>

      {/* canais */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="Canais de atendimento"
            title="Escolha o jeito mais fácil de falar com a gente."
            description="WhatsApp, telefone, e-mail ou redes sociais: a equipe da Let’s Go está pronta para ajudar a planejar a festa."
          />
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <StaggerItem
                as="li"
                key={c.label}
                className={cn(
                  'flex h-full flex-col rounded-[2rem] border-4 border-white p-7 transition duration-300 hover:-translate-y-2',
                  i % 2 ? 'bg-accent-400 shadow-[0_8px_0_#0f7476]' : 'bg-primary-300 shadow-[0_8px_0_#a83d64]',
                )}
              >
                <span className="text-ink-950 grid h-14 w-14 place-items-center rounded-2xl bg-white">
                  <Icon name={c.icon} size={26} strokeWidth={2.2} />
                </span>
                <h3 className="text-ink-950 mt-6 text-2xl">{c.label}</h3>
                <p className="text-ink-950/80 mt-2 leading-relaxed font-semibold">{c.hint}</p>
                <ul className="mt-auto grid gap-2 pt-6">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-ink-950 group/link inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 font-extrabold break-all transition hover:-rotate-1"
                      >
                        {l.text}
                        <Icon
                          name="arrowUpRight"
                          size={16}
                          strokeWidth={2.6}
                          className="shrink-0 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* mapa + informações gerais */}
      <SoftCurve from="paper" to="mist" />
      <section id="como-chegar" aria-labelledby="como-chegar-titulo" className="bg-mist scroll-mt-24 py-20 md:py-28">
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal scale={0.97} className="h-full">
            <div className="ring-ink-950/8 h-[380px] overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_8px_0_#a9e3e9] ring-1 md:h-[480px] lg:h-full lg:min-h-[560px]">
              <iframe
                title={`Mapa com a localização da ${site.name}`}
                src={site.address.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-accent-400 h-full rounded-[2rem] border-4 border-white p-8 shadow-[0_8px_0_#0f7476] md:p-10">
              <Eyebrow tone="accent">Como chegar</Eyebrow>
              <h2 id="como-chegar-titulo" className="text-poster text-4xl leading-[1.05]">
                {site.name}
              </h2>
              <ul className="mt-8 grid gap-3">
                {info.map((item) => (
                  <li
                    key={item.label}
                    className="text-ink-950 flex gap-4 rounded-2xl bg-white p-4 shadow-[0_5px_0_#0f7476]"
                  >
                    <span className="bg-primary-500 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-accent-700 text-xs font-extrabold tracking-[0.14em] uppercase">{item.label}</p>
                      <p className="font-bold break-words">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={directionsUrl}
                  variant="light"
                  icon="navigation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traçar rota
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="container-site mt-10 flex justify-center">
          <GoogleRating variant="badge" />
        </Reveal>
      </section>

      {/* formulário */}
      <SoftCurve from="mist" to="paper" flip />
      <section aria-labelledby="orcamento-titulo" className="bg-paper py-20 md:py-28">
        <div className="container-site grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Orçamento e visita</Eyebrow>
            <h2 id="orcamento-titulo" className="text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.05]">
              Conte como você imagina a festa.
            </h2>
            <p className="text-ink-950/70 mt-6 text-lg leading-relaxed">
              Preencha o formulário com a data e o número de convidados. A equipe confere a disponibilidade e responde
              pelo WhatsApp com a proposta ou com um horário para você conhecer o espaço.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                'Consulta de disponibilidade da data',
                'Visita guiada ao salão e ao Espaço Diversão',
                'Proposta personalizada para a sua festa',
              ].map((t) => (
                <li key={t} className="text-ink-950 flex items-center gap-3 font-bold">
                  <span className="bg-accent-400 grid h-8 w-8 shrink-0 place-items-center rounded-full">
                    <Icon name="check" size={18} strokeWidth={2.8} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Suspense fallback={<div className="ring-ink-950/8 min-h-[640px] rounded-[2rem] bg-white ring-1" />}>
            <LeadForm />
          </Suspense>
        </div>
      </section>
      <SoftCurve from="paper" to="accent-darkest" />
    </>
  )
}
