'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { clsx } from '@/lib/clsx';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Menu, Close, Pin } from '@/components/ui/icons';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/sortiment', key: 'sortiment' },
  { href: '/ueber-uns', key: 'ueberUns' },
  { href: '/kontakt', key: 'kontakt' },
] as const;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the overlay on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
    <header
      className={clsx(
        'sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-sea-deep/10 bg-cream/85 backdrop-blur-md'
          : 'border-b border-transparent bg-cream',
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-sea-deep"
          aria-label={`${t('brand.name')} — ${t('nav.home')}`}
        >
          <Image
            src="/images/logo-badge.webp"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9 rounded-sm"
          />
          <span className="font-display text-lg lowercase tracking-tight">
            fische <span className="text-sea-light">&amp;</span> mehr
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Hauptnavigation"
        >
          {NAV.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={clsx(
                'group relative font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-150',
                isActive(href) ? 'text-sea-deep' : 'text-sea-deep/55 hover:text-sea-deep',
              )}
            >
              {t(`nav.${key}`)}
              <span
                className={clsx(
                  'absolute -bottom-1.5 start-0 h-px bg-sea transition-all duration-300',
                  isActive(href) ? 'w-full' : 'w-0 group-hover:w-full',
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <LanguageSwitcher />
          <Link
            href="/kontakt"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-sea-deep px-5 font-mono text-xs uppercase tracking-[0.12em] text-cream transition-colors duration-200 hover:bg-sea"
          >
            <Pin />
            {t('cta.visit')}
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-sea-deep md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t('nav.close') : t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
        </button>
      </div>
    </header>

      {/* Mobile full-screen overlay — rendered as a sibling of <header> (not a
          child) so its `fixed` positioning is not trapped in the header's
          backdrop-filter containing block once the header gets backdrop-blur on
          scroll. That trapping is what broke the menu after scrolling on mobile. */}
      <div
        id="mobile-menu"
        className={clsx(
          'fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-sea-deep text-cream md:hidden',
          'transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="container-page flex min-h-full flex-col justify-between py-10">
          <nav className="flex flex-col gap-1" aria-label="Hauptnavigation mobil">
            {NAV.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={clsx(
                  'font-display text-4xl lowercase tracking-tight transition-colors',
                  isActive(href) ? 'text-sea-light' : 'text-cream hover:text-sea-light',
                )}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between gap-4 border-t border-cream/15 pt-8">
            <LanguageSwitcher onDark />
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/40 px-5 font-mono text-xs uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cream hover:text-sea-deep"
            >
              <Pin />
              {t('cta.visit')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
