import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n.routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  // Disabled on purpose: `localeDetection: true` makes next-intl's middleware pull
  // in Next.js's bundled `ua-parser-js` (via `next/server`'s userAgent() helper) for
  // browser-based Accept-Language/UA detection. That module references `__dirname`,
  // which doesn't exist on Vercel's Edge Runtime and crashes middleware entirely
  // (ReferenceError: __dirname is not defined — see amannn/next-intl#603, a known
  // issue with this exact stack trace). Since `localePrefix: 'always'` means every
  // route always carries an explicit locale in the URL, auto-detection isn't load-
  // bearing here anyway: visiting `/` just redirects to `defaultLocale` ('de'),
  // and users can still switch language manually via LanguageSwitcher.
  localeDetection: false,
});

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
