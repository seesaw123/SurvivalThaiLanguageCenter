import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { T } from '../data/i18n.js';
import { PALETTES } from '../data/content.js';
import { load, save, toMyDigits } from '../utils.js';

const SettingsContext = createContext(null);

const FADE_MS = 200;

export function SettingsProvider({ children }) {
  const [lang, setLangState] = useState(() => (load('lang', 'en') === 'my' ? 'my' : 'en'));
  // `target` moves the toggle pill instantly; `lang` swaps the text after the fade-out.
  const [target, setTarget] = useState(lang);
  const [fading, setFading] = useState(false);
  const [palette, setPaletteState] = useState(() => {
    const p = load('palette', 'teal');
    return PALETTES.some(([key]) => key === p) ? p : 'teal';
  });
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

  const setPalette = useCallback((p) => {
    setPaletteState(p);
    save('palette', p);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Apply language + palette to <html>/<body> so the CSS tokens switch.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-my', lang === 'my');
  }, [lang]);

  useEffect(() => {
    document.body.dataset.palette = palette;
  }, [palette]);

  const value = useMemo(
    () => ({
      lang,
      target,
      fading,
      palette,
      setLang,
      setPalette,
      t: T[lang],
      // Format numbers in the active language's digits.
      num: (n) => (lang === 'my' ? toMyDigits(n) : String(n)),
    }),
    [lang, target, fading, palette, setLang, setPalette]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
