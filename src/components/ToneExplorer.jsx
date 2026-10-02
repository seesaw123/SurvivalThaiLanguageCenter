import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { TONES } from '../data/content.js';

const GRID_Y = [30, 65, 100, 135, 170];

// The five Thai tones with an animated pitch contour.
export default function ToneExplorer() {
  const { t, lang } = useSettings();
  const h = t.home;
  const [active, setActive] = useState(4);
  const tone = TONES[active];

  return (
    <section className="band-dark tones" id="tones">
      <div className="wrap">
        <div className="tones-left">
          <span className="eyebrow">{h.toE}</span>
          <h2 className="disp h2">{h.toT}</h2>
          <p className="lead">{h.toS}</p>
          <div className="tone-list">
            {TONES.map((x, i) => (
              <button key={x.word} type="button" className="tone-btn" aria-pressed={i === active} onClick={() => setActive(i)}>
                <span>{x.name[lang]}</span>
                <span className="th">{x.word}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="tone-card">
            <div className="tone-top">
              <span className="th">{tone.word}</span>
              <div className="meta">
                <span className="rom">{tone.rom}</span>
                <span className="muted">“{tone.mean[lang]}”</span>
              </div>
            </div>
            <svg className="contour" viewBox="0 0 400 200" width="100%" role="img" aria-label={h.contour + tone.name[lang]}>
              {GRID_Y.map((y) => <line key={y} x1="34" y1={y} x2="380" y2={y} stroke="var(--line)" strokeWidth="1" />)}
              <text x="0" y="34" fontSize="11" fill="var(--muted)">{h.high}</text>
              <text x="0" y="174" fontSize="11" fill="var(--muted)">{h.low}</text>
              <path d={tone.path} fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" />
            </svg>
            <p className="muted">{tone.desc[lang]}</p>
          </div>
          <p className="twister">
            {h.twA} <span className="th">ใหม่ ไม้ ไหม้ ไม่ ไหม</span> — {h.twB}
          </p>
        </div>
      </div>
    </section>
  );
}
