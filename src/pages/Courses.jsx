import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { COURSES } from '../data/content.js';
import { useSchedule } from '../hooks/useSchedule.js';
import { CheckIcon } from '../components/Icons.jsx';
import { CtaBand, FilterSelect, PageHero, SectionHead } from '../components/Layout.jsx';

export default function Courses() {
  const { t, lang, num } = useSettings();
  const p = t.courses;
  const [level, setLevel] = useState(0);
  const { rows: schedule, loading } = useSchedule();
  const rows = schedule.filter((r) => level === 0 || r.level === level);
  const levelOptions = [0, 1, 2, 3].map((lv) => ({ value: lv, label: lv === 0 ? p.all : t.level + num(lv) }));

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>

      <section>
        <div className="wrap">
          <div className="grid3">
            {COURSES.map((k, i) => (
              <article key={k.name} className={'course' + (i === 0 ? ' feat' : '')}>
                <span className="lv">{t.level}{num(i + 1)}</span>
                <h3 className="name">{k.name}</h3>
                <div>
                  <div className="price">{k.price[lang]}</div>
                  <div className="sub">{k.dur[lang]}</div>
                </div>
                <ul>
                  {k.topics[lang].map((x) => <li key={x}><CheckIcon /><span>{x}</span></li>)}
                </ul>
                <Link className="btn" to="/contact">{p.reserve}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={p.schE} title={p.schT}
            aside={<FilterSelect id="lvSelect" label={p.filter} value={level} onChange={(v) => setLevel(+v)} options={levelOptions} />} />

          <div className="sched">
            <div className="srow head">
              {p.cols.map((c) => <span key={c}>{c}</span>)}
              <span />
            </div>
            {rows.map((r) => {
              const full = r.seats === 0;
              const seatClass = full ? 'full' : r.seats <= 3 ? 'low' : '';
              return (
                <div className="srow" key={r.id}>
                  <span className="day" data-label={p.cols[0]}>{lang === 'my' ? r.day_my : r.day_en}</span>
                  <span data-label={p.cols[1]}>{r.time}</span>
                  <span className="course-cell" data-label={p.cols[2]}>
                    <span style={{ fontWeight: 600 }}>{COURSES[r.level - 1].name}</span>
                    <small>{t.level}{num(r.level)}</small>
                  </span>
                  <span data-label={p.cols[3]}><span className="tag">{r.online ? p.online : p.inPerson}</span></span>
                  <span className={'seats ' + seatClass} data-label={p.cols[4]}>{full ? p.full : p.left(r.seats)}</span>
                  <span className="act">
                    {full ? <span className="full-lbl">{p.fullL}</span> : <Link className="btn btn-accent" to="/contact">{p.reserveS}</Link>}
                  </span>
                </div>
              );
            })}
            {loading && <p className="note">{p.loading}</p>}
          </div>
          <p className="note">{p.note}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
