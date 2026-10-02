import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { LANGN, TEACHERS } from '../data/content.js';
import { CtaBand, PageHero } from '../components/Layout.jsx';

export default function Teachers() {
  const { t, lang } = useSettings();
  const p = t.teachers;
  const [openBio, setOpenBio] = useState({});

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>

      <section>
        <div className="wrap">
          <div className="grid2">
            {TEACHERS.map((x, i) => {
              const open = !!openBio[i];
              return (
                <article className="teacher" key={x.name}>
                  <div className="t-top">
                    <span className={'avatar' + (i % 2 ? ' alt' : '')} aria-hidden="true">{x.ini}</span>
                    <div>
                      <h3 className="t-name">{x.name}</h3>
                      <span className={x.cls + ' muted'}>{x.native}</span>
                      <span className="t-role">{x.role[lang]}</span>
                    </div>
                  </div>
                  <div className="tags">
                    <span className="k">{p.speaks}</span>
                    {x.langs.map((l) => <span className="tag" key={l}>{LANGN[l][lang]}</span>)}
                  </div>
                  <div className="tags">
                    <span className="k">{p.teaches}</span>
                    {x.teaches.map((n) => <Link className="tag fill" to="/courses" style={{ textDecoration: 'none' }} key={n}>{n}</Link>)}
                  </div>
                  <p className="bio" id={'bio' + i} hidden={!open}>{x.bio[lang]}</p>
                  <button type="button" className="small-btn" aria-expanded={open} aria-controls={'bio' + i}
                    onClick={() => setOpenBio((b) => ({ ...b, [i]: !b[i] }))}>
                    {open ? p.hide : p.read}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
