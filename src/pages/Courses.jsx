import { useState } from 'react';
import { Link } from '../components/Link.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { COURSES, FORMATS, INTENSIVE, LEVEL_BANDS, LEVELS } from '../data/content.js';
import { useSchedule } from '../hooks/useSchedule.js';
import { ArrowIcon } from '../components/Icons.jsx';
import { FilterSelect, PageHero, SectionHead } from '../components/Layout.jsx';
import { scrollToId } from '../utils.js';

const BAND_KEYS = Object.keys(LEVEL_BANDS);
const MAX_HOURS = Math.max(...FORMATS.map((f) => f.hours));

// Full display name for a schedule row's numeric level (1–7 = A1…C2, 8 = Intensive).
export function courseLabel(level, lang) {
  const c = COURSES[level - 1];
  if (!c) return '';
  return c.code === INTENSIVE.code ? c.name[lang] : c.code + ' · ' + c.name[lang];
}

function LevelPicker() {
  const { t, lang } = useSettings();
  const p = t.courses;
  const [sel, setSel] = useState(0);
  const x = LEVELS[sel];
  const band = LEVEL_BANDS[x.band][lang];

  return (
    <>
      <div className="cl-path" role="group" aria-label={p.lvE}>
        {BAND_KEYS.map((b) => (
          <div key={b} className={'cl-band ' + b}>
            <div className="cl-band-name"><i />{LEVEL_BANDS[b][lang]}</div>
            <div className="cl-stops">
              {LEVELS.map((l, i) => l.band !== b ? null : (
                <button key={l.code} type="button" className="cl-stop" aria-pressed={i === sel} onClick={() => setSel(i)}>
                  <b>{l.code}</b><span>{l.name[lang]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="cl-progress" aria-hidden="true"><span style={{ left: (sel / (LEVELS.length - 1)) * 100 + '%' }} /></div>

      <div className="cl-detail" aria-live="polite">
        <div className="cl-side">
          <span className={'cl-tag ' + x.band}>{p.bandLevel(band)}</span>
          <div className="cl-big">{x.code}</div>
          <h3 className="cl-name">{x.name[lang]}</h3>
          <p className="cl-summary">{x.summary[lang]}</p>
          <span className="cl-ghost th" aria-hidden="true">{x.glyph}</span>
        </div>
        <div className="cl-main">
          <h4 className="cl-h">{p.learn}</h4>
          <ol className="cl-topics">
            {x.topics[lang].map((tp) => <li key={tp}><span>{tp}</span></li>)}
          </ol>
          <p className="cl-who">{x.who[lang]} {p.unsure}</p>
          <div className="row">
            <Link className="btn btn-accent" to="/contact">{p.register}{x.code}<ArrowIcon /></Link>
            <button type="button" className="btn btn-line" onClick={() => scrollToId('formats')}>{p.seeFormats}</button>
          </div>
        </div>
      </div>

      <div className="cl-intensive">
        <div>
          <span className="cl-badge">{INTENSIVE.badge[lang]}</span>
          <h3 className="cl-int-name">{INTENSIVE.name[lang]}</h3>
          <p>{INTENSIVE.desc[lang]}</p>
        </div>
        <Link className="btn btn-line" to="/contact">{INTENSIVE.cta[lang]}<ArrowIcon /></Link>
      </div>
    </>
  );
}

function Formats() {
  const { t, lang, num } = useSettings();
  const p = t.courses;
  return (
    <section id="formats" className="band-dark">
      <div className="wrap">
        <SectionHead eyebrow={p.fmtE} title={p.fmtT} sub={p.fmtS} />
        <div className="cl-formats">
          {FORMATS.map((f) => (
            <article key={f.key} className={'cl-fmt ' + f.key}>
              <div className="cl-fmt-top">
                <div className="cl-kind">{f.kind[lang]}</div>
                <h3 className="cl-fmt-name">{f.title[lang]}</h3>
                <div className={'cl-people' + (f.people === 1 ? ' solo' : '')} aria-hidden="true">
                  {Array.from({ length: f.people }, (_, i) => <i key={i} />)}
                </div>
                <div className="cl-size">{f.size[lang]}</div>
              </div>
              <div className="cl-fmt-body">
                <div className="cl-stats">
                  <div><b>{p.hrs(f.perClass)}</b><span>{p.perClass}</span></div>
                  <div><b>{p.days(f.perWeek)}</b><span>{p.perWeek}</span></div>
                  <div><b>{num(f.classes)}</b><span>{p.classesL}</span></div>
                </div>
                <div className="cl-hours">
                  <div className="cl-hours-lbl"><span>{p.total}</span><strong>{p.hours(f.hours)}</strong></div>
                  <div className="cl-bar"><i style={{ width: (f.hours / MAX_HOURS) * 100 + '%' }} /></div>
                </div>
                <p className="cl-note">{f.note[lang]}</p>
                <Link className="btn btn-accent" to="/contact">{f.cta[lang]}<ArrowIcon /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Courses() {
  const { t, lang } = useSettings();
  const p = t.courses;
  const [level, setLevel] = useState(0);
  const { rows: schedule, loading } = useSchedule();
  const rows = schedule.filter((r) => level === 0 || r.level === level);
  const levelOptions = [{ value: 0, label: p.all }, ...COURSES.map((c, i) => ({ value: i + 1, label: courseLabel(i + 1, lang) }))];

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} wide>{p.sub}</PageHero>

      <section>
        <div className="wrap">
          <SectionHead eyebrow={p.lvE} title={p.lvT} sub={p.lvS} />
          <LevelPicker />
        </div>
      </section>

      <Formats />

      <section>
        <div className="wrap">
          <SectionHead eyebrow={p.schE} title={p.schT}
            aside={<FilterSelect id="lvSelect" label={p.filter} value={level} onChange={(v) => setLevel(+v)} options={levelOptions} />} />

          <div className="sched" aria-busy={loading}>
            <div className="srow head">
              {p.cols.map((c) => <span key={c}>{c}</span>)}
              <span />
            </div>
            {loading && (
              <>
                <span className="sr-only" role="status">{p.loading}</span>
                {[0, 1, 2, 3].map((k) => (
                  <div className="srow skel-row" key={k} aria-hidden="true">
                    <span className="skel w1" /><span className="skel w2" /><span className="skel w3" /><span className="skel w5" />
                    <span className="act"><span className="skel btn-skel" /></span>
                  </div>
                ))}
              </>
            )}
            {rows.map((r) => {
              const full = r.seats === 0;
              const seatClass = full ? 'full' : r.seats <= 3 ? 'low' : '';
              return (
                <div className="srow" key={r.id}>
                  <span className="day" data-label={p.cols[0]}>{lang === 'my' ? r.day_my : r.day_en}</span>
                  <span data-label={p.cols[1]}>{r.time}</span>
                  <span className="course-cell" data-label={p.cols[2]}>
                    <span style={{ fontWeight: 600 }}>{courseLabel(r.level, lang)}</span>
                  </span>
                  <span className={'seats ' + seatClass} data-label={p.cols[3]}>{full ? p.full : p.left(r.seats)}</span>
                  <span className="act">
                    {full ? <span className="full-lbl">{p.fullL}</span> : <Link className="btn btn-accent" to="/contact">{p.reserveS}</Link>}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="note">{p.note}</p>
        </div>
      </section>

    </>
  );
}
