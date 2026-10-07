import { highlights } from '@/content/highlights'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

/**
 * Faixa de diferenciais logo abaixo do hero (padrão das LPs Firebull/QADRAS):
 * reta, cor sólida da marca, ícone + texto em caixa alta rolando sem parar (CSS puro).
 */
export function HighlightsMarquee({ tone = 'accent', className }: { tone?: 'accent' | 'primary'; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {highlights.map((h) => (
        <li
          key={h.title}
          className="flex min-h-14 items-center gap-2.5 px-6 text-sm font-black tracking-[0.09em] whitespace-nowrap uppercase md:text-[0.95rem]"
        >
          <Icon name={h.icon} size={20} strokeWidth={2.4} className="shrink-0" />
          {h.title}
        </li>
      ))}
    </ul>
  )
  return (
    <div
      aria-label="Diferenciais da Let’s Go"
      className={cn(
        'group/marquee relative z-10 overflow-hidden',
        tone === 'accent' ? 'bg-accent-400 text-ink-950' : 'bg-primary-300 text-ink-950',
        className,
      )}
    >
      <div className="animate-marquee flex w-max group-hover/marquee:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
