import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'accent' | 'light' | 'outline-light' | 'dark' | 'outline-dark'
type Size = 'md' | 'lg'

/**
 * --btn-depth = cor da "base" do botão de brinquedo (sombra sólida que afunda).
 * primary = rosa (principal), accent = turquesa (secundário), light = branco, dark = navy.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-primary-300 text-ink-950 [--btn-depth:#a83d64] hover:bg-primary-200',
  accent: 'bg-accent-400 text-ink-950 [--btn-depth:#0f7476] hover:bg-accent-300',
  light: 'bg-white text-ink-950 [--btn-depth:#0f7476] hover:bg-accent-50',
  'outline-light': 'border-2 border-ink-950 bg-white/30 text-ink-950 [--btn-depth:#05032d] hover:bg-white/55',
  dark: 'bg-ink-950 text-white [--btn-depth:#1eb7c3] hover:bg-ink-800',
  'outline-dark': 'border-2 border-ink-950 bg-white text-ink-950 [--btn-depth:#05032d] hover:bg-accent-50',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[1.02rem]',
  lg: 'h-14 px-8 text-[1.15rem]',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'btn-toy group font-display inline-flex items-center justify-center gap-2.5 rounded-full tracking-wide whitespace-nowrap disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  icon?: IconName
  iconLeft?: IconName
  className?: string
  children: ReactNode
}

/** Ícone dentro de uma bolinha que gira e pula no hover. */
export function ButtonIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid h-7 w-7 place-items-center rounded-full bg-current/15 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:scale-110 group-hover:-rotate-12',
        className,
      )}
    >
      <Icon name={name} size={16} strokeWidth={2.6} />
    </span>
  )
}

export function ButtonLink({ variant, size, icon, iconLeft, className, children, href, ...props }: ButtonLinkProps) {
  const isNewTab = typeof href === 'string' && href.startsWith('http')
  return (
    <Link
      href={href}
      {...props}
      {...(isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={buttonClasses(variant, size, className)}
    >
      {iconLeft && <Icon name={iconLeft} size={20} className="group-hover:animate-wiggle transition-transform" />}
      <span>{children}</span>
      {icon && <ButtonIcon name={icon} className="-mr-2" />}
    </Link>
  )
}
