import { useI18n } from '../i18n/I18nContext.jsx';

/* Nastro scorrevole con le aree di lavoro (testi in locales: "marquee"). */
export default function Marquee() {
  const { t } = useI18n();
  const words = t('marquee');
  const list = Array.isArray(words) ? words : [];
  /* Lista duplicata: l'animazione scorre del 50% e riparte senza salti */
  const loop = [...list, ...list, ...list, ...list];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((word, i) => (
          <span key={i} className="marquee-item">
            {word}
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0 L12.5 7.5 L20 10 L12.5 12.5 L10 20 L7.5 12.5 L0 10 L7.5 7.5 Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
