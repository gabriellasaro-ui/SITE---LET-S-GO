'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { site, whatsappUrl } from '@/config/site'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export function MobileMenu({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className={cn(
          'grid h-11 w-11 place-items-center rounded-full border-2 transition',
          onDark && !open
            ? 'border-white text-white hover:bg-white/20'
            : 'border-ink-950 text-ink-950 hover:bg-primary-100',
        )}
      >
        <Icon name={open ? 'x' : 'menu'} size={22} />
      </button>

      {/* Portal no <body>: o backdrop-filter do header prenderia um painel `fixed` dentro dele */}
      {open &&
        createPortal(
          <div id="menu-mobile" className="bg-accent-700 fixed inset-0 z-40 overflow-y-auto pt-[84px] xl:hidden">
            <nav aria-label="Menu mobile" className="container-site relative py-8">
              <ul className="flex flex-col">
                {[{ label: 'Início', href: '/' }, ...site.nav].map((item, i) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href} className="border-b-2 border-white/25">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'font-display flex items-center justify-between py-4 text-[1.7rem]',
                          active ? 'text-accent-200' : 'text-white',
                        )}
                      >
                        {item.label}
                        <span className="font-sans text-xs font-bold text-white/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link
                  href={site.cta.href}
                  onClick={() => setOpen(false)}
                  className="btn-toy font-display text-ink-950 flex h-14 items-center justify-center rounded-full bg-white text-lg [--btn-depth:#05032d]"
                >
                  {site.cta.label}
                </Link>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-toy font-display bg-accent-400 text-ink-950 flex h-14 items-center justify-center gap-2 rounded-full text-lg [--btn-depth:#0f7476]"
                >
                  <Icon name="whatsapp" size={20} /> {site.contact.whatsapp.display}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
