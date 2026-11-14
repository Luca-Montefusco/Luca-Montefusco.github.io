import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  Al cambio pagina torna in cima; se l'URL ha un'ancora (#about, #contatti)
  scorre fino alla sezione.
  Eccezione: il cambio lingua passa state.keepScroll e la pagina resta
  esattamente dov'era (come per il cambio tema).
*/
export default function ScrollManager() {
  const { pathname, hash, state } = useLocation();
  const keepScroll = Boolean(state && state.keepScroll);

  useEffect(() => {
    if (keepScroll) return;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash, keepScroll]);

  return null;
}
