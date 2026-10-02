import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { CheckIcon } from './Icons.jsx';

// Demo forms: they show a confirmation but don't send anything yet.
// Hook `onSubmit` up to your backend, Formspree, Google Forms, etc. later.

function Sent({ title, body, again, onAgain, big }) {
  return (
    <div className="sent" role="status">
      <span className="ok"><CheckIcon /></span>
      {big ? <h2 className="disp h2">{title}</h2> : <h3 className="disp h3">{title}</h3>}
      <p>{body}</p>
      <button type="button" className="btn btn-line" onClick={onAgain}>{again}</button>
    </div>
  );
}

export function TrialForm() {
  const { t } = useSettings();
  const h = t.home;
  const [sent, setSent] = useState(false);

  if (sent) return <Sent title={h.sentT} body={h.sentB} again={h.again} onAgain={() => setSent(false)} />;

  return (
    <form className="form" noValidate onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <label htmlFor="tfName">{h.fName}<input id="tfName" type="text" autoComplete="name" placeholder={h.fNamePh} /></label>
      <label htmlFor="tfContact">{h.fContact}<input id="tfContact" type="text" placeholder="you@example.com" /></label>
      <label htmlFor="tfLevel">{h.fLevel}
        <select id="tfLevel">{h.o.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <button type="submit" className="btn btn-accent">{h.fSubmit}</button>
    </form>
  );
}

export function ContactForm() {
  const { t } = useSettings();
  const h = t.home;
  const p = t.contact;
  const [sent, setSent] = useState(false);

  if (sent) return <Sent big title={p.sentT} body={p.sentB} again={p.again} onAgain={() => setSent(false)} />;

  return (
    <form className="form" noValidate onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h2 className="disp h3">{p.formT}</h2>
      <label htmlFor="cfName">{h.fName}<input id="cfName" type="text" autoComplete="name" placeholder={h.fNamePh} /></label>
      <label htmlFor="cfContact">{h.fContact}<input id="cfContact" type="text" placeholder="you@example.com" /></label>
      <label htmlFor="cfTopic">{p.fTopic}
        <select id="cfTopic">{p.topics.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label htmlFor="cfMsg">{p.fMsg}<textarea id="cfMsg" rows={4} placeholder={p.fMsgPh} /></label>
      <button type="submit" className="btn btn-accent">{p.fSubmit}</button>
    </form>
  );
}
