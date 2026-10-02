# SurvivalThai

Bilingual (English / Myanmar) website for **SurvivalThai**, a Thai language center.
Built with **React 18 + Vite + React Router**.

## Getting started

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build in ./dist
npm run preview   # preview the production build
```

## Project structure

```
src/
├── main.jsx                 # entry: router + settings provider
├── App.jsx                  # routes, page fade, document title
├── styles.css               # all styles + the 5 color themes (CSS variables)
├── utils.js                 # Myanmar digits, localStorage, scroll helpers
├── context/
│   └── SettingsContext.jsx  # language (en/my) + color theme, saved in localStorage
├── data/
│   ├── content.js           # courses, schedule, teachers, phrases, tones, FAQ, resources
│   └── i18n.js              # all UI text in English (en) and Myanmar (my)
├── components/
│   ├── Layout.jsx           # Header, menu, language toggle, theme swatches, Footer, shared sections
│   ├── Icons.jsx            # SVG icons + phrase-card illustrations
│   ├── LetterCube.jsx       # 3D Thai consonant cube
│   ├── PhraseCards.jsx      # flip cards
│   ├── ToneExplorer.jsx     # five-tone pitch contour
│   └── Forms.jsx            # trial + contact forms (demo, not connected yet)
└── pages/
    Home · Courses · Teachers · Resources · Faq · Contact · About
```

## Common edits

| To change… | Edit |
|---|---|
| Prices, schedule, teachers, FAQ, resources | `src/data/content.js` |
| Any button, heading or paragraph text | `src/data/i18n.js` (both `en` and `my`) |
| Colors / add a theme | `src/styles.css` (`body[data-palette="…"]`) + `PALETTES` in `content.js` |
| Add a page | create `src/pages/X.jsx`, add a `<Route>` in `App.jsx`, add the key to `ORDER` and `pages` in `i18n.js` |

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this project to the `main` branch.
2. In the repo go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` builds and publishes the site to `https://<user>.github.io/<repo>/`.

Routes use hash URLs (`#/courses`), so page links and refreshes work on GitHub Pages without extra setup.

## Still to do before launch

- Replace demo data: prices, schedule, teacher profiles, address, phone, LINE ID, email
- Connect the forms (e.g. Formspree, Google Forms, or your own API) in `src/components/Forms.jsx`
- Link real files for Learning resources (`ResourceCard` in `src/pages/Resources.jsx`)
- Add a real map on the Contact page
- Have a native speaker review the Myanmar copy
