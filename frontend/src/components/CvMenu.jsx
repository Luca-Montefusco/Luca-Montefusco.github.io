import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { CONTACTS } from '../data/projects.js';

/*
  Unico punto del sito da cui scaricare il CV.
  - Mouse: passandoci sopra si aprono le due versioni (IT / EN).
  - Touch e tastiera: click / Invio sul pulsante apre e chiude il menu,
    Esc lo chiude.
*/
export default function CvMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* Chiude il menu cliccando fuori */
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`cv-menu${open ? ' open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        className="btn"
        aria-expanded={open}
        aria-controls="cv-options"
        onClick={() => setOpen((v) => !v)}
      >
        {t('hero.ctaCv')}
        <svg className="cv-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div id="cv-options" className="cv-options" hidden={!open}>
        <div className="cv-list">
          <a href={CONTACTS.cvIt} download lang="it" onClick={() => setOpen(false)}>
            <span className="cv-flag">IT</span>
            {t('hero.cvIt')}
          </a>
          <a href={CONTACTS.cvEn} download lang="en" onClick={() => setOpen(false)}>
            <span className="cv-flag">EN</span>
            {t('hero.cvEn')}
          </a>
        </div>
      </div>
    </div>
  );
}
