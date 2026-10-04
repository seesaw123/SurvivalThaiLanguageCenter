import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { supabase } from '../lib/supabaseClient.js';
import { useTurnstile } from '../hooks/useTurnstile.js';
import { CheckIcon } from './Icons.jsx';

// Both forms below call the submit-inquiry Edge Function, which checks the
// Cloudflare Turnstile token and only then writes to the `inquiries` table
// (using the service role -- the table itself has no public insert policy).
// Submissions show up live in /admin.

// Honeypot: a field real visitors never see (off-screen, unfocusable, skipped
// by autofill) but most spam bots fill in anyway because they fill every field.
// If it's non-empty on submit, we pretend to succeed without actually writing
// anything, so the bot gets no signal that it was caught. This is a cheap
// first filter on top of Turnstile -- it saves those bots from even needing
// to solve the challenge.
function Honeypot({ id }) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
      <label htmlFor={id}>Leave this field blank</label>
      <input id={id} name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

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

async function submitInquiry(fields, turnstileToken) {
  const { data, error } = await supabase.functions.invoke('submit-inquiry', {
    body: { ...fields, turnstileToken },
  });
  if (error) return { ok: false, error: error.message };
  if (!data?.ok) return { ok: false, error: data?.error || 'Something went wrong. Please try again.' };
  return { ok: true };
}

export function TrialForm() {
  const { t } = useSettings();
  const h = t.home;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState('');
  const turnstile = useTurnstile();

  if (sent) return <Sent title={h.sentT} body={h.sentB} again={h.again} onAgain={() => setSent(false)} />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('company')) { setSent(true); return; }
    setSending(true);
    setErr('');
    const result = await submitInquiry({
      name: data.get('name'),
      contact: data.get('contact'),
      topic: 'Trial class request',
      message: data.get('level'),
      source: 'trial',
    }, turnstile.token);
    setSending(false);
    if (result.ok) setSent(true);
    else { setErr(result.error); turnstile.reset(); }
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <Honeypot id="tfCompany" />
      <label htmlFor="tfName">{h.fName}<input id="tfName" name="name" type="text" autoComplete="name" placeholder={h.fNamePh} required /></label>
      <label htmlFor="tfContact">{h.fContact}<input id="tfContact" name="contact" type="text" placeholder="you@example.com" required /></label>
      <label htmlFor="tfLevel">{h.fLevel}
        <select id="tfLevel" name="level">{h.o.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <div ref={turnstile.containerRef} />
      {err && <p style={{ color: 'var(--on-dark-accent)' }}>{err}</p>}
      <button type="submit" className="btn btn-accent" disabled={sending || !turnstile.token}>{h.fSubmit}</button>
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
  const turnstile = useTurnstile();

  if (sent) return <Sent big title={p.sentT} body={p.sentB} again={p.again} onAgain={() => setSent(false)} />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('company')) { setSent(true); return; }
    setSending(true);
    setErr('');
    const result = await submitInquiry({
      name: data.get('name'),
      contact: data.get('contact'),
      topic: data.get('topic'),
      message: data.get('message'),
      source: 'contact',
    }, turnstile.token);
    setSending(false);
    if (result.ok) setSent(true);
    else { setErr(result.error); turnstile.reset(); }
  };

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <Honeypot id="cfCompany" />
      <h2 className="disp h3">{p.formT}</h2>
      <label htmlFor="cfName">{h.fName}<input id="cfName" name="name" type="text" autoComplete="name" placeholder={h.fNamePh} required /></label>
      <label htmlFor="cfContact">{h.fContact}<input id="cfContact" name="contact" type="text" placeholder="you@example.com" required /></label>
      <label htmlFor="cfTopic">{p.fTopic}
        <select id="cfTopic" name="topic">{p.topics.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label htmlFor="cfMsg">{p.fMsg}<textarea id="cfMsg" name="message" rows={4} placeholder={p.fMsgPh} required /></label>
      <div ref={turnstile.containerRef} />
      {err && <p style={{ color: 'var(--accent-text)' }}>{err}</p>}
      <button type="submit" className="btn btn-accent" disabled={sending || !turnstile.token}>{p.fSubmit}</button>
    </form>
  );
}
