'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { clsx } from '@/lib/clsx';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = { name?: boolean; contact?: boolean; message?: boolean };

export default function ContactForm() {
  const t = useTranslations('kontakt.form');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Errors = {
      name: !String(data.get('name') ?? '').trim(),
      contact: !String(data.get('contact') ?? '').trim(),
      message: !String(data.get('message') ?? '').trim(),
    };
    setErrors(next);
    if (next.name || next.contact || next.message) {
      // Focus the first invalid field (a11y: focus-management on submit error).
      const firstInvalid = (['name', 'contact', 'message'] as const).find((k) => next[k]);
      if (firstInvalid) {
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      }
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const fieldBase =
    'mt-2 w-full rounded-sm border bg-paper px-4 py-3 text-navy placeholder:text-grey focus-visible:outline-coral transition-colors';

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-navy/15 bg-paper-soft p-8 text-navy"
      >
        <p className="font-display text-2xl tracking-tight">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.12em] text-navy">
          {t('name')} <span className="text-coral" aria-hidden>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={errors.name || undefined}
          className={clsx(fieldBase, errors.name ? 'border-coral' : 'border-navy/20')}
        />
        {errors.name && (
          <p role="alert" className="mt-1.5 text-sm text-coral">
            {t('required')}
          </p>
        )}
      </div>

      {/* Contact */}
      <div>
        <label htmlFor="contact" className="font-mono text-xs uppercase tracking-[0.12em] text-navy">
          {t('contact')} <span className="text-coral" aria-hidden>*</span>
        </label>
        <input
          id="contact"
          name="contact"
          type="text"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={errors.contact || undefined}
          className={clsx(fieldBase, errors.contact ? 'border-coral' : 'border-navy/20')}
        />
        {errors.contact && (
          <p role="alert" className="mt-1.5 text-sm text-coral">
            {t('required')}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.12em] text-navy">
          {t('message')} <span className="text-coral" aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={errors.message || undefined}
          className={clsx(fieldBase, 'resize-y', errors.message ? 'border-coral' : 'border-navy/20')}
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-sm text-coral">
            {t('required')}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? t('sending') : t('submit')}
        </Button>
      </div>

      {status === 'error' && (
        <p role="alert" aria-live="assertive" className="text-sm text-coral">
          {t('error')}
        </p>
      )}
    </form>
  );
}
