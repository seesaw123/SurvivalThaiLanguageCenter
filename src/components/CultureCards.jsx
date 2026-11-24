import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { CULTURE_STORIES } from '../data/culture.js';
import './CultureCards.css';

const copy = {
  en: {
    eyebrow: 'Learn through culture', title: 'Every festival has a Thai word to learn.',
    intro: 'Explore six of Thailand’s best-loved festivals. Tap a photo to read its story and pick up a new Thai word.',
    discover: 'Discover the story', back: 'Tap to return to the photo', count: 'festivals discovered', footer: 'A little culture. A little Thai.', photo: 'Photo:',
  },
  my: {
    eyebrow: 'ယဉ်ကျေးမှုနဲ့အတူ လေ့လာမယ်', title: 'ပွဲတော်တိုင်းမှာ မှတ်စရာ ထိုင်းစကားလုံးလေး တစ်လုံးစီ ရှိတယ်။',
    intro: 'ထိုင်းလူမျိုးတွေ နှစ်တိုင်း စောင့်မျှော်ရတဲ့ ပွဲတော်ကြီး ခြောက်ခုကို ကြည့်လိုက်ရအောင်။ ပုံလေးကို နှိပ်ပြီး ပွဲအကြောင်း ဖတ်ရင်း ထိုင်းစကားလုံးအသစ်လေးတွေပါ မှတ်သွားလိုက်ပါ။',
    discover: 'ပွဲအကြောင်း ဖတ်ရန်', back: 'ဓာတ်ပုံပြန်ကြည့်ရန် နှိပ်ပါ', count: 'ခု လေ့လာပြီး', footer: 'ယဉ်ကျေးမှုနဲ့ ထိုင်းဘာသာကို အတူလေ့လာမယ်။', photo: 'ဓာတ်ပုံ -',
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
                    <img src={story.image} alt="" loading="lazy" decoding="async" width="800" height="600" style={story.focus ? { objectPosition: story.focus } : undefined} />
                    <span className="culture-shade" />
                    <span className="culture-number">{num(String(index + 1).padStart(2, '0'))}</span>
                    <span className="culture-caption">
                      <span className="culture-category">{story.category[lang]}</span>
                      <span className="culture-title">{story.title[lang]}</span>
                      <span className="culture-location">{story.when[lang]}</span>
                      <span className="culture-flip-hint">{text.discover}<span aria-hidden="true">↻</span></span>
                    </span>
                  </span>
                  <span className="culture-face culture-back" aria-hidden={!on}>
                    <span className="culture-category">{story.when[lang]}</span>
                    <span className="culture-title">{story.title[lang]}</span>
                    <span className="culture-description">{story.description[lang]}</span>
                    {story.link && <span className="culture-link">{story.link[lang]}</span>}
                    <span className="culture-word" lang="th">{story.thai}</span>
                    <span className="culture-gloss">{story.gloss[lang]}</span>
                    <span className="culture-return">↻ {text.back}</span>
                    <span className="culture-credit" lang="en">{text.photo} {story.credit}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="culture-footer">
          <span aria-live="polite"><strong>{num(Object.keys(discovered).length)} / {num(CULTURE_STORIES.length)}</strong> {text.count}</span>
          <span>{text.footer}</span>
        </div>
      </div>
    </section>
  );
}
