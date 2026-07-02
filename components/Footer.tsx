import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/site';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import { Pin } from '@/components/ui/icons';

const NAV = [
  { href: '/', key: 'home' },
  { href: '/sortiment', key: 'sortiment' },
  { href: '/ueber-uns', key: 'ueberUns' },
  { href: '/kontakt', key: 'kontakt' },
] as const;

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative overflow-hidden bg-sea-deep text-cream">
      <BrandBackdrop
        variant="fish"
        className="-right-4 top-1/2 h-52 w-52 -translate-y-1/2 text-sea-light/[0.06] sm:h-60 sm:w-60"
      />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        {/* Brand + address/hours */}
        <div>
          <span className="inline-flex items-center gap-3 text-cream">
            <Image
              src="/images/logo-badge.webp"
              alt=""
              width={48}
              height={48}
              className="h-11 w-11 rounded-sm"
            />
            <span className="font-display text-2xl lowercase tracking-tight">
              fische <span className="text-sea-light">&amp;</span> mehr
            </span>
          </span>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-sand">
            {t('brand.tagline')}
          </p>

          <div className="mt-8 space-y-5 text-sm text-cream/80">
            <div>
              <p className="eyebrow text-sand">{t('footer.address')}</p>
              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-start gap-2 transition-colors hover:text-cream"
              >
                <Pin className="mt-0.5 shrink-0 text-sea-light" />
                {t('config.address')}
              </a>
            </div>
            <div>
              <p className="eyebrow text-sand">{t('footer.hours')}</p>
              <p className="mt-1.5 leading-relaxed">
                {t('config.hoursWeekday')}
                <br />
                {t('config.hoursFriday')}
                <br />
                {t('config.hoursWeekend')}
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav aria-label="Footernavigation">
          <p className="eyebrow text-sand">{t('nav.menu')}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-cream/80 transition-colors duration-150 hover:text-cream"
                >
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="eyebrow text-sand">{t('footer.contact')}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
            <li>
              <a href={SITE.phoneHref} className="transition-colors hover:text-cream">
                {t('kontakt.phone.title')}: {t('config.phone')}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="break-all transition-colors hover:text-cream"
              >
                {t('config.email')}
              </a>
            </li>
            <li>{t('config.transit')}</li>
          </ul>
          <div className="mt-8">
            <LanguageSwitcher onDark />
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-cream/12">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6 font-mono uppercase tracking-[0.1em]">
            <Link href="/impressum" className="transition-colors hover:text-cream">
              {t('footer.impressum')}
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-cream">
              {t('footer.datenschutz')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
