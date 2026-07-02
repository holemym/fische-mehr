import { useTranslations } from 'next-intl';

/**
 * Slim, shop-editable "fresh today" strip. Not a data feed — just the
 * `todayFresh.items` array in messages/*.json, meant for the owner to update by
 * hand every so often (swap the array, redeploy). Quiet, one line, no chrome.
 */
export default function TodayFresh() {
  const t = useTranslations('todayFresh');
  const items = t.raw('items') as string[];

  return (
    <div className="border-b border-sea-deep/10 bg-sand/15">
      <div className="container-page flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
          {t('label')}
        </span>
        <span className="text-sea-deep/30" aria-hidden>
          ·
        </span>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-grey-dark">
          {items.join(' · ')}
        </p>
      </div>
    </div>
  );
}
