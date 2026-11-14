import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/*
  Il tema iniziale viene già impostato da uno script in index.html
  (evita il flash). Qui lo leggiamo e permettiamo di cambiarlo.
*/
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignora */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme va usato dentro ThemeProvider');
  return ctx;
}
