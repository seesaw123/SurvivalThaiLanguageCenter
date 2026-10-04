import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
// Self-hosted so the Thai glyphs on the letter cube always render correctly,
// even when the Google Fonts CDN is blocked or fails to load.
import '@fontsource/noto-serif-thai/500.css';
import '@fontsource/noto-serif-thai/700.css';
import './styles.css';

// HashRouter (#/courses) works on GitHub Pages without any server rewrite rules.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </HashRouter>
  </React.StrictMode>
);
