import Image from 'next/image'
import Link from 'next/link'
import { fullAddress, site, whatsappUrl } from '@/config/site'
import { Icon, type IconName } from '@/components/ui/Icon'
import { CookiePreferencesButton } from './CookieConsent'

const socialIcon: Record<string, IconName> = { Instagram: 'instagram', Facebook: 'facebook' }

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-accent-700 relative overflow-hidden text-white">
      <div className="container-site grid gap-12 pt-16 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src={site.logo.src}
            unoptimized
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-sm text-white/90">
            {site.yearsOfHistory} anos fazendo festas infantis inesquecíveis {site.address.landmark}, em{' '}
            {site.address.city}.
          </p>
          <ul className="mt-6 flex gap-3">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} no ${s.label}`}
                  className="hover:text-accent-700 grid h-11 w-11 place-items-center rounded-full border-2 border-white text-white transition hover:-rotate-6 hover:bg-white"
                >
                  <Icon name={socialIcon[s.label] ?? 'arrowUpRight'} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-accent-100 font-display mb-4 text-xl tracking-wide">Navegue</h2>
          <ul className="grid gap-2.5">
            {[{ label: 'Início', href: '/' }, ...site.nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-accent-100 inline-block text-white/90 transition hover:translate-x-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-accent-100 font-display mb-4 text-xl tracking-wide">Festas</h2>
          <ul className="grid gap-2.5 text-white/90">
            <li>
              <Link
                href="/festas#festa-coquetel"
                className="hover:text-accent-100 inline-block transition hover:translate-x-1"
              >
                Festa Coquetel
              </Link>
            </li>
            <li>
              <Link
                href="/festas#festa-kids"
                className="hover:text-accent-100 inline-block transition hover:translate-x-1"
              >
                Festa Kids
              </Link>
            </li>
            <li>
              <Link
                href="/estrutura#espaco-diversao"
                className="hover:text-accent-100 inline-block transition hover:translate-x-1"
              >
                Espaço Diversão
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidade"
                className="hover:text-accent-100 inline-block transition hover:translate-x-1"
              >
                Política de privacidade
              </Link>
            </li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="text-accent-100 font-display mb-4 text-xl tracking-wide">Contato</h2>
          <ul className="grid gap-3 text-white/90">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-100 flex items-center gap-2.5 transition hover:translate-x-1"
              >
                <Icon name="whatsapp" size={18} className="text-white" /> {site.contact.whatsapp.display}
              </a>
            </li>
            {site.contact.phones.map((p) => (
              <li key={p.e164}>
                <a
                  href={`tel:${p.e164}`}
                  className="hover:text-accent-100 flex items-center gap-2.5 transition hover:translate-x-1"
                >
                  <Icon name="phone" size={18} className="text-white" /> {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-accent-100 flex items-center gap-2.5 break-all transition hover:translate-x-1"
              >
                <Icon name="mail" size={18} className="shrink-0 text-white" /> {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-100 flex gap-2.5 transition hover:translate-x-1"
              >
                <Icon name="mapPin" size={18} className="mt-0.5 shrink-0 text-white" />
                <span>{fullAddress}</span>
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t-2 border-white/20">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-white/90 md:flex-row md:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/politica-de-privacidade" className="underline-offset-4 hover:underline">
              Privacidade
            </Link>
            <CookiePreferencesButton />
            <Link href="/trabalhe-conosco" className="underline-offset-4 hover:underline">
              Trabalhe conosco
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
