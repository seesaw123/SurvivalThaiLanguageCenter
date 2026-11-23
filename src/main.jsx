import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import Teachers from './pages/Teachers.jsx';
import Resources from './pages/Resources.jsx';
import Faq from './pages/Faq.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin.jsx';
// Self-hosted so the Thai glyphs on the letter cube always render correctly,
// even when the Google Fonts CDN is blocked or fails to load.
import '@fontsource/noto-serif-thai/500.css';
import '@fontsource/noto-serif-thai/700.css';
import './styles.css';

// Hash URLs (#/courses) work on GitHub Pages without any server rewrite rules.
// A "data router" is used so links can animate with View Transitions and the
// Back button can restore the previous scroll position (<ScrollRestoration> in App).
const router = createHashRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/courses', element: <Courses /> },
      { path: '/teachers', element: <Teachers /> },
      { path: '/resources', element: <Resources /> },
      { path: '/faq', element: <Faq /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      { path: '/admin', element: <Admin /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </SettingsProvider>
  </React.StrictMode>
);
