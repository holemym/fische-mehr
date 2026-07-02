'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { locales, type Locale } from '@/i18n.routing';
import { clsx } from '@/lib/clsx';

const labels: Record<Locale, string> = { de: 'DE', en: 'EN', ru: 'RU', he: 'עב' };

export default function LanguageSwitcher({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active) return;
    // next-intl persists the choice via cookie; keep the current page.
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={clsx('flex items-center gap-1 font-mono text-xs', className)}
      role="group"
      aria-label="Sprache wählen"
    >
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className={onDark ? 'text-paper/30' : 'text-navy/25'}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-current={loc === active ? 'true' : undefined}
            className={clsx(
              'cursor-pointer px-1.5 py-1 tracking-[0.1em] transition-colors duration-150',
              loc === active
                ? 'text-coral'
                : onDark
                  ? 'text-paper/70 hover:text-paper'
                  : 'text-navy/60 hover:text-navy',
            )}
          >
            {labels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
