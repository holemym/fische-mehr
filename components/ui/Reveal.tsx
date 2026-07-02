'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * Scroll-reveal wrapper: fade + slight translate-y when it enters the viewport.
 * One motion per section. Honors prefers-reduced-motion (renders visible, no transform).
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'li' | 'article' | 'figure';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={clsx(
        'transition-[opacity,transform] duration-700 ease-out-soft motion-reduce:transition-none',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
