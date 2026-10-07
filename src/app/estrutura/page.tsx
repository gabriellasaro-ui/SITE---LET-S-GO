import type { Metadata } from 'next'
import { site } from '@/config/site'
import { photos } from '@/content/photos'
import { venueFeatures } from '@/content/structure'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { PhotoTile } from '@/components/ui/PhotoTile'
import { ParallaxImage } from '@/components/motion/Parallax'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { FunZoneSection } from '@/components/sections/FunZoneSection'
import { SoftCurve } from '@/components/ui/SoftCurve'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Estrutura do buffet e Espaço Diversão'
const description =
  'Salão climatizado com vista para a Lagoa da Pampulha, sala VIP, fraldário, estacionamento e Espaço Diversão com Kid Play de 18 m, Cinema 6D e escorregador 360º.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/estrutura' })

export default function EstruturaPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/estrutura', name: title, description })} />
      <PageHero
        eyebrow="Estrutura"
        crumb={{ label: 'Estrutura', href: '/estrutura' }}
        tone="accent"
        image={photos.bannerEstrutura}
        title="Um espaço para festa infantil em BH criado para encantar."
        highlight={{ festa: 'text-sticker-primary', encantar: 'text-sticker-accent' }}
        description="Na orla da Pampulha, a Let’s Go reúne salão climatizado, ambientes de apoio para a família e um Espaço Diversão completo, tudo pensado para a festa ser divertida para as crianças e tranquila para os pais."
      >
        <ButtonLink href="#espaco-diversao" variant="primary" icon="arrowRight">
          Ver o Espaço Diversão
        </ButtonLink>
        <ButtonLink href="/contato" variant="light">
          Agendar visita
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site grid items-center gap-20 lg:grid-cols-2">
          <Reveal scale={0.94} className="mx-auto w-full max-w-[460px]">
            <ParallaxImage
              src={photos.salao.src}
              alt={photos.salao.alt}
              sizes="(min-width: 1024px) 920px, 100vw"
              className="photo-frame aspect-[3/4]"
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Visão geral</Eyebrow>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.06] font-semibold">
                Estrutura completa. Experiência inesquecível.
              </h2>
              <p className="text-ink-950/70 mt-6 text-lg leading-relaxed">
                Cada ambiente da {site.name} cumpre um papel na festa. O salão climatizado recebe os convidados com
                painel de LED e teto iluminado; a sala VIP e o espaço gourmet acolhem a família; e o Espaço Diversão
                garante horas de brincadeira para a criançada.
              </p>
              <p className="text-ink-950/70 mt-4 text-lg leading-relaxed">
                Tudo isso com acessibilidade, estacionamento, fraldário completo e gerador de energia que contempla todo
                o salão, para nada interromper a comemoração.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-4" stagger={0.12}>
              {[photos.lounge, photos.areaExterna].map((p) => (
                <StaggerItem key={p.src}>
                  <PhotoTile photo={p} sizes="(min-width: 1024px) 580px, 90vw" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
      <SoftCurve from="paper" to="mist" />
      <FeaturesSection
        features={venueFeatures}
        eyebrow="Salão e conveniências"
        title="Conforto, segurança e acessibilidade para toda a família."
        description="Uma estrutura que cuida dos detalhes para você só se preocupar em aproveitar."
        showLink={false}
        bg="bg-mist"
      />
      <SoftCurve from="mist" to="accent-deep" flip />
      <FunZoneSection id="espaco-diversao" showLink={false} />

      <SoftCurve from="accent-deep" to="primary" />
      <FinalCta
        title="Venha conhecer a Let’s Go pessoalmente."
        description="Agende uma visita para conhecer o salão, o Espaço Diversão e a vista da Pampulha. A equipe mostra cada ambiente e tira todas as suas dúvidas."
      />
    </>
  )
}
