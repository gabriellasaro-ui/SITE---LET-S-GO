import type { Metadata } from 'next'
import { site } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const nota = site.rating ? site.rating.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 }) : null
const total = site.rating ? new Intl.NumberFormat('pt-BR').format(site.rating.count) : null

const title = nota ? `Clientes e avaliações: nota ${nota} no Google` : 'Clientes e avaliações'
const description = `Depoimentos de famílias que fizeram festa na Let’s Go, buffet infantil na Pampulha (BH)${
  nota ? `: nota ${nota} no Google, com ${total} avaliações` : ''
}.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/clientes' })

export default function ClientesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/clientes', name: title, description })} />
      <PageHero
        eyebrow="Clientes"
        crumb={{ label: 'Clientes', href: '/clientes' }}
        tone="primary"
        image={photos.bannerDepoimentos}
        title="Festas marcantes começam com escolhas que inspiram confiança."
        highlight={{ Festas: 'text-sticker-primary', confiança: 'text-sticker-accent' }}
        description={`Famílias de Belo Horizonte já escolheram a Let’s Go para celebrar momentos importantes${
          nota ? ` e deram nota ${nota} no Google, em ${total} avaliações` : ''
        }. Aqui, a prova está nas palavras de quem viveu cada festa.`}
      >
        <ButtonLink href={site.rating?.url ?? site.address.mapsUrl} variant="light" icon="arrowUpRight">
          Ver avaliações no Google
        </ButtonLink>
      </PageHero>
      <TestimonialsSection full />
      <SoftCurve from="paper" to="primary" flip />
      <FinalCta title="A próxima história pode ser a do seu filho." />
    </>
  )
}
