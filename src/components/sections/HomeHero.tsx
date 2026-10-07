import Image from 'next/image'
import { photos } from '@/content/photos'
import { ButtonLink } from '@/components/ui/Button'
import { Rise, SplitWords } from '@/components/motion/SplitWords'

export function HomeHero() {
  return (
    <section data-hero className="relative isolate flex h-svh min-h-[560px] flex-col overflow-hidden pt-[84px]">
      {/* Foto da fachada em tela cheia (otimizada por tamanho de tela, em qualidade 90) */}
      <Image
        src={photos.banner.src}
        alt={photos.banner.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover object-[center_45%]"
      />
      {/* Camada para leitura do texto sobre a foto */}
      <div
        aria-hidden="true"
        className="bg-ink-950/25 absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(5_3_45/0.6)_0%,rgb(5_3_45/0.45)_55%,rgb(5_3_45/0.3)_100%)]"
      />

      <div className="container-site relative flex flex-1 flex-col items-center justify-center pb-[84px] text-center">
        <h1>
          <span className="sr-only">Buffet infantil na Pampulha, em Belo Horizonte: </span>
          <SplitWords
            text="A festa do seu filho merece um cenário à altura."
            className="text-poster mx-auto block max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.03]"
            highlight={{ festa: 'text-sticker-primary', altura: 'text-sticker-accent' }}
            delay={0.1}
          />
        </h1>

        <Rise delay={0.5} visible>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-bold text-white [text-shadow:0_2px_12px_rgb(5_3_45/0.7)] md:text-xl">
            Buffet completo, decoração e um parque de diversões inteirinho, na orla da Lagoa da Pampulha.
          </p>
        </Rise>

        <Rise delay={0.65} className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contato" variant="primary" size="lg" icon="arrowRight">
            Agende uma visita
          </ButtonLink>
          <ButtonLink href="/festas" variant="light" size="lg">
            Conheça as festas
          </ButtonLink>
        </Rise>
      </div>
    </section>
  )
}
