import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useSettings } from './context/SettingsContext.jsx';
import { Footer, Header, usePageKey } from './components/Layout.jsx';

// Shared shell for every page. Page changes animate via View Transitions (see the
// site Link component); <ScrollRestoration> starts new pages at the top and puts
// Back/Forward visits back where the visitor left off.
export default function App() {
  const { fading, t } = useSettings();
  const page = usePageKey();

  useEffect(() => {
    document.title = page === 'home' ? 'SurvivalThai' : `${t.pages[page]} · SurvivalThai`;
  }, [page, t]);

  return (
    <>
      <Header />
      <main id="app" className={fading ? 'fading' : ''}>
        <Outlet />
        <Footer />
      </main>
      <ScrollRestoration />
    </>
  );
}
