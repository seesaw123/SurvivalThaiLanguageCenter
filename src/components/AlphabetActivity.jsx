import { useEffect, useReducer } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { createRound, gameReducer, initialGame } from '../data/alphabetGame.js';
import './AlphabetActivity.css';

const COPY = {
  en: {
    title: 'How many Thai letters can you recognise?', intro: 'Read the consonant name. Choose its matching Thai letter.',
    challenge: 'The 5-second challenge', cover: 'Think fast. Find the letter.', fresh: 'A fresh set of 15 every round.',
    deck: 'consonants in the deck', cards: 'questions per round', seconds: 'for each answer', start: 'Start my 15 cards',
    note: 'Includes the two historical consonants ฃ and ฅ. After each answer, the next card appears in 3 seconds.',
    card: 'Card', of: 'of', correct: 'correct', question: 'Which Thai letter is this?',
    praise: ['Great job!', 'You got it!', 'Fantastic!', 'Well done!'], wrong: 'Not quite. You can do this!', timeout: 'Time’s up—keep going!',
    next: 'Next card in', resultsIn: 'Results in', sec: 'seconds', helper: '5 seconds to answer · 3 seconds to learn before the next card.',
    done: 'Round complete', resultTitle: 'Another step towards Thai.', score: 'Your score', review: 'Your letters to practise next:',
    perfect: 'Perfect round! You recognised every letter.', again: 'Try a new set of 15', timedOut: 'Timed out', back: 'Back to vocabulary',
  },
  my: {
    title: 'ထိုင်းဗျည်း ဘယ်နှလုံးကို မှတ်မိလဲ။', intro: 'ဗျည်းအမည်ကို ဖတ်ပြီး ကိုက်ညီတဲ့ ထိုင်းဗျည်းကို ရွေးပါ။',
    challenge: '၅ စက္ကန့် စိန်ခေါ်မှု', cover: 'မြန်မြန်စဉ်းစားပြီး ဗျည်းကို ရွေးပါ။', fresh: 'တစ်ကြိမ်စီမှာ ကျပန်းဗျည်း ၁၅ လုံး။',
    deck: 'ထိုင်းဗျည်း စုစုပေါင်း', cards: 'တစ်ကြိမ်လျှင် မေးခွန်း', seconds: 'အဖြေရွေးရန် အချိန်', start: 'ဗျည်း ၁၅ လုံး စတင်ဖြေမယ်',
    note: 'ယနေ့ အသုံးမပြုတော့သော ဗျည်း ฃ နှင့် ฅ လည်း ပါဝင်ပါတယ်။ ဖြေပြီး ၃ စက္ကန့်အကြာမှာ နောက်ကတ် ပေါ်လာပါမယ်။',
    card: 'ကတ်', of: '/', correct: 'ခု မှန်ပြီး', question: 'ဒီအမည်နဲ့ ကိုက်ညီတဲ့ ဗျည်းကို ရွေးပါ။',
    praise: ['တော်လိုက်တာ!', 'မှန်ပါတယ်!', 'အရမ်းကောင်းပါတယ်!', 'တော်ပါတယ်!'], wrong: 'မမှန်သေးပါဘူး။ ဆက်ကြိုးစားပါ။', timeout: 'အချိန်ပြည့်သွားပါပြီ။ ဆက်ကြိုးစားပါ။',
    next: 'နောက်ကတ်ပေါ်ရန်', resultsIn: 'ရလဒ်ပေါ်ရန်', sec: 'စက္ကန့်', helper: 'ဖြေရန် ၅ စက္ကန့် · မှတ်သားရန် ၃ စက္ကန့်',
    done: 'ဖြေဆိုမှု ပြီးဆုံးပါပြီ', resultTitle: 'ထိုင်းစာအတွက် နောက်ထပ်ခြေလှမ်းတစ်ခု။', score: 'သင့်ရမှတ်', review: 'ထပ်မံလေ့ကျင့်ရန် ဗျည်းများ',
    perfect: 'အားလုံးမှန်ပါတယ်။ ဗျည်းအားလုံးကို မှတ်မိပါတယ်။', again: 'ကျပန်းဗျည်း ၁၅ လုံးနဲ့ ထပ်ကစားမယ်', timedOut: 'အချိန်ပြည့်', back: 'ဝေါဟာရ လေ့ကျင့်ခန်းသို့ ပြန်ရန်',
  },
};

export default function AlphabetActivity({ onClose }) {
  const { lang, num } = useSettings();
  const text = COPY[lang];
  const [game, dispatch] = useReducer(gameReducer, initialGame);
  const start = () => dispatch({ type: 'start', round: createRound(), now: Date.now() });
  useEffect(() => {
    if (game.phase !== 'question' && game.phase !== 'feedback') return undefined;
    const timer = setInterval(() => dispatch({ type: 'tick', now: Date.now() }), 50);
    return () => clearInterval(timer);
  }, [game.phase, game.index]);

  const current = game.round[game.index];
  const result = game.results[game.index];
  const score = game.results.filter((entry) => entry.correct).length;
  const remaining = Math.max(0, game.deadline - game.now);
  const feedback = game.phase === 'feedback';

  return (
    <div className="alphabet-activity">
      <button type="button" className="link-u alphabet-close" onClick={onClose}>← {text.back}</button>
      {game.phase === 'intro' && <div className="alphabet-intro">
        <h2 className="disp h2">{text.title}</h2><p>{text.intro}</p>
        <div className="alphabet-cover"><div><span className="eyebrow">{text.challenge}</span><h3 className="disp h3">{text.cover}</h3><p>{text.fresh}</p></div><span className="alphabet-art" lang="th" aria-hidden="true">ก</span></div>
        <div className="alphabet-rules"><span><strong>{num(44)}</strong>{text.deck}</span><span><strong>{num(15)}</strong>{text.cards}</span><span><strong>{num(5)} s</strong>{text.seconds}</span></div>
        <button type="button" className="btn btn-ink" onClick={start}>{text.start} →</button><p className="alphabet-note">{text.note}</p>
      </div>}
      {(game.phase === 'question' || feedback) && <>
        <div className="alphabet-gamehead"><span>{text.card} {num(game.index + 1)} {text.of} {num(15)}</span><span className="alphabet-score">{num(score)} {text.correct}</span><span className={remaining < 2000 && !feedback ? 'alphabet-timer urgent' : 'alphabet-timer'} role="timer">{num((remaining / 1000).toFixed(1))} s</span></div>
        <div className="alphabet-track" aria-hidden="true"><div className={'alphabet-timebar' + (remaining < 2000 ? ' urgent' : '')} style={{ transform: `scaleX(${Math.min(1, remaining / 5000)})` }} /></div>
        <div className="alphabet-rounddots" aria-label={`${text.card} ${num(game.index + 1)} ${text.of} ${num(15)}`}>
          {game.round.map((entry, i) => <span key={entry.target.g} className={'alphabet-rounddot' + (game.results[i] ? game.results[i].correct ? ' good' : ' miss' : i === game.index ? ' current' : '')} />)}
        </div>
        <div className="alphabet-question" key={game.index}>
          <span className="alphabet-questionlabel">{text.question}</span>
          <h3 className="alphabet-clue" lang="en">{current.target.name}</h3><p>{current.target.mean[lang]}</p>
          <div className="alphabet-options">
            {current.options.map((option) => {
              const correct = feedback && option.g === current.target.g;
              const wrong = feedback && option.g === result.chosen && !result.correct;
              return <button type="button" key={option.g} className={'alphabet-answer' + (correct ? ' correct' : wrong ? ' wrong' : '')} disabled={feedback} onClick={() => dispatch({ type: 'answer', chosen: option.g, now: Date.now() })} aria-label={option.g} lang="th">{option.g}{correct || wrong ? <span className="alphabet-mark" aria-hidden="true">{correct ? '✓' : '×'}</span> : null}</button>;
            })}
          </div>
          <div className="alphabet-feedback" aria-live="polite">
            {feedback && <><div className="alphabet-reaction"><span className={'alphabet-reactionicon ' + (result.correct ? 'cheer' : 'sad')} aria-hidden="true">{result.correct ? '👏' : '😢'}</span><span>{result.correct ? text.praise[game.index % text.praise.length] : result.chosen === null ? text.timeout : text.wrong}</span></div><p><span lang="th">{current.target.g}</span> — {current.target.name} · {current.target.mean[lang]}</p></>}
          </div>
        </div>
        <div className="alphabet-gamefoot"><span>{text.helper}</span>{feedback && <span>{game.index === 14 ? text.resultsIn : text.next} {num(Math.max(1, Math.ceil((game.advanceAt - game.now) / 1000)))} {text.sec}…</span>}</div>
      </>}
      {game.phase === 'done' && <div className="alphabet-result"><span className="eyebrow">{text.done}</span><h2 className="disp h3">{text.resultTitle}</h2><div className="alphabet-resultscore">{num(score)} / {num(15)}</div><p>{score === 15 ? text.perfect : text.review}</p><div className="alphabet-review">{game.results.filter((entry) => !entry.correct).map((entry) => <div key={entry.target.g}><span className="alphabet-reviewletter" lang="th">{entry.target.g}</span><span>{entry.target.name} · {entry.target.mean[lang]}{entry.chosen === null ? ` · ${text.timedOut}` : ''}</span></div>)}</div><button type="button" className="btn btn-ink" onClick={start}>{text.again} →</button></div>}
    </div>
  );
}
