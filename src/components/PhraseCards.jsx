import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { PHRASES } from '../data/content.js';
import { PhrasePicture } from './Icons.jsx';
import { SectionHead } from './Layout.jsx';

// Six survival phrases as 3D flip cards.
export default function PhraseCards() {
  const { t, lang, num } = useSettings();
  const h = t.home;
  const [flipped, setFlipped] = useState({});
  const count = Object.values(flipped).filter(Boolean).length;

  return (
    <section id="phrases">
      <div className="wrap">
        <SectionHead eyebrow={h.phE} title={h.phT} sub={h.phS}
          aside={<span className="counter" aria-live="polite">{h.flipped(count)}</span>} />
        <div className="grid3">
          {PHRASES.map((p, i) => {
            const on = !!flipped[i];
            return (
              <button key={p.th} type="button" className={'flip' + (on ? ' is-flipped' : '')} aria-pressed={on}
                aria-label={h.flipCard + p.rom} onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}>
                <div className="flip-in">
                  <div className="side front">
                    <div className="card-top">
                      <span className="num">{num('0' + (i + 1))}</span>
                      <span className="pico"><PhrasePicture name={p.pic} /></span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span className="th">{p.th}</span>
                      <span className="rom">{p.rom}</span>
                    </div>
                  </div>
                  <div className="side back">
                    <div className="card-top">
                      <span className="num">{h.means}</span>
                      <span className="pico back"><PhrasePicture name={p.pic} /></span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span className="en disp">{p.en[lang]}</span>
                      <span className="tip">{p.tip[lang]}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
