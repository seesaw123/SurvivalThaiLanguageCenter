import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { supabase } from '../lib/supabaseClient.js';
import { CheckIcon } from './Icons.jsx';

// Both forms below write straight to the `inquiries` table in Supabase, which
// shows up live in /admin. Row Level Security lets anyone insert but only a
// signed-in admin read, update or delete.

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
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');

  if (sent) return <Sent title={h.sentT} body={h.sentB} again={h.again} onAgain={() => setSent(false)} />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSending(true);
    setErr('');
    const { error } = await supabase.from('inquiries').insert({
      name: data.get('name'),
      contact: data.get('contact'),
      topic: 'Trial class request',
      message: data.get('level'),
      source: 'trial',
    });
    setSending(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <label htmlFor="tfName">{h.fName}<input id="tfName" name="name" type="text" autoComplete="name" placeholder={h.fNamePh} required /></label>
      <label htmlFor="tfContact">{h.fContact}<input id="tfContact" name="contact" type="text" placeholder="you@example.com" required /></label>
      <label htmlFor="tfLevel">{h.fLevel}
        <select id="tfLevel" name="level">{h.o.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      {err && <p style={{ color: 'var(--on-dark-accent)' }}>{err}</p>}
      <button type="submit" className="btn btn-accent" disabled={sending}>{h.fSubmit}</button>
    </form>
  );
}

export function ContactForm() {
  const { t } = useSettings();
  const h = t.home;
  const p = t.contact;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');

  if (sent) return <Sent big title={p.sentT} body={p.sentB} again={p.again} onAgain={() => setSent(false)} />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSending(true);
    setErr('');
    const { error } = await supabase.from('inquiries').insert({
      name: data.get('name'),
      contact: data.get('contact'),
      topic: data.get('topic'),
      message: data.get('message'),
      source: 'contact',
    });
    setSending(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <h2 className="disp h3">{p.formT}</h2>
      <label htmlFor="cfName">{h.fName}<input id="cfName" name="name" type="text" autoComplete="name" placeholder={h.fNamePh} required /></label>
      <label htmlFor="cfContact">{h.fContact}<input id="cfContact" name="contact" type="text" placeholder="you@example.com" required /></label>
      <label htmlFor="cfTopic">{p.fTopic}
        <select id="cfTopic" name="topic">{p.topics.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label htmlFor="cfMsg">{p.fMsg}<textarea id="cfMsg" name="message" rows={4} placeholder={p.fMsgPh} required /></label>
      {err && <p style={{ color: 'var(--accent-text)' }}>{err}</p>}
      <button type="submit" className="btn btn-accent" disabled={sending}>{p.fSubmit}</button>
    </form>
  );
}
