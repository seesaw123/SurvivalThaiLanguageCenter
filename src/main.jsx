import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
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
