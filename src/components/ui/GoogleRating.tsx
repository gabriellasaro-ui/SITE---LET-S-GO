import { site } from '@/config/site'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const fmt = new Intl.NumberFormat('pt-BR')

/** Estrelas com preenchimento proporcional à nota (ex.: 4,8 → 4 cheias + 80% da última). */
export function Stars({ value, size = 22 }: { value: number; size?: number }) {
  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className="flex text-[#e8e2ee]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={size} className="fill-current" strokeWidth={0} />
        ))}
      </span>
      <span className="absolute inset-0 flex overflow-hidden text-[#fbbc04]" style={{ width: `${(value / 5) * 100}%` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={size} className="shrink-0 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  )
}

export const GoogleG = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="shrink-0">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
    />
  </svg>
)

/**
 * Avaliação pública no Google (fonte: site.rating).
 * `variant="card"` = bloco de destaque; `variant="badge"` = selo compacto.
 */
export function GoogleRating({ variant = 'card', className }: { variant?: 'card' | 'badge'; className?: string }) {
  const r = site.rating
  if (!r) return null
  const nota = r.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
  const label = `Nota ${nota} de 5 no ${r.platform}, com ${fmt.format(r.count)} avaliações`

  if (variant === 'badge') {
    return (
      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'ring-ink-950/10 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-3 shadow-[0_6px_0_#a9e3e9] ring-1 transition hover:-translate-y-0.5',
          className,
        )}
      >
        <GoogleG />
        {/* nome acessível = texto visível + complemento em sr-only (evita divergência para leitores de voz) */}
        <span className="font-display text-ink-950 text-2xl leading-none">
          <span className="sr-only">Nota </span>
          {nota}
          <span className="sr-only"> de 5 no {r.platform}, com</span>
        </span>
        <Stars value={r.value} size={18} />
        <span className="text-ink-950/70 text-sm font-bold">
          {fmt.format(r.count)} avaliações<span className="sr-only">. Ver no {r.platform}</span>
        </span>
      </a>
    )
  }

  return (
    <div
      className={cn(
        'border-accent-100 flex flex-col items-center gap-6 rounded-[2rem] border-2 bg-white p-8 text-center shadow-[0_8px_0_#a9e3e9] md:flex-row md:p-10 md:text-left',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <GoogleG />
        <p className="font-display text-ink-950 text-7xl leading-none" aria-label={label}>
          {nota}
        </p>
      </div>
      <div className="md:border-ink-950/10 md:border-l md:pl-8">
        <Stars value={r.value} size={30} />
        <p className="text-ink-950 mt-2 text-xl font-bold">
          {fmt.format(r.count)} avaliações no {r.platform}
        </p>
        <p className="text-ink-950/70 mt-1">Nota dada por famílias que já fizeram festa na Let’s Go.</p>
      </div>
      <a
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-toy font-display text-ink-950 bg-accent-400 inline-flex h-12 items-center gap-2 rounded-full px-6 tracking-wide [--btn-depth:#0f7476] md:ml-auto"
      >
        Ver no Google <Icon name="arrowUpRight" size={18} strokeWidth={2.6} />
      </a>
    </div>
  )
}
