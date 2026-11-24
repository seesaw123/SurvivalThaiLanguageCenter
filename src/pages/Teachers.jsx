import { useEffect, useState } from 'react';
import { Link } from '../components/Link.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { supabase } from '../lib/supabaseClient.js';
import { PageHero } from '../components/Layout.jsx';

// Approved profiles from the last visit, so returning to this page is instant.
let teacherCache = null;

export default function Teachers() {
  const { t, lang } = useSettings();
  const p = t.teachers;
  const [teachers, setTeachers] = useState(teacherCache || []);
  const [loading, setLoading] = useState(teacherCache === null);
  const [openBio, setOpenBio] = useState({});
  const loadTeachers = async () => {
    const { data, error } = await supabase.from('teacher_profiles')
      .select('id, full_name, nationality, languages, bio, experience_years, qualifications, courses, photo_path')
      .order('created_at', { ascending: true });
    if (!error) { teacherCache = data || []; setTeachers(teacherCache); }
    setLoading(false);
  };

  useEffect(() => { loadTeachers(); }, []);

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
          </div>


          {loading ? (
            <div className="grid2" aria-busy="true">
              <span className="sr-only" role="status">{lang === 'my' ? 'ဆရာ၊ ဆရာမ အချက်အလက်များ ဖွင့်နေသည်…' : 'Loading teacher profiles…'}</span>
              {[0, 1].map((k) => (
                <div className="teacher skel-card" key={k} aria-hidden="true">
                  <div className="t-top"><span className="avatar" /><div className="skel-lines"><span className="skel" style={{ width: '60%', height: 22 }} /><span className="skel" style={{ width: '40%' }} /><span className="skel" style={{ width: '50%' }} /></div></div>
                  <span className="skel" style={{ width: '80%' }} />
                  <span className="skel" style={{ width: '65%' }} />
                  <span className="skel" style={{ width: 150, height: 40, borderRadius: 999 }} />
                </div>
              ))}
            </div>
          ) : teachers.length === 0 ? (
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
    </>
  );
}
