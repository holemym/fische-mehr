import { clsx } from '@/lib/clsx';

/**
 * Decorative wave divider — the ocean motif between sections.
 * `fill` is the colour of the section the wave belongs to (it "spills" into the next).
 * `position`: 'bottom' sits at the bottom edge of a section, 'top' at the top.
 */
export default function Wave({
  fill = 'fill-cream',
  position = 'bottom',
  flip = false,
  className,
}: {
  fill?: string;
  position?: 'top' | 'bottom';
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        'pointer-events-none absolute inset-x-0 z-10 leading-[0]',
        position === 'bottom' ? 'bottom-0' : 'top-0',
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={clsx(
          'block h-[6vw] min-h-[44px] w-full',
          fill,
          position === 'top' ? 'rotate-180' : '',
          flip ? 'scale-x-[-1]' : '',
        )}
      >
        <path d="M0,64 C240,128 480,16 720,48 C960,80 1200,128 1440,72 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}

/** A second, layered wave line for depth (thin stroke that rides above the fill). */
export function WaveLine({
  stroke = 'stroke-sea-light',
  className,
}: {
  stroke?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx('pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-[0]', className)}
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-[6vw] min-h-[44px] w-full">
        <path
          d="M0,52 C240,116 480,4 720,36 C960,68 1200,116 1440,60"
          fill="none"
          strokeWidth={2}
          className={clsx(stroke, 'opacity-40')}
        />
      </svg>
    </div>
  );
}
