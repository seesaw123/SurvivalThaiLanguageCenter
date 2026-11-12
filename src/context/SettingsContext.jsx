import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { T } from '../data/i18n.js';
import { load, save, toMyDigits } from '../utils.js';

const SettingsContext = createContext(null);

const FADE_MS = 200;

export function SettingsProvider({ children }) {
  const [lang, setLangState] = useState(() => (load('lang', 'en') === 'my' ? 'my' : 'en'));
  // `target` moves the toggle pill instantly; `lang` swaps the text after the fade-out.
  const [target, setTarget] = useState(lang);
  const [fading, setFading] = useState(false);
  const timer = useRef(null);

  const setLang = useCallback(
    (next) => {
      setTarget(next);
      clearTimeout(timer.current);
      if (next === lang) {
        setFading(false);
        return;
      }
      setFading(true);
      timer.current = setTimeout(() => {
        setLangState(next);
        save('lang', next);
        requestAnimationFrame(() => setFading(false));
      }, FADE_MS);
    },
    [lang]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  // Apply the active language to <html>/<body>.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-my', lang === 'my');
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      target,
      fading,
      setLang,
      t: T[lang],
      // Format numbers in the active language's digits.
      num: (n) => (lang === 'my' ? toMyDigits(n) : String(n)),
    }),
    [lang, target, fading, setLang]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
