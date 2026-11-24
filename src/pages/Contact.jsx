import { useEffect, useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { CONTACT_INFO } from '../data/content.js';
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';
import { ContactForm } from '../components/Forms.jsx';
import './Contact.css';

const MessengerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.4 2 2 6.1 2 11.3c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.6 0 10-4.1 10-9.3S17.6 2 12 2zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.4 5.8z" />
  </svg>
);
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);

// Current open/closed state in Yangon time, from CONTACT_INFO.hours.
function openState() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Yangon', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  const now = `${parts.hour === '24' ? '00' : parts.hour}:${parts.minute}`;
  const slotFor = (d) => CONTACT_INFO.hours.find((h) => h.days.includes(d));
  const today = slotFor(day);
  if (today && now >= today.open && now < today.close) return { open: true, time: today.close };
  if (today && now < today.open) return { open: false, when: 'today', time: today.open };
  const tomorrow = slotFor((day + 1) % 7);
  return { open: false, when: 'tomorrow', time: tomorrow ? tomorrow.open : '' };
}

export default function Contact() {
  const { t, lang } = useSettings();
  const p = t.contact;
  const [status, setStatus] = useState(openState);
  useEffect(() => {
    const id = setInterval(() => setStatus(openState()), 60000);
    return () => clearInterval(id);
  }, []);

  const { messenger, phone, email, lat, lng, hours } = CONTACT_INFO;
  const channels = [
    messenger && { key: 'fb', href: messenger, icon: <MessengerIcon />, title: p.msgr, sub: p.msgrS, external: true },
    phone && { key: 'ph', href: 'tel:' + phone.replace(/[^\d+]/g, ''), icon: <PhoneIcon />, title: p.call, sub: phone },
    email && { key: 'ml', href: 'mailto:' + email, icon: <MailIcon />, title: p.mail, sub: email },
  ].filter(Boolean);
  const fmt = (h) => (lang === 'my' ? h.replace(/\d/g, (d) => '၀၁၂၃၄၅၆၇၈၉'[d]) : h);

  return (
    <>
      <section className="band-dark ct-hero">
        <div className="wrap">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1 className="disp h1">{p.title}</h1>
          <p className="lead">{p.sub}</p>
          <span className={'ct-status' + (status.open ? ' open' : '')}>
            <i aria-hidden="true" />{status.open ? p.openNow(status.time) : p.closedUntil(status.when, status.time)}
          </span>
        </div>
      </section>

      <div className="wrap">
        {channels.length > 0 && (
          <div className="ct-channels" style={{ '--n': channels.length }}>
            {channels.map((c) => (
              <a key={c.key} className={'ct-ch ' + c.key} href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="ic">{c.icon}</span>
                <span className="txt"><b>{c.title}</b><span>{c.sub}</span></span>
                <span className="go" aria-hidden="true"><ArrowIcon /></span>
              </a>
            ))}
          </div>
        )}

        <div className={'ct-main' + (channels.length ? '' : ' no-channels')}>
          <div className="ct-formcard"><ContactForm /></div>

          <aside className="ct-visit">
            <div className="ct-map">
              <iframe
                title={p.visitT}
                src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="ct-visit-body">
              <h2 className="disp h3">{p.visitT}</h2>
              <div className="ct-row"><span className="ic"><PinIcon /></span><div><small>{p.addrL}</small><b>{p.addr}</b></div></div>
              <div className="ct-row"><span className="ic"><ClockIcon /></span><div><small>{p.hoursL}</small>
                <div className="ct-hours">
                  {hours.map((h, i) => (
                    <span key={i} className="pair"><span>{i === 0 ? p.wk : p.we}</span><b>{fmt(h.open)}–{fmt(h.close)}</b></span>
                  ))}
                </div>
              </div></div>
              <a className="btn btn-line" href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} target="_blank" rel="noreferrer">{p.directions} ↗</a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
