import { cn } from '@/lib/cn'

/** Cores de fundo das seções (hex igual aos tokens de globals.css). */
const COLORS = {
  paper: '#fff8fc',
  mist: '#f4f1fb',
  primary: '#ce5f95',
  accent: '#1eb7c3',
  'primary-dark': '#a83d64',
  'accent-deep': '#139697',
  'accent-darkest': '#0f7476',
} as const

export type CurveColor = keyof typeof COLORS

const BG: Record<CurveColor, string> = {
  paper: 'bg-paper',
  mist: 'bg-mist',
  primary: 'bg-primary-500',
  accent: 'bg-accent-400',
  'primary-dark': 'bg-primary-700',
  'accent-deep': 'bg-accent-600',
  'accent-darkest': 'bg-accent-700',
}

/**
 * Transição leve entre seções: uma curva suave da cor de cima (`from`) para a de baixo (`to`).
 * `flip` inverte o sentido da curva (alterne para dar ritmo).
 */
export function SoftCurve({
  from,
  to,
  flip,
  className,
}: {
  from: CurveColor
  to: CurveColor
  flip?: boolean
  className?: string
}) {
  return (
    <div aria-hidden="true" className={cn('relative h-10 md:h-16', BG[from], className)}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute inset-0 block h-full w-full">
        <path d={flip ? 'M0 0 Q720 120 1440 0 V64 H0 Z' : 'M0 64 C360 -8 1080 -8 1440 64 Z'} fill={COLORS[to]} />
      </svg>
    </div>
  )
}
