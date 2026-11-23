import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { COURSES } from '../data/content.js';
import { scrollToId } from '../utils.js';
import { ArrowIcon, PinIcon } from '../components/Icons.jsx';
import { SectionHead } from '../components/Layout.jsx';
import LetterCube from '../components/LetterCube.jsx';
import CultureCards from '../components/CultureCards.jsx';
import ToneExplorer from '../components/ToneExplorer.jsx';

export default function Home() {
  const { t, lang, num } = useSettings();
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
            {COURSES.map((k, i) => (
              <article key={k.name} className={'course home-course' + (i === 0 ? ' feat' : '')}>
                <span className="lv">{t.level}{num(i + 1)}</span>
                <h3 className="name">{k.name}</h3>
                <p>{k.desc[lang]}</p>
                <div className="foot"><span>{k.dur[lang]}</span><span>{k.price[lang]}</span></div>
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

