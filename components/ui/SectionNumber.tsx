import { clsx } from '@/lib/clsx';

/**
 * STC-style numbered section anchor: large faded Fraunces numeral + total,
 * used as an architectural marker beside section eyebrows. e.g. 02 / 05
 */
export default function SectionNumber({
  index,
  total = 5,
  onDark = false,
  className,
}: {
  index: number;
  total?: number;
  onDark?: boolean;
  className?: string;
}) {
  const n = String(index).padStart(2, '0');
  const t = String(total).padStart(2, '0');
  return (
    <span
      className={clsx(
        'inline-flex items-baseline gap-1 font-mono text-xs tracking-[0.1em]',
        onDark ? 'text-sea-light/80' : 'text-sea/70',
        className,
      )}
      aria-hidden
    >
      <span className="font-display text-base font-light not-italic">{n}</span>
      <span className={onDark ? 'text-cream/35' : 'text-grey/60'}>/ {t}</span>
    </span>
  );
}
