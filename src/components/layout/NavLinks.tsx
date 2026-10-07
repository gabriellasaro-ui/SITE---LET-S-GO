'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export function NavLinks({ onDark = false }: { onDark?: boolean }) {
  const pathname = usePathname()
  return (
    <ul className="flex items-center gap-1">
      {site.nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'font-display relative rounded-full px-3 py-2 text-[1rem] tracking-wide whitespace-nowrap transition-all duration-300',
                onDark
                  ? active
                    ? 'bg-white/25 text-white'
                    : 'text-white [text-shadow:0_1px_8px_rgb(5_3_45/0.6)] hover:-rotate-3 hover:bg-white/20'
                  : active
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-ink-950 hover:bg-accent-50 hover:text-accent-700 hover:-rotate-3',
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
