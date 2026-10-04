import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { PageHero } from '../components/Layout.jsx';

const emptyDraft = { day_en: '', day_my: '', time: '', level: 1, online: false, seats: 0, sort_order: 0 };

// Hidden admin tool (not linked from the nav): sign in with a Supabase account to
// add, edit or remove class slots. Writes are allowed only for signed-in users —
// see the "Signed-in users can ..." policies on public.schedule_slots.
export default function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadRows = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('schedule_slots').select('*').order('sort_order', { ascending: true });
    if (!error) setRows(data);
    setLoading(false);
  };

  useEffect(() => { if (session) loadRows(); }, [session]);

  const login = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const patchRow = (id, patch) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const saveRow = async (row) => {
    setSaving(true);
    setErr('');
    const { id, ...fields } = row;
    const { error } = await supabase.from('schedule_slots').update(fields).eq('id', id);
    if (error) setErr(error.message);
    setSaving(false);
  };

  const deleteRow = async (id) => {
    if (!window.confirm('Remove this class slot from the schedule?')) return;
    setErr('');
    const { error } = await supabase.from('schedule_slots').delete().eq('id', id);
    if (error) setErr(error.message);
    else setRows((rs) => rs.filter((r) => r.id !== id));
  };

  const addRow = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    const { error } = await supabase.from('schedule_slots').insert(draft);
    if (error) setErr(error.message);
    else { setDraft(emptyDraft); loadRows(); }
    setSaving(false);
  };

  if (checking) return null;

  if (!session) {
    return (
      <>
        <PageHero eyebrow="Admin" title="Sign in">Manage the live class schedule shown on /courses.</PageHero>
        <section>
          <div className="wrap">
            <div className="form-box" style={{ maxWidth: 420 }}>
              <form className="form" noValidate onSubmit={login}>
                <label htmlFor="adEmail">Email
                  <input id="adEmail" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label htmlFor="adPass">Password
                  <input id="adPass" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {authError && <p style={{ color: 'var(--on-dark-accent)' }}>{authError}</p>}
                <button type="submit" className="btn btn-accent">Sign in</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Admin" title="Class schedule">
        Add, edit or remove the slots shown on /courses. Changes appear on the site within moments.
      </PageHero>
      <section>
        <div className="wrap">
          <button type="button" className="btn btn-line" onClick={() => supabase.auth.signOut()}>Sign out</button>

          {err && <p style={{ color: 'var(--accent-text)', marginTop: 16 }}>{err}</p>}

          <div className="form-box admin-panel">
            {loading ? <p>Loading…</p> : (
              <div className="admin-rows">
                {rows.map((r) => (
                  <div className="admin-row" key={r.id}>
                    <label className="admin-field grow">Day (EN)
                      <input value={r.day_en} onChange={(e) => patchRow(r.id, { day_en: e.target.value })} />
                    </label>
                    <label className="admin-field grow">Day (MY)
                      <input value={r.day_my} onChange={(e) => patchRow(r.id, { day_my: e.target.value })} />
                    </label>
                    <label className="admin-field time">Time
                      <input value={r.time} onChange={(e) => patchRow(r.id, { time: e.target.value })} />
                    </label>
                    <label className="admin-field">Level
                      <select value={r.level} onChange={(e) => patchRow(r.id, { level: +e.target.value })}>
                        <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                      </select>
                    </label>
                    <label className="admin-field chk">Online
                      <input type="checkbox" checked={r.online} onChange={(e) => patchRow(r.id, { online: e.target.checked })} />
                    </label>
                    <label className="admin-field">Seats
                      <input type="number" min={0} value={r.seats} onChange={(e) => patchRow(r.id, { seats: +e.target.value })} />
                    </label>
                    <label className="admin-field">Order
                      <input type="number" value={r.sort_order} onChange={(e) => patchRow(r.id, { sort_order: +e.target.value })} />
                    </label>
                    <div className="admin-actions">
                      <button type="button" className="btn btn-accent" disabled={saving} onClick={() => saveRow(r)}>Save</button>
                      <button type="button" className="btn btn-line" onClick={() => deleteRow(r.id)}>Delete</button>
                    </div>
                  </div>
                ))}
                {rows.length === 0 && <p>No class slots yet — add one below.</p>}
              </div>
            )}

            <h2 className="disp h3" style={{ marginTop: 32 }}>Add a new class slot</h2>
            <form className="form" noValidate onSubmit={addRow} style={{ maxWidth: 420 }}>
              <label>Day (English)
                <input value={draft.day_en} onChange={(e) => setDraft({ ...draft, day_en: e.target.value })} placeholder="Mon & Wed" required />
              </label>
              <label>Day (Burmese)
                <input value={draft.day_my} onChange={(e) => setDraft({ ...draft, day_my: e.target.value })} required />
              </label>
              <label>Time
                <input value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="18:00–19:30" required />
              </label>
              <label>Level
                <select value={draft.level} onChange={(e) => setDraft({ ...draft, level: +e.target.value })}>
                  <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                </select>
              </label>
              <label className="admin-field chk" style={{ fontSize: 15 }}>Online
                <input type="checkbox" checked={draft.online} onChange={(e) => setDraft({ ...draft, online: e.target.checked })} />
              </label>
              <label>Seats
                <input type="number" min={0} value={draft.seats} onChange={(e) => setDraft({ ...draft, seats: +e.target.value })} />
              </label>
              <label>Sort order
                <input type="number" value={draft.sort_order} onChange={(e) => setDraft({ ...draft, sort_order: +e.target.value })} />
              </label>
              <button type="submit" className="btn btn-accent" disabled={saving}>Add slot</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
