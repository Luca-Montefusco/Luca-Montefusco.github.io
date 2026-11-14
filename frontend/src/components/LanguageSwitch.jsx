import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { LANGUAGES } from '../i18n/languages.js';

export default function LanguageSwitch() {
  const { lang, t, pathFor } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="lang-switch" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          onClick={() =>
            navigate(pathFor(code) + window.location.hash, {
              replace: true,
              state: { keepScroll: true },
            })
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
