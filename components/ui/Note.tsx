import { clsx } from '@/lib/clsx';

/**
 * Renders a ⟦bracket⟧ placeholder note distinctly so it's obviously a TODO fact,
 * not real content (dashed coral border, mono). Hidden visual weight, easy to find.
 */
export default function Note({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        'rounded-sm border border-dashed border-coral/50 bg-coral/5 px-4 py-3 font-mono text-xs leading-relaxed text-grey-dark',
        className,
      )}
    >
      {children}
    </p>
  );
}
