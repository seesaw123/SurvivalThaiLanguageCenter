import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { COURSES } from '../data/content.js';

// Admin-only "Add a teacher" form (shown on the Admin page after sign-in).
// It stores the teacher in teacher_applications (private details: email, contact,
// availability, certificates) and immediately publishes the public part to
// teacher_profiles, the same way approving an application does.

const initialForm = {
  full_name: '', nationality: '', languages: '', bio: '', experience_years: '',
  qualifications: '', courses: [], email: '', line_contact: '', availability: '',
};

// Courses a teacher can teach: the CEFR levels plus the Intensive course.
const courseOptions = COURSES.map((c) => (c.code === 'INT' ? c.name.en : `${c.code} ${c.name.en}`));

export default function AddTeacherForm({ onCreated, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [publish, setPublish] = useState(true);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');

  const toggleCourse = (course) => setForm((current) => ({
    ...current,
    courses: current.courses.includes(course) ? current.courses.filter((x) => x !== course) : [...current.courses, course],
  }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setNotice('');
    try {
      if (!photo) throw new Error('Please upload a profile photo.');
      if (photo.size > 3 * 1024 * 1024) throw new Error('Profile photo must be 3 MB or smaller.');
      if (certificates.some((file) => file.size > 10 * 1024 * 1024)) throw new Error('Each certificate file must be 10 MB or smaller.');
      const languageList = form.languages.split(',').map((x) => x.trim()).filter(Boolean);
      if (languageList.length < 1 || languageList.length > 6) throw new Error('Please enter between 1 and 6 languages.');

      const ext = photo.name.split('.').pop().toLowerCase();
      const photoPath = `applications/${crypto.randomUUID()}/profile.${ext}`;
      const { error: photoError } = await supabase.storage.from('teacher-photos').upload(photoPath, photo, { contentType: photo.type });
      if (photoError) throw photoError;
      const certificatePaths = [];
      for (const file of certificates) {
        const certExt = file.name.split('.').pop().toLowerCase();
        const path = `applications/${crypto.randomUUID()}/${crypto.randomUUID()}.${certExt}`;
        const { error } = await supabase.storage.from('teacher-certificates').upload(path, file, { contentType: file.type });
        if (error) throw error;
        certificatePaths.push(path);
      }

      const payload = {
        full_name: form.full_name.trim(), nationality: form.nationality.trim(),
        languages: languageList,
        bio: form.bio.trim(), experience_years: Number(form.experience_years),
        qualifications: form.qualifications.trim(),
        courses: form.courses, email: form.email.trim(), contact: form.line_contact.trim() || 'No LINE contact provided',
        availability: form.availability.trim(), photo_path: photoPath,
        certificate_paths: certificatePaths, status: 'pending',
      };
      const { data: application, error } = await supabase.from('teacher_applications').insert(payload).select().single();
      if (error) throw error;

      if (publish) {
        const { error: profileError } = await supabase.from('teacher_profiles').upsert({
          application_id: application.id,
          full_name: application.full_name,
          nationality: application.nationality,
          bio: application.bio,
          languages: application.languages,
          experience_years: application.experience_years,
          courses: application.courses,
          photo_path: application.photo_path,
          qualifications: application.qualifications || '',
        }, { onConflict: 'application_id' });
        if (profileError) throw new Error(`Teacher saved, but publishing failed: ${profileError.message}. You can approve it in the list below.`);
        const { error: statusError } = await supabase.from('teacher_applications')
          .update({ status: 'approved', reviewed_at: new Date().toISOString() }).eq('id', application.id);
        if (statusError) throw statusError;
      }

      setForm(initialForm); setPhoto(null); setCertificates([]);
      e.target.reset();
      setNotice(publish ? 'Teacher added and published on the Teachers page.' : 'Teacher saved as pending. Approve it in the list below to publish.');
      onCreated?.();
    } catch (error) {
      setNotice(error.message || 'Unable to save the teacher. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="form-box teacher-apply">
      <div className="teacher-form-heading">
        <h2 className="disp h3">Add a teacher</h2>
        <p>Fill in the teacher’s details. Email, contact, availability and certificates stay private to admins.</p>
      </div>
      {notice && <p className="teacher-notice" role="status">{notice}</p>}
      <form className="form" onSubmit={submit}>
        <div className="teacher-form-grid">
          <label>Full name *<input required maxLength="100" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
          <label>Nationality *<input required maxLength="80" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></label>
          <label>Languages spoken *<input required placeholder="Burmese, Thai, English" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} /><small>Separate languages with commas.</small></label>
          <label>Teaching experience (years) *<input required type="number" min="0" max="60" step="1" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} /></label>
          <label className="span-two">Short introduction / biography *<textarea required rows="4" minLength="30" maxLength="1200" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Teaching approach and experience, shown to students." /></label>
          <label className="span-two">Qualifications and certificates<textarea rows="3" maxLength="1200" value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} placeholder="Relevant degrees, training and certificates." /></label>
          <fieldset className="teacher-course-field span-two"><legend>Courses they teach *</legend>
            {courseOptions.map((course) => <label className="teacher-check" key={course}><input type="checkbox" checked={form.courses.includes(course)} onChange={() => toggleCourse(course)} />{course}</label>)}
          </fieldset>
          <label>Email address *<input required type="email" maxLength="254" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>LINE ID / preferred contact<input maxLength="120" value={form.line_contact} onChange={(e) => setForm({ ...form, line_contact: e.target.value })} /></label>
          <label className="span-two">Availability *<textarea required rows="3" minLength="3" maxLength="1000" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} placeholder="Example: Weekdays after 6 PM; weekends." /></label>
          <label>Profile photo *<input type="file" accept="image/jpeg,image/png,image/webp" required onChange={(e) => setPhoto(e.target.files?.[0] || null)} /><small>JPG, PNG or WebP · max 3 MB</small></label>
          <label>Certificates / qualifications<input type="file" accept="application/pdf,image/jpeg,image/png" multiple onChange={(e) => setCertificates(Array.from(e.target.files || []))} /><small>PDF or image · max 10 MB each</small></label>
          <label className="teacher-check span-two"><input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />Publish on the Teachers page right away</label>
        </div>
        <div className="teacher-form-actions">
          <button type="submit" className="btn btn-accent" disabled={sending || form.courses.length === 0}>{sending ? 'Saving…' : 'Save teacher'}</button>
          {onCancel && <button type="button" className="btn btn-line" onClick={onCancel}>Close</button>}
        </div>
      </form>
    </div>
  );
}
