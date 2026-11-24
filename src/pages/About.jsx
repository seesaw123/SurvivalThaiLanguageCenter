import { useSettings } from '../context/SettingsContext.jsx';
import { Link } from '../components/Link.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { ABOUT } from '../data/about.js';
import { LEVELS } from '../data/content.js';
import logoMark from '../assets/brand/logo-mark.svg';
import './About.css';

// Line icons for the founder timeline (navy strokes on the coloured squares).
const TL_ICONS = {
  degree: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.2V16c0 1.3 2.7 3 6 3s6-1.7 6-3v-4.8" /><path d="M22 9v5" /></>,
  award: <><circle cx="12" cy="9" r="6" /><path d="M9 14.5 7.5 22l4.5-2.5 4.5 2.5L15 14.5" /><path d="m12 6.3.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.4l2-.3z" /></>,
  study: <><path d="M2 5.5C4.5 4.3 7.8 4.2 12 6.5c4.2-2.3 7.5-2.2 10-1v13c-2.5-1.2-5.8-1.1-10 1.2-4.2-2.3-7.5-2.4-10-1.2z" /><path d="M12 6.5v13" /></>,
};
const TimelineIcon = ({ name }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TL_ICONS[name]}</svg>
);

export default function About() {
  const { lang } = useSettings();
  const a = ABOUT[lang];

  return (
    <>
      {/* Our story */}
      <section className="ab-hero">
        <img className="ab-watermark" src={logoMark} alt="" aria-hidden="true" />
        <div className="wrap">
          <span className="eyebrow ac">{a.eyebrow}</span>
          <h1 className="disp ab-title">{a.titleA} <em>{a.titleB}</em></h1>
          <div className="ab-intro">
            <p className="ab-story">{a.story}</p>
            <div className="ab-for">
              <small>{a.forT}</small>
              {a.forList.map((w) => <span key={w}><i aria-hidden="true" />{w}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="band-dark ab-founder">
        <div className="wrap">
          <div>
            <span className="eyebrow">{a.founderE}</span>
            <blockquote className="disp">{a.quoteA} <em>{a.quoteB}</em></blockquote>
            <p className="ab-founder-body">{a.founder}</p>
          </div>
          <ol className="ab-timeline">
            {a.timeline.map((x, i) => (
              <li key={x.b} className={'step-' + (i + 1) + (x.now ? ' now' : '')}>
                <span className="node" aria-hidden="true"><TimelineIcon name={x.icon} /></span>
                <div className="card">
                  <div className="top"><small>{x.k}</small>{x.now && <span className="live"><i aria-hidden="true" />{a.inProgress}</span>}</div>
                  <b>{x.b}</b>
                  <span>{x.s}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we teach */}
      <section className="ab-teach">
        <div className="wrap">
          <span className="eyebrow ac">{a.teachE}</span>
          <h2 className="disp h2">{a.teachT}</h2>
          <ol className="ab-journey">
            {LEVELS.map((l) => <li key={l.code}><b>{l.code}</b><span>{l.name[lang]}</span></li>)}
          </ol>
          <div className="ab-langnote"><span>{a.langFrom}</span><span>{a.langTo}</span></div>
          <div className="ab-cols">
            <p>{a.teach}</p>
            <ol className="ab-promises">
              {a.promises.map((x, i) => <li key={x}><i>{String(i + 1).padStart(2, '0')}</i>{x}</li>)}
            </ol>
          </div>
        </div>
      </section>

      {/* Logo meaning */}
      <section className="ab-logo">
        <div className="wrap">
          <div className="ab-anat" aria-hidden="true">
            <img src={logoMark} alt="" />
            <span className="pin" style={{ left: '6%', top: '30%' }}>1</span>
            <span className="pin" style={{ left: '80%', top: '8%' }}>2</span>
            <span className="pin" style={{ left: '84%', top: '70%' }}>3</span>
          </div>
          <div>
            <span className="eyebrow ac">{a.logoE}</span>
            <h2 className="disp h2">{a.logoT}</h2>
            <p className="ab-logo-lead">{a.logoLead}</p>
            <ol className="ab-parts">
              {a.logoParts.map((x, i) => (
                <li key={x.b}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <b>{x.b}{x.colors && <span className="sw" aria-hidden="true"><i style={{ background: '#FF7A59' }} /><i style={{ background: '#1A1B3F' }} /></span>}</b>
                    <p>{x.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="ab-close">
        <div className="wrap">
          <p className="disp">{a.close}</p>
          <div className="row">
            <Link className="btn btn-accent" to="/courses">{a.seeCourses}<ArrowIcon /></Link>
            <Link className="btn btn-line" to="/contact">{a.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
