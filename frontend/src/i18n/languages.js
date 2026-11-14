import it from './locales/it.json';
import en from './locales/en.json';

/*
  Per aggiungere una lingua (es. giapponese):
  1. crea locales/ja.json copiando en.json e traducendo i testi
  2. importalo qui e aggiungilo a DICTIONARIES e LANGUAGES
  3. se serve, aggiungi un font CJK (es. Noto Sans JP) in index.html
*/
export const DICTIONARIES = { it, en };

export const LANGUAGES = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
];

export const DEFAULT_LANGUAGE = 'it';

export function isSupported(code) {
  return Object.prototype.hasOwnProperty.call(DICTIONARIES, code);
}

/* Prima visita: lingua del browser. Visite successive: la scelta salvata. */
export function detectLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && isSupported(saved)) return saved;
  } catch {
    /* localStorage non disponibile */
  }
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  return isSupported(browser) ? browser : DEFAULT_LANGUAGE;
}
