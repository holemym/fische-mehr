import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from './i18n.routing';

// Locale-aware <Link>, redirect, usePathname, useRouter.
// Route segments are shared (German) across all locales.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
