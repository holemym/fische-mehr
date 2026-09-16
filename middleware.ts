import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale, localePrefix } from './i18n.routing';
import { SITE } from './lib/site';

const intlMiddleware = createMiddleware({
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

// The canonical host (from SITE.url) that the site should be served on.
const canonicalHost = new URL(SITE.url).host; // www.fische-mehr.at

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  // Send the production *.vercel.app deployment URL to the real domain, so it's
  // never the URL Google indexes or a visitor lands on. Only the production alias
  // is caught — branch/preview deploys keep their own URL so they stay reviewable;
  // localhost and the custom domain pass straight through to the i18n middleware.
  if (host === 'fische-mehr.vercel.app') {
    const url = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      `https://${canonicalHost}`,
    );
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
