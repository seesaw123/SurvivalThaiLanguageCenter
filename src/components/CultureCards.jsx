import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { CULTURE_STORIES } from '../data/culture.js';
import './CultureCards.css';

const copy = {
  en: {
    eyebrow: 'Beyond the classroom', title: 'Learn the language. Fall in love with Chiang Mai.',
    intro: 'Six little stories from the place we call home. Tap a photo to discover the culture—and a little Thai.',
    discover: 'Discover the story', back: 'Tap to return to the photo', count: 'stories discovered', footer: 'A little culture. A little Thai.',
  },
  my: {
    eyebrow: 'စာသင်ခန်းပြင်ပမှ အတွေ့အကြုံများ', title: 'ဘာသာစကားကို သင်ယူရင်း ချင်းမိုင်ကို ချစ်မြတ်နိုးလာပါ။',
    intro: 'ချင်းမိုင်ရဲ့ အကြောင်းအရာ ခြောက်ခုကို လေ့လာကြည့်ပါ။ ဓာတ်ပုံကို နှိပ်ပြီး ယဉ်ကျေးမှုနဲ့ ထိုင်းစကားလုံးများကို သိရှိနိုင်ပါတယ်။',
    discover: 'အကြောင်းအရာကို ဖတ်ရန်', back: 'ဓာတ်ပုံပြန်ကြည့်ရန် နှိပ်ပါ', count: 'ခု လေ့လာပြီး', footer: 'ယဉ်ကျေးမှုနဲ့ ထိုင်းဘာသာကို အတူလေ့လာမယ်။',
  },
};

export default function CultureCards() {
  const { lang, num } = useSettings();
  const text = copy[lang];
  const [flipped, setFlipped] = useState({});
  const [discovered, setDiscovered] = useState({});

  function toggle(id) {
    setFlipped((previous) => ({ ...previous, [id]: !previous[id] }));
    setDiscovered((previous) => ({ ...previous, [id]: true }));
  }

  return (
    <section id="phrases" className="culture-section" aria-labelledby="culture-heading">
      <div className="wrap">
        <div className="culture-heading">
          <span className="eyebrow">{text.eyebrow}</span>
          <h2 id="culture-heading" className="disp h2">{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <div className="culture-grid">
          {CULTURE_STORIES.map((story, index) => {
            const on = Boolean(flipped[story.id]);
            return (
              <button key={story.id} type="button" className={'culture-flip' + (on ? ' is-flipped' : '')}
                aria-pressed={on} aria-label={`${story.title[lang]} — ${on ? text.back : text.discover}`}
                onClick={() => toggle(story.id)}>
                <span className="culture-inner">
                  <span className="culture-face culture-front" aria-hidden={on}>
                    <img src={story.image} alt="" loading="lazy" decoding="async" width="800" height="600" />
                    <span className="culture-shade" />
                    <span className="culture-number">{num(String(index + 1).padStart(2, '0'))}</span>
                    <span className="culture-caption">
                      <span className="culture-category" lang="en">{story.category}</span>
                      <span className="culture-title">{story.title[lang]}</span>
                      <span className="culture-location" lang="en">{story.location}</span>
                      <span className="culture-flip-hint">{text.discover}<span aria-hidden="true">↻</span></span>
                    </span>
                  </span>
                  <span className="culture-face culture-back" aria-hidden={!on}>
                    <span className="culture-category" lang="en">{story.backCategory}</span>
                    <span className="culture-title">{story.title[lang]}</span>
                    <span className="culture-description">{story.description[lang]}</span>
                    <span className="culture-word" lang="th">{story.thai}</span>
                    <span className="culture-gloss" lang="en">{story.gloss}</span>
                    <span className="culture-return">↻ {text.back}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="culture-footer">
          <span aria-live="polite"><strong>{num(Object.keys(discovered).length)} / {num(6)}</strong> {text.count}</span>
          <span>{text.footer}</span>
        </div>
      </div>
    </section>
  );
}
