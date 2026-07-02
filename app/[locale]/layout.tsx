import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Lora,
  Inter,
  Spline_Sans_Mono,
  Frank_Ruhl_Libre,
  Heebo,
} from 'next/font/google';
import { locales, isRtl, type Locale } from '@/i18n.routing';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTop from '@/components/ScrollTop';
import '../globals.css';

const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-inter',
});

const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Hebrew glyph coverage — Latin/Cyrillic render with Lora/Inter, Hebrew falls
// through to these (Lora/Inter have no Hebrew glyphs). Appended to the font stacks.
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-he-display',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-he-body',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a3354',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return {
    metadataBase: new URL(SITE.url),
    // Page titles from messages already embed the brand name (e.g. "Sortiment —
    // Fische & mehr"), so the template stays an identity pass-through.
    title: {
      default: t('title'),
      template: '%s',
    },
    description: t('description'),
    applicationName: SITE.name,
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    // We use explicit tel: links, so leave browser auto-linking off.
    formatDetection: { telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? 'rtl' : 'ltr'}
      className={`${lora.variable} ${inter.variable} ${mono.variable} ${frankRuhl.variable} ${heebo.variable}`}
    >
      <body className="min-h-dvh bg-paper text-navy">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ScrollTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
