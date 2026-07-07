'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Wave from '@/components/ui/Wave';
import { FishMark } from '@/components/ui/Logo';
import BrandBackdrop from '@/components/ui/BrandBackdrop';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'invalid';

export default function FreshFishNotifier() {
  const t = useTranslations('notifier');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') ?? '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-sea-deep text-cream">
      {/* wave at the top, spilling from the previous (cream/foam) section */}
      <Wave fill="fill-foam" position="top" />
      <BrandBackdrop
        variant="fish"
        className="-bottom-12 right-4 h-56 w-56 text-sea-light/[0.06]"
      />

      <div className="container-page relative grid items-center gap-10 py-24 sm:py-28 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <FishMark className="h-6 w-auto text-sea-light" />
            <Eyebrow className="text-sand">{t('eyebrow')}</Eyebrow>
          </div>
          <SectionTitle size="md" className="mt-4 text-cream">
            {t('title')}
          </SectionTitle>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-cream/80">{t('body')}</p>
        </div>

        <div>
          {status === 'success' ? (
            <p
              role="status"
              aria-live="polite"
              className="rounded-sm border border-sea-light/30 bg-sea/20 p-6 font-display text-2xl tracking-tight text-cream"
            >
              {t('success')}
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {/* hidden context so the shop knows what this submission is */}
              <input type="hidden" name="_subject" value="Fisch-Alarm — neue Anmeldung über die Website" />
              <input type="hidden" name="form" value="fresh-fish-notifier" />
              <label htmlFor="notify-email" className="sr-only">
                {t('placeholder')}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="notify-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={t('placeholder')}
                  aria-invalid={status === 'invalid' || undefined}
                  className="h-12 flex-1 rounded-full border border-cream/25 bg-cream/10 px-5 text-cream placeholder:text-cream/50 focus-visible:outline-sea-light"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="h-12 shrink-0 cursor-pointer rounded-full bg-cream px-6 font-mono text-xs uppercase tracking-[0.12em] text-sea-deep transition-colors hover:bg-sea-light disabled:opacity-60"
                >
                  {status === 'sending' ? t('sending') : t('submit')}
                </button>
              </div>
              {status === 'invalid' && (
                <p role="alert" className="mt-2.5 text-sm text-sand">
                  {t('invalid')}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" aria-live="assertive" className="mt-2.5 text-sm text-sand">
                  {t('error')}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
