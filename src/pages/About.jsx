import { useSettings } from '../context/SettingsContext.jsx';
import { CtaBand, PageHero } from '../components/Layout.jsx';

export default function About() {
  const { t, num } = useSettings();
  const p = t.about;

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>

      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow ac">{p.storyE}</span>
              <h2 className="disp h2">{p.storyT}</h2>
            </div>
            <div>
              <p className="lead muted">{p.s1}</p>
              <p className="lead muted">{p.s2}</p>
            </div>
          </div>
          <div className="facts">
            {p.facts.map(([n, label]) => (
              <div className="fact" key={label}><b>{n}</b><span className="muted">{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="disp h2" style={{ marginBottom: 40 }}>{p.valuesT}</h2>
          <div className="grid3">
            {p.values.map(([title, body], i) => (
              <article className="value" key={title}>
                <span className="n">{num(i + 1)}</span>
                <h3 className="disp h3">{title}</h3>
                <p className="muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-dark">
        <div className="wrap">
          <h2 className="disp h2" style={{ marginBottom: 40 }}>{p.stepsT}</h2>
          <div className="steps">
            {p.steps.map(([title, body], i) => (
              <div className="step" key={title}>
                <span className="n">{num('0' + (i + 1))}</span>
                <h3 className="disp h3">{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 'clamp(64px,8vw,96px)' }} />
      <CtaBand />
    </>
  );
}
