import type { FaqItem } from '@/content/faq'
import { Icon } from '@/components/ui/Icon'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'

/**
 * Acordeão com <details>/<summary> nativos: funciona sem JavaScript
 * e mantém todas as respostas no HTML (indexáveis por buscadores e IAs).
 * A abertura é animada via CSS (`::details-content`) onde o navegador suporta.
 */
export function FaqList({ items, openFirst }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <Stagger className="grid gap-3" stagger={0.06}>
      {items.map((item, i) => (
        <StaggerItem key={item.question}>
          <details
            name="faq"
            open={openFirst && i === 0}
            className="group open:ring-primary-300 ring-ink-950/8 rounded-[1.5rem] bg-white px-6 ring-1 transition-shadow open:shadow-[0_24px_50px_-30px_rgb(5_3_45/0.35)] open:ring-2 md:px-8"
          >
            <summary className="font-display hover:text-primary-700 flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold transition-colors md:text-xl [&::-webkit-details-marker]:hidden">
              <h3 className="font-[inherit] text-[inherit]">{item.question}</h3>
              <span className="bg-ink-950 group-open:bg-metal-primary group-open:text-ink-950 grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform duration-500 group-open:rotate-[135deg]">
                <Icon name="plus" size={18} strokeWidth={2.5} />
              </span>
            </summary>
            <p className="text-ink-950/70 max-w-3xl pb-6 text-lg leading-relaxed">{item.answer}</p>
          </details>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
