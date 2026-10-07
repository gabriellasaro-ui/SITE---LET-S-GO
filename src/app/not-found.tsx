import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-primary-500 relative flex min-h-[100svh] flex-col overflow-hidden pt-[84px] text-center">
      <div className="container-site relative my-auto py-16">
        <p className="text-sticker-accent font-display text-[clamp(7rem,22vw,15rem)] leading-none">404</p>
        <h1 className="text-poster mt-4 text-[clamp(2rem,4.4vw,3.4rem)]">Ops! Essa página saiu da festa.</h1>
        <p className="text-ink-950 mx-auto mt-4 max-w-lg text-lg font-semibold">
          O endereço pode ter mudado. Que tal voltar para o início ou conhecer nossas festas?
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="light" icon="arrowRight">
            Voltar ao início
          </ButtonLink>
          <ButtonLink href="/festas" variant="accent">
            Ver as festas
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
