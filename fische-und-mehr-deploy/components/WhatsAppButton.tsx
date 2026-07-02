import { useTranslations } from 'next-intl';
import { whatsappHref } from '@/lib/site';
import { clsx } from '@/lib/clsx';
import { WhatsApp } from '@/components/ui/icons';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] cursor-pointer transition-colors duration-200 ease-out focus-visible:outline-coral';

const variants = {
  primary: 'bg-sea-deep text-cream hover:bg-sea',
  secondary:
    'border border-sea-deep/30 text-sea-deep hover:border-sea-deep hover:bg-sea-deep hover:text-cream',
  onDark: 'border border-cream/30 text-cream hover:bg-cream hover:text-sea-deep',
} as const;

const sizes = {
  md: 'h-11 px-5',
  lg: 'h-12 px-7 text-[0.8rem]',
} as const;

/**
 * Opens WhatsApp with a friendly, locale-aware prefilled message.
 * `label` defaults to the short "WhatsApp" CTA; pass a custom one for section CTAs.
 */
export default function WhatsAppButton({
  label,
  variant = 'primary',
  size = 'md',
  className,
}: {
  label?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const t = useTranslations();
  const href = whatsappHref(t('whatsappPrefill'));

  // No shop WhatsApp number configured yet → render nothing.
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      <WhatsApp />
      {label ?? t('cta.whatsapp')}
    </a>
  );
}
