import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  tone?: 'primary' | 'accent' | 'white' | 'ink'
  tilt?: number
  className?: string
  float?: boolean
}

const tones = {
  primary: 'bg-metal-primary text-ink-950',
  accent: 'bg-metal-accent text-ink-950',
  white: 'bg-white text-ink-950',
  ink: 'bg-ink-950 text-white',
}

/** Etiqueta com contorno branco e leve rotação, no estilo do logo. */
export function Sticker({ children, tone = 'white', tilt = -4, className, float }: Props) {
  const style = { '--tilt': `${tilt}deg`, transform: `rotate(${tilt}deg)` } as CSSProperties
  return (
    <span
      style={style}
      className={cn(
        'sticker font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8rem] font-bold whitespace-nowrap',
        tones[tone],
        float && 'motion-safe:animate-float',
        className,
      )}
    >
      {children}
    </span>
  )
}
