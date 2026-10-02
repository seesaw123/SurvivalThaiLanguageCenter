import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { FAQS } from '../data/content.js';
import { ChatIcon, PlusIcon } from '../components/Icons.jsx';
import { CtaBand, PageHero } from '../components/Layout.jsx';

export default function Faq() {
  const { t, lang } = useSettings();
  const p = t.faq;
  const [open, setOpen] = useState({ 0: true });

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>

      <section>
        <div className="wrap faq-grid">
          <div className="acc">
            {FAQS.map((f, i) => (
              <div className="acc-item" key={f.q.en}>
                <button type="button" className="acc-q" aria-expanded={!!open[i]} aria-controls={'ans' + i}
                  onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
                  <span>{f.q[lang]}</span>
                  <span className="plus" aria-hidden="true"><PlusIcon /></span>
                </button>
                <p className="acc-a" id={'ans' + i} hidden={!open[i]}>{f.a[lang]}</p>
              </div>
            ))}
          </div>

          <aside className="ask">
            <ChatIcon width={36} height={36} />
            <h2 className="disp h3">{p.askT}</h2>
            <p>{p.askS}</p>
            <span style={{ fontSize: 20, fontWeight: 600 }}>LINE: @survivalthai</span>
            <Link className="btn btn-accent" to="/contact">{p.askB}</Link>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
