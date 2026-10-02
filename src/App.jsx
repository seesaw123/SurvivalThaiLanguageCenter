import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSettings } from './context/SettingsContext.jsx';
import { Footer, Header, usePageKey } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import Teachers from './pages/Teachers.jsx';
import Resources from './pages/Resources.jsx';
import Faq from './pages/Faq.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';

export default function App() {
  const { fading, t } = useSettings();
  const location = useLocation();
  const page = usePageKey();
  const [pageFade, setPageFade] = useState(false);

  // Brief fade + scroll to top whenever the page changes.
  useEffect(() => {
    setPageFade(true);
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => setPageFade(false));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  useEffect(() => {
    document.title = page === 'home' ? 'SurvivalThai' : `${t.pages[page]} · SurvivalThai`;
  }, [page, t]);

  return (
    <>
      <Header />
      <main id="app" className={fading || pageFade ? 'fading' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}
