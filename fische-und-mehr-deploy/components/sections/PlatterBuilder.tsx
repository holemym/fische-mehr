'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Note from '@/components/ui/Note';
import { Button } from '@/components/ui/Button';
import { clsx } from '@/lib/clsx';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Occasion = 'shabbat' | 'holiday' | 'other';

const OCCASIONS: Occasion[] = ['shabbat', 'holiday', 'other'];

/**
 * Interactive fish-platter builder. No online payment — this composes a clear
 * summary of the request and sends it to the shop by e-mail (Formspree), as a
 * non-binding pre-order. Occasion + persons + item selection are all client
 * state; the assembled summary is what actually gets mailed.
 */
export default function PlatterBuilder() {
  const t = useTranslations('platter');
  const items = t.raw('items') as string[];

  const [occasion, setOccasion] = useState<Occasion>('shabbat');
  const [persons, setPersons] = useState(4);
  const [selected, setSelected] = useState<Set<string>>(new Set([items[0]]));
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: boolean; contact?: boolean }>({});

  const occasionLabel = (o: Occasion) =>
    o === 'shabbat' ? t('occasionShabbat') : o === 'holiday' ? t('occasionHoliday') : t('occasionOther');

  function toggleItem(item: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }

  const summary = useMemo(() => {
    const list = [...selected].join(', ') || '—';
    return `${occasionLabel(occasion)} · ${persons} ${t('personsLabel')} · ${list}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasion, persons, selected]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const contact = String(data.get('contact') ?? '').trim();

    const next = { name: !name, contact: !contact };
    setErrors(next);
    if (next.name || next.contact) {
      const firstInvalid = next.name ? 'name' : 'contact';
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Compose a clear, human-readable order summary as the email body.
    const date = String(data.get('date') ?? '') || '—';
    const notes = String(data.get('notes') ?? '').trim() || '—';
    data.set(
      'message',
      [
        `${t('summaryHeading')}`,
        `${t('occasionLabel')}: ${occasionLabel(occasion)}`,
        `${t('personsLabel')}: ${persons}`,
        `${t('selectionLabel')}: ${[...selected].join(', ') || '—'}`,
        `${t('dateLabel')}: ${date}`,
        `${t('notesLabel')}: ${notes}`,
      ].join('\n'),
    );
    data.set('_subject', t('summaryHeading'));
    data.set('form', 'platter-builder');

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
    'mt-2 w-full rounded-sm border bg-cream px-4 py-3 text-sea-deep placeholder:text-grey focus-visible:outline-sea transition-colors';

  return (
    <section className="bg-foam py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-grey-dark">
            {t('intro')}
          </p>
        </Reveal>

        <Reveal delay={70} className="mt-12">
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="max-w-xl rounded-sm border border-sea-deep/15 bg-cream p-8"
            >
              <p className="font-display text-2xl lowercase tracking-tight text-sea-deep">
                {t('success')}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
              {/* Builder */}
              <div className="space-y-8 rounded-sm border border-sea-deep/10 bg-cream p-6 sm:p-8">
                {/* Occasion */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep">
                    {t('occasionLabel')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {OCCASIONS.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setOccasion(o)}
                        aria-pressed={occasion === o}
                        className={clsx(
                          'cursor-pointer rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors',
                          occasion === o
                            ? 'bg-sea-deep text-cream'
                            : 'border border-sea-deep/20 text-sea-deep hover:border-sea-deep/50',
                        )}
                      >
                        {occasionLabel(o)}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="occasion" value={occasionLabel(occasion)} />
                </div>

                {/* Persons */}
                <div>
                  <label
                    htmlFor="persons"
                    className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep"
                  >
                    {t('personsLabel')}
                  </label>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setPersons((p) => Math.max(1, p - 1))}
                      aria-label="−"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-sea-deep/20 text-lg text-sea-deep transition-colors hover:border-sea-deep"
                    >
                      −
                    </button>
                    <span
                      id="persons"
                      className="min-w-[2ch] text-center font-display text-2xl text-sea-deep"
                    >
                      {persons}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPersons((p) => Math.min(30, p + 1))}
                      aria-label="+"
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-sea-deep/20 text-lg text-sea-deep transition-colors hover:border-sea-deep"
                    >
                      +
                    </button>
                    <input type="hidden" name="persons" value={persons} />
                  </div>
                </div>

                {/* Item selection */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep">
                    {t('selectionLabel')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => {
                      const active = selected.has(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleItem(item)}
                          aria-pressed={active}
                          className={clsx(
                            'cursor-pointer rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors',
                            active
                              ? 'bg-sea text-cream'
                              : 'border border-sea-deep/20 text-sea-deep hover:border-sea-deep/50',
                          )}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <Note className="mt-4">{t('selectionHint')}</Note>
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep"
                  >
                    {t('dateLabel')}
                  </label>
                  <input id="date" name="date" type="date" className={clsx(fieldBase, 'border-sea-deep/20')} />
                </div>
              </div>

              {/* Contact + summary + submit */}
              <div className="space-y-6">
                <div className="rounded-sm border border-sea-deep/10 bg-cream p-6 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep">
                    {t('summaryHeading')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-grey-dark">{summary}</p>
                </div>

                <div className="rounded-sm border border-sea-deep/10 bg-cream p-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep"
                    >
                      {t('nameLabel')} <span className="text-sea" aria-hidden>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={errors.name || undefined}
                      className={clsx(fieldBase, errors.name ? 'border-sea' : 'border-sea-deep/20')}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-sm text-sea">
                        {t('required')}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact"
                      className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep"
                    >
                      {t('contactLabel')} <span className="text-sea" aria-hidden>*</span>
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      autoComplete="email"
                      required
                      aria-invalid={errors.contact || undefined}
                      className={clsx(fieldBase, errors.contact ? 'border-sea' : 'border-sea-deep/20')}
                    />
                    {errors.contact && (
                      <p role="alert" className="mt-1.5 text-sm text-sea">
                        {t('required')}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="notes"
                      className="font-mono text-xs uppercase tracking-[0.12em] text-sea-deep"
                    >
                      {t('notesLabel')}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder={t('notesPlaceholder')}
                      className={clsx(fieldBase, 'resize-y border-sea-deep/20')}
                    />
                  </div>

                  <div className="mt-6">
                    <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full">
                      {status === 'sending' ? t('sending') : t('submit')}
                    </Button>
                  </div>

                  {status === 'error' && (
                    <p role="alert" aria-live="assertive" className="mt-3 text-sm text-sea">
                      {t('error')}
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
