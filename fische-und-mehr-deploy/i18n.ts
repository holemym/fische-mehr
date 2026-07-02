import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './i18n.routing';

// This file is ONLY the next-intl request config (message loading). Locale
// constants live in i18n.routing.ts — import from there, not here, everywhere
// else (see that file's header comment for why: Edge Middleware compatibility).

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is the recommended API (next-intl >= 3.22).
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
