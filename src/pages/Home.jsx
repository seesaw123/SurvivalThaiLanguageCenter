import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { COURSES } from '../data/content.js';
import { scrollToId } from '../utils.js';
import { ArrowIcon, PinIcon } from '../components/Icons.jsx';
import { SectionHead } from '../components/Layout.jsx';
import LetterCube from '../components/LetterCube.jsx';
import PhraseCards from '../components/PhraseCards.jsx';
import ToneExplorer from '../components/ToneExplorer.jsx';
import { TrialForm } from '../components/Forms.jsx';

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
            <p className="hero-thai">พูดไทยได้ตั้งแต่วันแรก</p>
            <p className="lead">{h.sub}</p>
            <div className="row">
              <button type="button" className="btn btn-accent" onClick={() => scrollToId('book')}>{t.cta}</button>
              <button type="button" className="btn btn-line" onClick={() => scrollToId('phrases')}>{h.cta2}</button>
            </div>
          </div>
          <LetterCube />
        </div>
      </section>

      <PhraseCards />
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

      <section id="book" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="book">
            <div className="book-copy">
              <h2 className="disp h2">{h.bkT}</h2>
              <p className="lead">{h.bkS}</p>
              <Link className="link-u" to="/faq">{h.faqLink}</Link>
              <div className="contact"><span>[ADDRESS]</span><span>LINE: [LINE ID] · [EMAIL]</span></div>
            </div>
            <div><TrialForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
