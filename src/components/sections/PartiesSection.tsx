import { parties } from '@/content/parties'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PartyCard } from './PartyCard'

export function PartiesSection() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Festas"
          title="Dois jeitos de comemorar. A mesma mágica Let’s Go."
          action={
            <ButtonLink href="/festas" variant="outline-dark" icon="arrowRight">
              Compare as festas
            </ButtonLink>
          }
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {parties.map((party, i) => (
            <PartyCard key={party.slug} party={party} compact delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
