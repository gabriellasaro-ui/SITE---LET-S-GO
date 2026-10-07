import { site, whatsappUrl } from '@/config/site'
import { Icon } from '@/components/ui/Icon'

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Fale com a gente pelo WhatsApp da ${site.name}`}
      className="sticker group text-ink-950 fixed right-4 bottom-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pr-5 pl-4 font-bold transition hover:-translate-y-1 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" size={26} />
      <span className="hidden sm:inline">Fale com a gente</span>
    </a>
  )
}
