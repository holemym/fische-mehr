/** Inline SVG icons (no emoji). Consistent 1.6 stroke, currentColor. */

import { clsx } from '@/lib/clsx';

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function ArrowRight({ className, ...props }: IconProps) {
  // "Forward" direction — mirrors automatically under dir="rtl" (Hebrew) so it
  // keeps pointing the reading-forward way instead of visually backward.
  return (
    <svg {...base} className={clsx('rtl:-scale-x-100', className)} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 4.5L9 9.5a12 12 0 0 0 5.5 5.5l2-2L21 14.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21l1.7-4.4A8 8 0 1 1 8 19.2L3 21Z" />
      <path d="M8.5 9c.3 2 2.5 4.2 4.5 4.5.6.1 1.2-.1 1.5-.6.2-.3.1-.7-.2-.9l-1.2-.7c-.3-.2-.6-.1-.8.1l-.3.3c-.8-.4-1.5-1.1-1.9-1.9l.3-.3c.2-.2.3-.5.1-.8L9.5 7.7c-.2-.3-.6-.4-.9-.2-.5.3-.7.9-.6 1.5Z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
