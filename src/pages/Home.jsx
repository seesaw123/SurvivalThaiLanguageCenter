import { Link } from 'react-router-dom';
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
            {Object.keys(LEVEL_BANDS).map((b) => (
              <article key={b} className={'course home-course home-band ' + b}>
                <span className="lv">{LEVEL_BANDS[b][lang]}</span>
                <div className="cl-chips">
                  {LEVELS.filter((l) => l.band === b).map((l) => <span key={l.code}>{l.code}</span>)}
                </div>
                <p>{h.bandBlurb[b]}</p>
                <div className="foot">{LEVELS.filter((l) => l.band === b).map((l) => l.name[lang]).join(' · ')}</div>
              </article>
            ))}
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

