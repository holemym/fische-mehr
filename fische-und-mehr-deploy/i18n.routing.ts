/**
 * Pure locale/routing constants — NO next-intl/server import here on purpose.
 *
 * middleware.ts always runs on Vercel's Edge Runtime, which has no Node.js globals
 * (no __dirname, no fs, etc). i18n.ts's `getRequestConfig()` (message loading via a
 * dynamic `import()`) drags Node-ish resolution code into whatever bundles import
 * it — if middleware.ts imports locale constants from i18n.ts, that whole chain
 * gets bundled into the Edge Middleware and fails at runtime with
 * `ReferenceError: __dirname is not defined`.
 *
 * Keep this file import-only-constants, forever. Everything that needs locales
 * (middleware, navigation, layout, sitemap, JSON-LD, language switcher, SEO) should
 * import from HERE, not from i18n.ts. i18n.ts imports from this file, not the
 * other way around.
 */

export const locales = ['de', 'en', 'ru', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

// Right-to-left locales (Hebrew).
export const rtlLocales: Locale[] = ['he'];
export const isRtl = (locale: string) => rtlLocales.includes(locale as Locale);

// Route segments stay German across all locales (per spec).
export const localePrefix = 'always' as const;
