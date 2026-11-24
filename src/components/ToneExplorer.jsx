import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { TONES } from '../data/content.js';
import './ToneExplorer.css';

const GRID_Y = [20, 62, 104, 146, 188];

// The five Thai tones, shown with five words that all sound like "khaaw".
// Picking a word shows how it is built (consonant class + tone mark) and draws its pitch line.
export default function ToneExplorer() {
  const { t, lang } = useSettings();
  const h = t.home;
  const [active, setActive] = useState(3);
  const tone = TONES[active];

  // Mark → tone pairs for each consonant class, derived from the data.
  const byClass = (cls) => TONES.filter((x) => x.cls === cls);

  return (
    <section className="band-dark tx" id="tones">
      <div className="wrap">
        <div className="tx-head">
          <span className="eyebrow">{h.toE}</span>
          <h2 className="disp h2">{h.toT}</h2>
          <p className="lead">{h.toS}</p>
        </div>

        <div className="tx-tiles" role="group" aria-label={h.toE}>
          {TONES.map((x, i) => (
            <button key={x.id} type="button" className="tx-tile" aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="w th">{x.word}</span>
              <span className="tn">{x.name[lang]}</span>
              <span className="r ipa">{x.rom}</span>
            </button>
          ))}
        </div>

        <div className="tx-stage">
          <div className="tx-build">
            <div className="tx-eq" aria-label={`${tone.cons} + ${tone.markName || h.toNoMark} + า + ว = ${tone.word}`}>
              <div className="part"><div className={'box th cons ' + tone.cls}>{tone.cons}</div><small>{h.toCls[tone.cls]}</small></div>
              <span className="op" aria-hidden="true">+</span>
              <div className="part"><div className="box th mark">{tone.mark ? '◌' + tone.mark : '—'}</div><small>{tone.markName || h.toNoMark}</small></div>
              <span className="op" aria-hidden="true">+</span>
              <div className="part"><div className="box th">า</div><small>{h.toVowel}</small></div>
              <span className="op" aria-hidden="true">+</span>
              <div className="part"><div className="box th">ว</div><small>{h.toFinal}</small></div>
              <span className="op" aria-hidden="true">=</span>
              <div className="part"><div className="box th result">{tone.word}</div><small>{tone.name[lang]}</small></div>
            </div>
            <div className="tx-rule">
              <b>{h.toRule}</b>
              {['low', 'high'].map((cls) => (
                <div key={cls} className="cls">
                  <span className={'chip ' + cls}><span className="th">{byClass(cls)[0].cons}</span>{h.toClsLetter[cls]}</span>
                  {byClass(cls).map((x) => (
                    <span key={x.id} className="pair">
                      {x.mark ? <span className="th mk">◌{x.mark}</span> : h.toNoMark} → <b>{x.name[lang]}</b>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="tx-card">
            <div className="tx-word">
              <span className="big th">{tone.word}</span>
              <div className="meta">
                <span className="tname"><i style={{ background: tone.color }} aria-hidden="true" />{tone.name[lang]}</span>
                <span className="rom ipa">{tone.rom}</span>
                <span className="mean">“{tone.mean.en}”<span className="my">{tone.mean.my}</span></span>
              </div>
            </div>
            <svg className="tx-chart" viewBox="0 0 520 210" role="img" aria-label={h.contour + tone.name[lang]}>
              {GRID_Y.map((y) => <line key={y} x1="40" y1={y} x2="510" y2={y} />)}
              <text x="0" y="24">{h.high}</text>
              <text x="0" y="192">{h.low}</text>
              {/* key forces a fresh element, so the line re-draws on every pick */}
              <path key={tone.id} d={tone.path} stroke={tone.color} pathLength="1" />
            </svg>
            <p className="tx-tip">{tone.desc[lang]}</p>
          </div>
        </div>

        <p className="twister">
          {h.twA} <span className="th">ใหม่ ไม้ ไหม้ ไม่ ไหม</span> — {h.twB}
        </p>
      </div>
    </section>
  );
}
