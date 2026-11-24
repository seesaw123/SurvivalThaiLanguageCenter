import { useEffect, useRef, useState } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// Renders a Cloudflare Turnstile widget into the returned ref and tracks its
// current token. The token is required by the submit-inquiry Edge Function,
// which verifies it with Cloudflare before writing anything to the database.
export function useTurnstile() {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState('');
  // Cloudflare error code when the widget fails (e.g. 110200 = this website's domain
  // isn't in the widget's hostname list), so the form can explain what happened.
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let pollId;

    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'dark',
        callback: (t) => { setToken(t); setError(''); },
        'expired-callback': () => setToken(''),
        'error-callback': (code) => { setToken(''); setError(String(code || 'unknown')); },
      });
    };

    if (window.turnstile) render();
    else pollId = setInterval(() => { if (window.turnstile) { clearInterval(pollId); render(); } }, 100);

    return () => {
      cancelled = true;
      clearInterval(pollId);
      if (widgetIdRef.current != null && window.turnstile) window.turnstile.remove(widgetIdRef.current);
    };
  }, []);

  const reset = () => {
    if (widgetIdRef.current != null && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    setToken('');
    setError('');
  };

  return { containerRef, token, error, reset };
}
