import { Link } from '../components/Link.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { LEVEL_BANDS, LEVELS } from '../data/content.js';
import { scrollToId } from '../utils.js';
import { ArrowIcon, PinIcon } from '../components/Icons.jsx';
import { SectionHead } from '../components/Layout.jsx';
import LetterCube from '../components/LetterCube.jsx';
import CultureCards from '../components/CultureCards.jsx';
import ToneExplorer from '../components/ToneExplorer.jsx';

export default function Home() {
  const { t, lang } = useSettings();
  const h = t.home;

  return (
    <>
      <section className="band-dark hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <PinIcon />{h.eyebrow}
            </span>
            <h1 className="disp h1">{h.title}</h1>
            <p className="lead">{h.sub}</p>
            <div className="row">
              <Link className="btn btn-accent" to="/contact">{t.cta}</Link>
              <button type="button" className="btn btn-line" onClick={() => scrollToId('phrases')}>{h.cta2}</button>
            </div>
          </div>
          <LetterCube />
        </div>
      </section>

      <CultureCards />
      <ToneExplorer />

      <section id="courses-home">
        <div className="wrap">
          <SectionHead eyebrow={h.coE} title={h.coT} />
          <div className="grid3">
            {Object.keys(LEVEL_BANDS).map((b) => {
              const levels = LEVELS.filter((l) => l.band === b);
              return (
                <article key={b} className={'home-band ' + b}>
                  <div className="hb-head">
                    <span className="hb-band">{LEVEL_BANDS[b][lang]}</span>
                    <span className="hb-count">{h.lvCount(levels.length)}</span>
                  </div>
                  <p className="hb-blurb">{h.bandBlurb[b]}</p>
                  <ul className="hb-levels">
                    {/* U+2011 keeps hyphenated names (Pre-Intermediate) on one line */}
                    {levels.map((l) => <li key={l.code}><span className="hb-code">{l.code}</span><span className="hb-name">{l.name[lang].replace(/-/g, '\u2011')}</span></li>)}
                  </ul>
                  <Link className="hb-more" to="/courses">{h.seeBand(LEVEL_BANDS[b][lang])}<ArrowIcon /></Link>
                </article>
              );
            })}
          </div>
          <div className="row after-grid">
            <Link className="btn btn-ink" to="/courses">{h.seeSched}<ArrowIcon /></Link>
            <Link className="btn btn-line" to="/teachers">{h.meet}<ArrowIcon /></Link>
          </div>
        </div>
      </section>

    </>
  );
}

