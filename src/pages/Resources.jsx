import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { CATS, RES, RTYPE } from '../data/content.js';
import { ArrowIcon } from '../components/Icons.jsx';
import { CtaBand, FilterSelect, PageHero, SectionHead } from '../components/Layout.jsx';

function ResourceCard({ item }) {
  const { t, lang } = useSettings();
  const p = t.resources;
  const [soon, setSoon] = useState(false);
  const media = item.type === 'audio' || item.type === 'video';

  const onOpen = () => {
    // TODO: link to the real PDF / audio / video file.
    setSoon(true);
    setTimeout(() => setSoon(false), 1400);
  };

  return (
    <article className="res">
      <div className="res-top">
        <span className={'rtype' + (media ? ' media' : '')}>{RTYPE[item.type][lang]}</span>
        <span>{item.meta[lang]}</span>
      </div>
      <h3>{item.title[lang]}</h3>
      <p>{item.desc[lang]}</p>
      <button type="button" className="open" onClick={onOpen}>
        {soon ? p.soon : <>{p.open}<ArrowIcon /></>}
      </button>
    </article>
  );
}

export default function Resources() {
  const { t } = useSettings();
  const p = t.resources;
  const [cat, setCat] = useState('all');
  const items = RES.filter((r) => cat === 'all' || r.cat === cat);

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>

      <section>
        <div className="wrap">
          <div className="potd">
            <div>
              <span className="eyebrow">{p.potdL}</span>
              <span className="th">กินข้าวหรือยัง</span>
              <span style={{ fontSize: 22, fontWeight: 600 }}>gin khâao rǔe yang</span>
            </div>
            <div>
              <span className="disp h3">{p.potdM}</span>
              <p>{p.potdT}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={p.libE} title={p.libT}
            aside={<FilterSelect id="catSelect" label={p.filter} value={cat} onChange={setCat}
              options={CATS.map((k) => ({ value: k, label: p.cats[k] }))} />} />
          <div className="grid4">
            {items.map((r) => <ResourceCard key={r.title.en} item={r} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
