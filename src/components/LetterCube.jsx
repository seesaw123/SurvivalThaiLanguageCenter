import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { ALPHABET, CUBE_FACES } from '../data/content.js';
import { DiceIcon, NextIcon, PrevIcon } from './Icons.jsx';

const REST_TILT = { x: -14, y: 22 };

// Deals 6 random, non-repeating consonants from the full 44-letter alphabet onto the cube's faces.
function dealLetters() {
  const pool = [...ALPHABET];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return CUBE_FACES.map((geom, i) => ({ ...pool[i], ...geom }));
}

// 3D cube with six Thai consonants dealt at random from all 44. Tilts with the pointer;
// chips rotate to a face; rolling redeals a fresh set of six.
export default function LetterCube() {
  const { t, lang } = useSettings();
  const h = t.home;
  const [letters, setLetters] = useState(dealLetters);
  const [face, setFace] = useState(0);
  const [tilt, setTilt] = useState(REST_TILT);
  const cur = letters[face];

  const roll = () => {
    setLetters(dealLetters());
    setFace(0);
  };

  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - r.top) / r.height - 0.5) * 30,
      y: ((e.clientX - r.left) / r.width - 0.5) * 44,
    });
  };

  const step = (d) => setFace((f) => (f + d + letters.length) % letters.length);

  return (
    <div className="cube-side">
      <div className="stage" onPointerMove={onMove} onPointerLeave={() => setTilt(REST_TILT)}>
        <div className="float">
          <div className="cube" style={{ transform: `rotateX(${cur.x + tilt.x}deg) rotateY(${cur.y + tilt.y}deg)` }}>
            {letters.map((l, i) => (
              <div key={l.g} className={'face' + (i === face ? ' on' : '')}
                style={{ transform: `${l.face} translateZ(calc(var(--cube) / 2))` }}>
                <b>{l.g}</b>
                <small>{l.name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chips">
        <button type="button" className="chip-btn round" aria-label={h.prev} onClick={() => step(-1)}><PrevIcon /></button>
        {letters.map((l, i) => (
          <button key={l.g} type="button" className="chip-btn" aria-pressed={i === face} aria-label={h.show + l.name}
            onClick={() => setFace(i)}>
            {l.g}
          </button>
        ))}
        <button type="button" className="chip-btn round" aria-label={h.nextL} onClick={() => step(1)}><NextIcon /></button>
      </div>

      <button type="button" className="btn btn-line roll-btn" onClick={roll}>
        <DiceIcon />{h.roll}
      </button>

      <p className="cube-cap">
        <span className="th">{cur.word}</span>
        {h.capA}{cur.mean[lang]}{h.capB}
      </p>
    </div>
  );
}
