import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { TONE_MARK_NONE, TONES } from '../data/content.js';
import './ToneExplorer.css';

// Teacher recordings: src/assets/tones/paa-<id>.mp3 (see the README there).
// Any file found at build time is used; otherwise the browser's Thai voice speaks.
const FILES = import.meta.glob('../assets/tones/*.{mp3,m4a,wav,ogg,webm}', { eager: true, query: '?url', import: 'default' });
const RECORDING = Object.fromEntries(
  Object.entries(FILES).map(([path, url]) => [path.split('/').pop().replace(/^paa-|\.\w+$/g, ''), url]),
);

const GRID_Y = [20, 62, 104, 146, 188];

function useThaiVoice() {
  const [voice, setVoice] = useState(null);
  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined;
    const pick = () => setVoice(window.speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith('th')) || null);
    pick();
    window.speechSynthesis.addEventListener?.('voiceschanged', pick);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', pick);
  }, []);
  return voice;
}

export default function ToneExplorer() {
  const { t, lang } = useSettings();
  const h = t.home;
  const [mode, setMode] = useState('learn');
  const [active, setActive] = useState(4);
  const [dot, setDot] = useState(null);
  const pathRefs = useRef([]);
  const audioRef = useRef(null);
  const animRef = useRef(0);
  const voice = useThaiVoice();
  const allRecorded = TONES.every((x) => RECORDING[x.id]);
  const canPlay = allRecorded || !!voice;

  // quiz state
  const [target, setTarget] = useState(() => Math.floor(Math.random() * TONES.length));
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  useEffect(() => () => { cancelAnimationFrame(animRef.current); audioRef.current?.pause(); }, []);

  // Moves a dot along the selected pitch contour for `ms` milliseconds.
  const animate = (i, ms) => {
    cancelAnimationFrame(animRef.current);
    const path = pathRefs.current[i];
    if (!path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const len = path.getTotalLength();
    let start;
    const step = (ts) => {
      start ??= ts;
      const k = Math.min((ts - start) / ms, 1);
      const p = path.getPointAtLength(len * k);
      setDot({ x: p.x, y: p.y });
      if (k < 1) animRef.current = requestAnimationFrame(step);
      else setTimeout(() => setDot(null), 350);
    };
    animRef.current = requestAnimationFrame(step);
  };

  // Plays tone i (recording if available, else built-in Thai voice); optional dot animation.
  const play = (i, withDot = true) => {
    const x = TONES[i];
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    if (RECORDING[x.id]) {
      const a = new Audio(RECORDING[x.id]);
      audioRef.current = a;
      a.addEventListener('loadedmetadata', () => withDot && animate(i, Math.max(500, (a.duration || 0.9) * 1000)), { once: true });
      a.play().catch(() => {});
    } else if (voice) {
      const u = new SpeechSynthesisUtterance(x.word);
      u.voice = voice; u.lang = voice.lang; u.rate = 0.7;
      window.speechSynthesis.speak(u);
      if (withDot) animate(i, 900);
    } else if (withDot) {
      animate(i, 900);
    }
  };

  const choose = (i) => { setActive(i); play(i); };

  const pick = (i) => {
    if (answer !== null) return;
    setAnswer(i);
    setScore((s) => ({ right: s.right + (i === target ? 1 : 0), total: s.total + 1 }));
  };
  const next = () => {
    let n;
    do { n = Math.floor(Math.random() * TONES.length); } while (n === target && TONES.length > 1);
    setTarget(n); setAnswer(null);
    play(n, false);
  };

  const tone = TONES[active];
  const tgt = TONES[target];

  return (
    <section className={'band-dark tx' + (mode === 'quiz' ? ' is-quiz' : '')} id="tones">
      <div className="wrap">
        <div className="tx-head">
          <div>
            <span className="eyebrow">{h.toE}</span>
            <h2 className="disp h2">{h.toT}</h2>
            <p className="lead">{h.toS}</p>
          </div>
          <div className="tx-mode" role="group">
            <button type="button" aria-pressed={mode === 'learn'} onClick={() => setMode('learn')}>{h.toLearn}</button>
            <button type="button" aria-pressed={mode === 'quiz'} onClick={() => setMode('quiz')}>🎧 {h.toQuiz}</button>
          </div>
        </div>

        <div className="tx-marks" role="group" aria-label={h.toE}>
          {TONES.map((x, i) => (
            <button key={x.id} type="button" className="tx-mk" aria-pressed={mode === 'learn' && i === active}
              onClick={() => (mode === 'learn' ? choose(i) : play(i, false))} aria-label={`${h.toPlayW}${x.word} · ${x.name[lang]}`}>
              <span className="sym th" aria-hidden="true">◌{x.mark}</span>
              <span className="name">{x.markName || TONE_MARK_NONE[lang]}</span>
              <span className="tn">{x.name[lang]}</span>
            </button>
          ))}
        </div>

        <div className="tx-stage">
          <div className="tx-build">
            <div className="tx-eq" aria-label={`ป + ${tone.markName || TONE_MARK_NONE[lang]} + า = ${tone.word}`}>
              <div className="part"><div className="box th">ป</div><small>{h.toLetter}</small></div>
              <span className="op" aria-hidden="true">+</span>
              <div className="part"><div className="box mark th">{tone.mark ? '◌' + tone.mark : '—'}</div><small>{tone.markName || TONE_MARK_NONE[lang]}</small></div>
              <span className="op" aria-hidden="true">+</span>
              <div className="part"><div className="box th">า</div><small>{h.toVowel}</small></div>
              <span className="op" aria-hidden="true">=</span>
              <div className="part"><div className="box result th">{tone.word}</div><small>{tone.name[lang]}</small></div>
            </div>
            <div className="tx-words">
              {TONES.map((x, i) => (
                <button key={x.id} type="button" className="tx-w" aria-pressed={mode === 'learn' && i === active}
                  onClick={() => (mode === 'learn' ? choose(i) : play(i, false))}>
                  <span className="th">{x.word}</span><span>{x.name[lang]}</span>
                </button>
              ))}
            </div>
            <p className="tx-rule">
              <b>{h.toRuleA}</b> {h.toRuleB}
              <span className="pairs">
                {TONES.map((x) => (
                  <span key={x.id} className="pair">
                    {x.mark ? <span className="th mk">◌{x.mark}</span> : TONE_MARK_NONE[lang]} → <b>{x.name[lang]}</b>
                  </span>
                ))}
              </span>
            </p>
          </div>

          {mode === 'learn' ? (
            <div className="tx-card">
              <div className="tx-word">
                <span className="tname"><i style={{ background: tone.color }} aria-hidden="true" />{tone.name[lang]}</span>
                <div className="meta">
                  <span className="rom">{tone.rom}</span>
                  <span className="mean">“{tone.mean[lang]}”</span>
                </div>
              </div>
              <button type="button" className="tx-hear" onClick={() => play(active)} disabled={!canPlay}>
                <span className="ring" aria-hidden="true">▶</span>{h.toHear}
              </button>
              <svg className="tx-chart" viewBox="0 0 520 210" role="img" aria-label={h.contour + tone.name[lang]}>
                {GRID_Y.map((y) => <line key={y} x1="40" y1={y} x2="510" y2={y} />)}
                <text x="0" y="24">{h.high}</text>
                <text x="0" y="192">{h.low}</text>
                {TONES.map((x, i) => (
                  <path key={x.id} ref={(el) => { pathRefs.current[i] = el; }} d={x.path} stroke={x.color} className={i === active ? 'on' : ''} />
                ))}
                {dot && <circle cx={dot.x} cy={dot.y} r="9" fill="var(--ink)" />}
              </svg>
              <p className="tx-tip">{tone.desc[lang]}</p>
              {!canPlay && <p className="tx-note">{h.toNoAudio}</p>}
            </div>
          ) : (
            <div className="tx-card tx-quiz">
              <span className="tx-score">{h.toScore(score.right, score.total)}</span>
              <button type="button" className="tx-speaker" onClick={() => play(target, false)} aria-label={h.toPlayQ} disabled={!canPlay}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
              </button>
              <p className="tx-ask">{canPlay ? h.toAsk : h.toNoAudio}</p>
              <div className="tx-opts">
                {TONES.map((x, i) => (
                  <button key={x.id} type="button" disabled={!canPlay}
                    className={answer === null ? '' : i === target ? 'right' : i === answer ? 'wrong' : ''}
                    onClick={() => pick(i)}>{x.name[lang]}</button>
                ))}
              </div>
              <p className="tx-fb" aria-live="polite">
                {answer === null ? '' : answer === target
                  ? '✅ ' + h.toRight(tgt.word, tgt.rom, tgt.mean[lang])
                  : '❌ ' + h.toWrong(tgt.name[lang], tgt.word, tgt.rom, tgt.mean[lang])}
              </p>
              {answer !== null && <button type="button" className="btn btn-ink" onClick={next}>{h.toNext} →</button>}
            </div>
          )}
        </div>

        <p className="twister">
          {h.twA} <span className="th">ใหม่ ไม้ ไหม้ ไม่ ไหม</span> — {h.twB}
        </p>
      </div>
    </section>
  );
}
