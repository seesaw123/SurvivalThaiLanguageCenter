import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { ArrowIcon } from '../components/Icons.jsx';
import { CtaBand, PageHero, SectionHead } from '../components/Layout.jsx';
import AlphabetActivity from '../components/AlphabetActivity.jsx';

export default function Resources() {
  const { t, lang } = useSettings();
  const p = t.resources;
  const [activityOpen, setActivityOpen] = useState(false);
  const my = lang === 'my';

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{my ? 'ထိုင်းဗျည်းများကို ကစားရင်း လေ့ကျင့်ကြမယ်။' : 'Build your Thai vocabulary with a little interactive practice.'}</PageHero>
      <section>
        <div className="wrap">
          {activityOpen ? <AlphabetActivity onClose={() => setActivityOpen(false)} /> : <>
            <SectionHead eyebrow={my ? 'ဝေါဟာရ' : 'Vocabulary'} title={my ? 'ကစားရင်း သင်ယူပါ။' : 'A little practice. A little progress.'} />
            <article className="res alphabet-resource">
              <div className="res-top"><span className="rtype">{my ? 'လေ့ကျင့်ခန်း' : 'Activity'}</span><span>{my ? 'ဗျည်း ၁၅ လုံး · တစ်လုံးလျှင် ၅ စက္ကန့်' : '15 cards · 5 seconds each'}</span></div>
              <h3>{my ? 'ထိုင်းဗျည်း ကတ်လေ့ကျင့်ခန်း' : 'Thai alphabet flashcards'}</h3>
              <p>{my ? 'ဗျည်း ၄၄ လုံးထဲမှ ကျပန်း ၁၅ လုံးကို ရွေးဖြေပါ။ အဖြေမှန်ကို မှတ်သားပြီး နောက်ကတ်ကို ဆက်ဖြေကြမယ်။' : 'Match each consonant name to its Thai letter. Play 15 random cards from all 44, with reactions and a moment to learn each answer.'}</p>
              <button type="button" className="open" onClick={() => setActivityOpen(true)}>{my ? 'စတင်ကစားရန်' : 'Open activity'}<ArrowIcon /></button>
            </article>
          </>}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
