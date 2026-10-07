import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

/** Tom do bloco onde o título está: fundo claro, rosa forte ou turquesa. */
export type BlockTone = 'light' | 'primary' | 'accent' | 'deep'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  tone?: BlockTone
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  action?: ReactNode
  className?: string
}

const eyebrowTone: Record<BlockTone, string> = {
  light: 'bg-primary-100 text-primary-700',
  primary: 'bg-white text-primary-700',
  accent: 'bg-white text-accent-700',
  deep: 'bg-white text-accent-700',
}

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: BlockTone }) {
  return (
    <p
      className={cn(
        'mb-4 inline-flex -rotate-2 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold tracking-[0.16em] uppercase shadow-[0_3px_0_rgb(5_3_45/0.15)]',
        eyebrowTone[tone],
      )}
    >
      <span aria-hidden="true" className="bg-brand-gradient h-2 w-2 rounded-full" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
  action,
  className,
}: Props) {
  const colored = tone !== 'light'
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 md:mb-16',
        align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Tag
          className={cn('text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.05]', colored ? 'text-poster' : 'text-ink-950')}
        >
          {title}
        </Tag>
        {description && (
          <p
            className={cn(
              'mt-5 max-w-2xl leading-relaxed',
              // rosa e turquesa escuro: branco em 20px negrito (texto grande → contraste ≥3:1); turquesa claro: escuro
              tone === 'primary' || tone === 'deep'
                ? 'text-xl font-bold text-white [text-shadow:0_1px_2px_rgb(5_3_45/0.25)]'
                : colored
                  ? 'text-ink-950/85 text-lg font-semibold'
                  : 'text-ink-950/70 text-lg font-semibold',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={0.15} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
