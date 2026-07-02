import { Fragment } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Display heading. Lowercase as a deliberate device, Fraunces, tight tracking.
 * Supports `\n` in the text to render explicit line breaks.
 */
export default function SectionTitle({
  children,
  as: Tag = 'h2',
  size = 'lg',
  className,
}: {
  children: string;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizes: Record<string, string> = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl lg:text-[3.5rem]',
    xl: 'text-5xl sm:text-6xl lg:text-7xl',
  };

  const lines = children.split('\n');

  return (
    <Tag
      className={clsx(
        'font-display font-normal lowercase tracking-tight text-balance',
        'leading-[1.05]',
        sizes[size],
        className,
      )}
    >
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </Tag>
  );
}
