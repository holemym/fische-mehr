import { Link } from '@/navigation';
import { clsx } from '@/lib/clsx';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] cursor-pointer transition-colors duration-200 ease-out focus-visible:outline-coral disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  // Sea-deep CTA.
  primary: 'bg-sea-deep text-cream hover:bg-sea',
  // Outline sea-deep secondary.
  secondary:
    'border border-sea-deep/30 text-sea-deep hover:border-sea-deep hover:bg-sea-deep hover:text-cream',
  ghost: 'text-sea-deep hover:text-sea',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5',
  lg: 'h-12 px-7 text-[0.8rem]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

// Internal locale-aware link
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={clsx(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

// External anchor (tel:, wa.me, mailto:, https)
export function ButtonAnchor({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps &
  { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
}

// Native button (forms, JS actions)
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
