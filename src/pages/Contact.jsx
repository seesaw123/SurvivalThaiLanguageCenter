import { useSettings } from '../context/SettingsContext.jsx';
import { ChatIcon, ClockIcon, PhoneIcon, PinIcon } from '../components/Icons.jsx';
import { PageHero } from '../components/Layout.jsx';
import { ContactForm } from '../components/Forms.jsx';

function InfoCard({ icon, label, children }) {
  return (
    <div className="info-card">
      <span className="ic">{icon}</span>
      <div><small>{label}</small>{children}</div>
    </div>
  );
}

export default function Contact() {
  const { t } = useSettings();
  const p = t.contact;

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title}>
        {p.subA}<span className="th">สวัสดี</span>{p.subB}
      </PageHero>

      <section>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <div className="info">
              <h2 className="disp h2" style={{ marginBottom: 8 }}>{p.infoT}</h2>
              <InfoCard icon={<PinIcon />} label={p.addrL}><span>{p.addr}</span></InfoCard>
              <InfoCard icon={<PhoneIcon />} label={p.phoneL}><span>+95 9 000 000 000</span></InfoCard>
              <InfoCard icon={<ChatIcon />} label={p.lineL}>
                <span>@survivalthai</span><span>hello@survivalthai.example</span>
              </InfoCard>
              <InfoCard icon={<ClockIcon />} label={p.hoursL}><span>{p.h1}</span><span>{p.h2}</span></InfoCard>
            </div>
            <div className="form-box"><ContactForm /></div>
          </div>

          <div className="map">
            <iframe
              title="Star City - Thanlyin, Sales Gallery"
              src="https://www.google.com/maps?q=16.7765325,96.2285128&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
