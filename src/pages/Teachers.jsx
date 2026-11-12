import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext.jsx';
import { supabase } from '../lib/supabaseClient.js';
import { CtaBand, PageHero } from '../components/Layout.jsx';

const initialForm = {
  full_name: '', nationality: '', languages: '', bio: '', experience_years: '',
  qualifications: '', courses: [], email: '', line_contact: '', availability: '',
};

const courseOptions = ['Spoken Thai Foundation', 'Thai Literacy Bridge', 'Accelerated Literacy'];

export default function Teachers() {
  const { t, lang } = useSettings();
  const p = t.teachers;
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBio, setOpenBio] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');

  const loadTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('teacher_profiles')
      .select('id, full_name, nationality, languages, bio, experience_years, qualifications, courses, photo_path')
      .order('created_at', { ascending: true });
    if (!error) setTeachers(data || []);
    setLoading(false);
  };

  useEffect(() => { loadTeachers(); }, []);

  const submitApplication = async (e) => {
    e.preventDefault();
    setSending(true);
    setNotice('');
    try {
      if (!photo) throw new Error('Please upload a profile photo.');
      if (photo.size > 3 * 1024 * 1024) throw new Error('Profile photo must be 3 MB or smaller.');
      if (certificates.some(file => file.size > 10 * 1024 * 1024)) throw new Error('Each certificate file must be 10 MB or smaller.');
      let photoPath = null;
      const certificatePaths = [];
      if (photo) {
        const ext = photo.name.split('.').pop().toLowerCase();
        photoPath = `applications/${crypto.randomUUID()}/profile.${ext}`;
        const { error } = await supabase.storage.from('teacher-photos').upload(photoPath, photo, { contentType: photo.type });
        if (error) throw error;
      }
      for (const file of certificates) {
        const ext = file.name.split('.').pop().toLowerCase();
        const path = `applications/${crypto.randomUUID()}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from('teacher-certificates').upload(path, file, { contentType: file.type });
        if (error) throw error;
        certificatePaths.push(path);
      }
      const payload = {
        full_name: form.full_name.trim(), nationality: form.nationality.trim(),
        languages: form.languages.split(',').map(x => x.trim()).filter(Boolean),
        bio: form.bio.trim(), experience_years: Number(form.experience_years),
        qualifications: form.qualifications.trim(),
        courses: form.courses, email: form.email.trim(), contact: form.line_contact.trim() || form.email.trim(),
        availability: form.availability.trim(), photo_path: photoPath,
        certificate_paths: certificatePaths, status: 'pending',
      };
      const { error } = await supabase.from('teacher_applications').insert(payload);
      if (error) throw error;
      setForm(initialForm); setPhoto(null); setCertificates([]);
      setShowForm(false);
      setNotice(lang === 'my'
        ? 'လျှောက်လွှာကို လက်ခံရရှိပါပြီ။ စီမံခန့်ခွဲသူမှ စစ်ဆေးပြီးနောက် ဆက်သွယ်ပေးပါမည်။'
        : 'Your application has been submitted. Our team will review it and contact you.');
    } catch (error) {
      setNotice(error.message || 'Unable to submit your application. Please try again.');
    } finally { setSending(false); }
  };

  const toggleCourse = (course) => setForm(current => ({
    ...current, courses: current.courses.includes(course)
      ? current.courses.filter(x => x !== course) : [...current.courses, course],
  }));

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>{p.sub}</PageHero>
      <section>
        <div className="wrap">
          <div className="teacher-intro">
            <div>
              <h2 className="disp h3">{lang === 'my' ? 'ကျွန်ုပ်တို့၏ ဆရာ၊ ဆရာမများ' : 'Meet our teachers'}</h2>
              <p className="muted">{lang === 'my' ? 'အတည်ပြုပြီးသော ဆရာ၊ ဆရာမများ၏ ကိုယ်ရေးအကျဉ်းကို ဤနေရာတွင် ဖော်ပြထားပါသည်။' : 'Meet the teachers whose profiles have been reviewed and approved by our team.'}</p>
            </div>
            <button type="button" className="btn btn-accent" onClick={() => { setShowForm(v => !v); setNotice(''); }}>
              {showForm ? (lang === 'my' ? 'ဖောင်ပိတ်ရန်' : 'Close form') : (lang === 'my' ? 'ဆရာအဖြစ် လျှောက်ထားရန်' : 'Create Teacher Profile')}
            </button>
          </div>

          {notice && <p className="teacher-notice" role="status">{notice}</p>}

          {showForm && (
            <div className="form-box teacher-apply">
              <div className="teacher-form-heading">
                <h2 className="disp h3">{lang === 'my' ? 'ဆရာ၊ ဆရာမ ကိုယ်ရေးအချက်အလက်' : 'Teacher profile application'}</h2>
                <p>{lang === 'my' ? 'အချက်အလက်များ ဖြည့်ပြီး စစ်ဆေးရန် ပေးပို့ပါ။ အတည်ပြုပြီးမှသာ ဝဘ်ဆိုက်တွင် ပေါ်ပါမည်။' : 'Complete the details below. Your profile will only appear publicly after admin approval.'}</p>
              </div>
              <form className="form" onSubmit={submitApplication}>
                <div className="teacher-form-grid">
                  <label>Full name *<input required maxLength="100" value={form.full_name} onChange={e => setForm({...form, full_name:e.target.value})} /></label>
                  <label>Nationality *<input required maxLength="80" value={form.nationality} onChange={e => setForm({...form, nationality:e.target.value})} /></label>
                  <label>Languages spoken *<input required placeholder="Burmese, Thai, English" value={form.languages} onChange={e => setForm({...form, languages:e.target.value})} /><small>Separate languages with commas.</small></label>
                  <label>Teaching experience (years) *<input required type="number" min="0" max="60" step="1" value={form.experience_years} onChange={e => setForm({...form, experience_years:e.target.value})} /></label>
                  <label className="span-two">Short introduction / biography *<textarea required rows="4" minLength="30" maxLength="1200" value={form.bio} onChange={e => setForm({...form, bio:e.target.value})} placeholder="Tell students about your teaching approach and experience." /></label>
                  <label className="span-two">Qualifications and certificates<textarea rows="3" maxLength="1200" value={form.qualifications} onChange={e => setForm({...form, qualifications:e.target.value})} placeholder="List relevant degrees, training and certificates." /></label>
                  <fieldset className="teacher-course-field span-two"><legend>Courses you can teach *</legend>
                    {courseOptions.map(course => <label className="teacher-check" key={course}><input type="checkbox" checked={form.courses.includes(course)} onChange={() => toggleCourse(course)} />{course}</label>)}
                  </fieldset>
                  <label>Email address *<input required type="email" maxLength="254" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></label>
                  <label>LINE ID / preferred contact<input maxLength="120" value={form.line_contact} onChange={e => setForm({...form, line_contact:e.target.value})} /></label>
                  <label className="span-two">Availability *<textarea required rows="3" minLength="3" maxLength="1000" value={form.availability} onChange={e => setForm({...form, availability:e.target.value})} placeholder="Example: Weekdays after 6 PM; weekends." /></label>
                  <label>Profile photo<input type="file" accept="image/jpeg,image/png,image/webp" required onChange={e => setPhoto(e.target.files?.[0] || null)} /><small>JPG, PNG or WebP · max 3 MB</small></label>
                  <label>Certificates / qualifications<input type="file" accept="application/pdf,image/jpeg,image/png" multiple onChange={e => setCertificates(Array.from(e.target.files || []))} /><small>PDF or image · max 10 MB each</small></label>
                </div>
                <p className="teacher-privacy">{lang === 'my' ? 'သင်၏ အီးမေးလ်၊ ဆက်သွယ်ရန်အချက်အလက်နှင့် လက်မှတ်ဖိုင်များကို အများမြင်နိုင်မည်မဟုတ်ပါ။' : 'Your email, contact details and certificate files are kept private and are only available to the admin reviewer.'}</p>
                <div className="teacher-form-actions">
                  <button type="submit" className="btn btn-accent" disabled={sending || form.courses.length === 0}>{sending ? 'Submitting…' : 'Submit for review'}</button>
                  <button type="button" className="btn btn-line" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {loading ? <p className="muted teacher-empty">Loading teacher profiles…</p> : teachers.length === 0 ? (
            <div className="teacher-empty">
              <div className="teacher-empty-mark" aria-hidden="true">✦</div>
              <h3 className="disp h3">{lang === 'my' ? 'ဆရာ၊ ဆရာမ မိတ်ဆက်စာ မရှိသေးပါ' : 'Teacher profiles are coming soon'}</h3>
              <p className="muted">{lang === 'my' ? 'အတည်ပြုပြီးသော ဆရာ၊ ဆရာမများ၏ အချက်အလက်များကို မကြာမီ ဖော်ပြပေးပါမည်။' : 'We are preparing our verified teacher introductions. Please check back soon.'}</p>
            </div>
          ) : (
            <div className="grid2 teacher-grid-live">
              {teachers.map((teacher, i) => {
                const photoUrl = teacher.photo_path ? supabase.storage.from('teacher-photos').getPublicUrl(teacher.photo_path).data.publicUrl : '';
                const open = !!openBio[teacher.id];
                return (
                  <article className="teacher" key={teacher.id}>
                    <div className="t-top">
                      {photoUrl ? <img className="avatar teacher-photo" src={photoUrl} alt={teacher.full_name} /> : <span className={'avatar' + (i % 2 ? ' alt' : '')} aria-hidden="true">{teacher.full_name.split(/\s+/).map(n => n[0]).slice(0,2).join('').toUpperCase()}</span>}
                      <div><h3 className="t-name">{teacher.full_name}</h3><span className="muted">{teacher.nationality}</span><span className="t-role">{teacher.experience_years} years teaching experience</span></div>
                    </div>
                    {teacher.languages?.length > 0 && <div className="tags"><span className="k">Speaks</span>{teacher.languages.map(l => <span className="tag" key={l}>{l}</span>)}</div>}
                    {teacher.courses?.length > 0 && <div className="tags"><span className="k">Teaches</span>{teacher.courses.map(c => <Link className="tag fill" to="/courses" style={{textDecoration:'none'}} key={c}>{c}</Link>)}</div>}
                    {teacher.qualifications && <p className="bio"><strong>Qualifications:</strong> {teacher.qualifications}</p>}
                    <p className="bio" hidden={!open}>{teacher.bio}</p>
                    <button type="button" className="small-btn" aria-expanded={open} onClick={() => setOpenBio(b => ({...b,[teacher.id]:!b[teacher.id]}))}>{open ? 'Show less' : 'Read introduction'}</button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
