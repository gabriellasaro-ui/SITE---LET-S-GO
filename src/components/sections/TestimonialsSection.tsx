import { googleReviews, testimonials } from '@/content/testimonials'
import { ButtonLink } from '@/components/ui/Button'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialsCarousel } from './TestimonialsCarousel'

type Props = { full?: boolean; showLink?: boolean }

/** Avaliações do Google + depoimentos do site, em carrossel. */
export function TestimonialsSection({ full = false, showLink = true }: Props) {
  const items = [...googleReviews, ...testimonials]
  return (
    <section className="bg-paper relative overflow-hidden py-24 md:py-32">
      <div className="container-site relative">
        {!full && (
          <SectionHeading
            eyebrow="Depoimentos"
            title="Festas que viram histórias para contar."
            description="Quem já comemorou com a gente conta como foi. Palavras reais de famílias que viveram o grande dia na Let’s Go."
            action={
              showLink ? (
                <ButtonLink href="/clientes" variant="outline-dark" icon="arrowRight">
                  Todos os depoimentos
                </ButtonLink>
              ) : undefined
            }
          />
        )}
        {/* avaliação do Google: selo na home, destaque grande na aba Clientes */}
        {full ? <GoogleRating className="mb-12" /> : <GoogleRating variant="badge" className="mb-10" />}
        <Reveal>
          <TestimonialsCarousel items={items} full={full} />
        </Reveal>
      </div>
    </section>
  )
}
