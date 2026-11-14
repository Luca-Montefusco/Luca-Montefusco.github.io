import { createContext, useContext, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { DICTIONARIES, DEFAULT_LANGUAGE, LANGUAGES, isSupported } from './languages.js';
import Navbar from '../components/Navbar.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import ScrollManager from '../components/ScrollManager.jsx';
import NotFound from '../pages/NotFound.jsx';

const I18nContext = createContext(null);

/* Legge una chiave "a.b.c" dal dizionario. Se manca, mostra la chiave stessa. */
function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict) ?? key;
}

/* Aggiorna <html lang> e i tag hreflang per Google. */
function useDocumentLanguage(lang, pathname) {
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignora */
    }

    document.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove());
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    LANGUAGES.forEach(({ code }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = code;
      link.href = `${window.location.origin}/${code}${rest}`;
      link.dataset.hreflang = 'true';
      document.head.appendChild(link);
    });
  }, [lang, pathname]);
}

export function I18nLayout() {
  const { lang: param } = useParams();
  const { pathname } = useLocation();
  const supported = isSupported(param);
  const lang = supported ? param : DEFAULT_LANGUAGE;

  useDocumentLanguage(lang, pathname);

  const value = useMemo(() => {
    const dict = DICTIONARIES[lang];
    return {
      lang,
      t: (key) => lookup(dict, key),
      /* Percorso della pagina corrente in un'altra lingua */
      pathFor: (code) => pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${code}`),
      /* Link interni con il prefisso della lingua */
      to: (path = '') => `/${lang}${path}`,
    };
  }, [lang, pathname]);

  return (
    <I18nContext.Provider value={value}>
      <ScrollManager />
      <a className="skip-link" href="#contenuto">{value.t('nav.skip')}</a>
      <Navbar />
      {/* La chiave ignora il prefisso della lingua: cambiando lingua la pagina non viene ricreata */}
      <main id="contenuto" key={pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')} className="page-enter">
        {supported ? <Outlet /> : <NotFound />}
      </main>
      <SiteFooter />
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n va usato dentro I18nLayout');
  return ctx;
}
