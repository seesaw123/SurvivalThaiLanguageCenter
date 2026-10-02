import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { ORDER, PALETTES } from '../data/content.js';
import { ArrowIcon, ChevronDownIcon, ChevronIcon, CloseIcon, GlobeIcon, MenuIcon } from './Icons.jsx';

// ---- routing helpers -------------------------------------------------------
export const pathFor = (key) => (key === 'home' ? '/' : '/' + key);
export function usePageKey() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\//, '') || 'home';
  return ORDER.includes(key) ? key : 'home';
}

// ---- language toggle -------------------------------------------------------
function LanguageToggle() {
  const { target, setLang } = useSettings();
  return (
    <div className="lang" role="group" aria-label="Language / ဘာသာစကား" data-target={target}>
      <span className="globe"><GlobeIcon /></span>
      <div className="segs">
        <span className="pill" aria-hidden="true" />
        <button type="button" className="en" aria-pressed={target === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" className="mm" aria-pressed={target === 'my'} onClick={() => setLang('my')}>မြန်မာ</button>
      </div>
    </div>
  );
}

// ---- theme swatches --------------------------------------------------------
export function ThemeSwatches() {
  const { palette, setPalette, t } = useSettings();
  return (
    <div className="swatches" role="group" aria-label={t.theme}>
      {PALETTES.map(([key, label, dark, accent]) => (
        <button key={key} type="button" className="sw" aria-pressed={palette === key} aria-label={label} title={label}
          onClick={() => setPalette(key)}>
          <span style={{ background: `linear-gradient(135deg, ${dark} 0 50%, ${accent} 50% 100%)` }} />
        </button>
      ))}
    </div>
  );
}

// ---- header + dropdown menu ------------------------------------------------
export function Header() {
  const { t } = useSettings();
  const page = usePageKey();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => setOpen(false), [page]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className="site-head">
      <div className="wrap">
        <Link className="logo" to="/" aria-label="SurvivalThai home">
          <span className="logo-mark">ท</span>
          <span className="logo-word">SurvivalThai</span>
        </Link>
        <div className="head-tools">
          <LanguageToggle />
          <div className="menu-wrap" ref={wrapRef}>
            <button ref={btnRef} type="button" className="menu-btn" aria-expanded={open} aria-controls="menuPanel"
              onClick={() => setOpen((o) => !o)}>
              {open ? <CloseIcon /> : <MenuIcon />}
              <span className="lbl">{t.menu}</span>
            </button>
            {open && (
              <nav className="menu-panel" id="menuPanel" aria-label={t.menu}>
                {ORDER.map((key) => (
                  <Link key={key} className="item" to={pathFor(key)} aria-current={key === page ? 'page' : undefined}
                    onClick={() => setOpen(false)}>
                    <span>{t.pages[key]}</span><ChevronIcon />
                  </Link>
                ))}
                <Link className="btn btn-accent" to="/contact" onClick={() => setOpen(false)}>{t.cta}</Link>
                <div className="sw-row">
                  <span className="eyebrow" style={{ color: 'var(--muted)' }}>{t.theme}</span>
                  <ThemeSwatches />
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ---- footer ----------------------------------------------------------------
export function Footer() {
  const { t } = useSettings();
  const page = usePageKey();
  const next = ORDER[(ORDER.indexOf(page) + 1) % ORDER.length];
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-row">
          <span className="foot-brand">SurvivalThai <span className="th">ภาษาไทย</span></span>
          <Link className="btn btn-line next" to={pathFor(next)}>{t.next}{t.pages[next]}<ArrowIcon /></Link>
        </div>
        <div className="foot-row">
          <nav className="foot-links" aria-label="Site">
            {ORDER.map((key) => (
              <Link key={key} to={pathFor(key)} aria-current={key === page ? 'page' : undefined}>{t.pages[key]}</Link>
            ))}
          </nav>
          <div className="foot-theme"><span>{t.theme}</span><ThemeSwatches /></div>
        </div>
        <div className="foot-row"><span>{t.copy}</span></div>
      </div>
    </footer>
  );
}

// ---- shared page sections --------------------------------------------------
export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="band-dark page-hero">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="disp h1">{title}</h1>
        <p className="lead">{children}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  const { t } = useSettings();
  return (
    <section className="cta-sec">
      <div className="wrap">
        <div className="cta">
          <div>
            <h2 className="disp h2">{t.ctaTitle}</h2>
            <p>{t.ctaSub}</p>
          </div>
          <Link className="btn btn-accent" to="/contact">{t.cta}</Link>
        </div>
      </div>
    </section>
  );
}

export function FilterSelect({ id, label, value, onChange, options }) {
  return (
    <label className="sel-wrap" htmlFor={id}>
      <span className="sr">{label}</span>
      <select id={id} className="level-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDownIcon />
    </label>
  );
}

export function SectionHead({ eyebrow, title, sub, aside }) {
  return (
    <div className="sec-head">
      <div>
        <span className="eyebrow ac">{eyebrow}</span>
        <h2 className="disp h2">{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {aside}
    </div>
  );
}
