# Portfolio – Luca Montefusco

Sito personale professionale: chi sono, progetti, CV e contatti.
Bilingue (italiano / inglese), con tema chiaro e scuro.

> **Stato:** struttura completa con testi e immagini segnaposto (`[...]`).
> I contenuti verranno inseriti dopo la laurea.

## Stack

- **Frontend:** React 18 + Vite
- **Routing:** React Router (URL separati per lingua: `/it/...`, `/en/...`)
- **Stile:** CSS puro con variabili (nessuna libreria UI)
- **Backend:** non necessario per ora (sito statico). Se in futuro servirà
  un form di contatto o un'API, si potrà aggiungere una cartella `backend/`
  (FastAPI) accanto a `frontend/`.

## Struttura

```
portfolio/
├── README.md
├── .gitignore
└── frontend/
    ├── index.html              # meta SEO/Open Graph, font, script anti-flash del tema
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   ├── favicon.svg
    │   ├── cv/                 # PDF del CV (IT e EN) – vedi LEGGIMI.md
    │   └── images/
    │       ├── hero/           # 4 immagini intorno al titolo
    │       ├── about/          # foto personale (scontornata)
    │       ├── projects/       # copertine e immagini dei progetti
    │       └── og-image.svg    # anteprima quando condividi il link
    └── src/
        ├── main.jsx
        ├── App.jsx             # definizione delle rotte
        ├── components/         # Navbar, LanguageSwitch, ThemeToggle, Marquee,
        │                       # ProjectCard, Contacts, CvMenu, SiteFooter, ScrollManager
        ├── pages/              # Home, Projects, ProjectDetail, NotFound
        ├── data/projects.js    # elenco progetti, strumenti, contatti
        ├── i18n/
        │   ├── languages.js    # lingue supportate e rilevamento
        │   ├── I18nContext.jsx # layout con lingua, hreflang, navbar e footer
        │   └── locales/        # it.json, en.json (tutti i testi del sito)
        ├── theme/ThemeContext.jsx
        └── styles/
            ├── variables.css   # palette dei due temi
            └── global.css      # stile del sito
```

## Avvio

```bash
cd frontend
npm install
npm run dev       # sviluppo su http://localhost:5173
npm run build     # build di produzione in frontend/dist
npm run preview   # anteprima della build
```

## Pagine

| URL | Contenuto |
|---|---|
| `/` | Reindirizza a `/it` o `/en` (scelta salvata, altrimenti lingua del browser) |
| `/:lang` | Home: hero con riga esplicativa e menu CV (IT/EN), chi sono, contatti |
| `/:lang/progetti` | Tutti i progetti (principali + "altri progetti") |
| `/:lang/progetti/:slug` | Case study: problema, cosa ho fatto io, risultato, strumenti, link, immagini |
| altro | Pagina 404 nella lingua corrente |

## Dove modificare cosa

- **Testi:** `src/i18n/locales/it.json` e `en.json`. Ogni `[...]` è un segnaposto.
- **Progetti:** `src/data/projects.js` (nome, stack, link, immagini) +
  testi in `projects.items.<slug>` nei file di traduzione.
  Per aggiungere un progetto: nuovo oggetto in `PROJECTS` con uno `slug`,
  più la stessa chiave nei due JSON.
- **Contatti e CV:** `CONTACTS` in `src/data/projects.js`. Il CV si scarica solo dal menu sotto il titolo (`CvMenu.jsx`).
  L'email è divisa in due parti e compare solo dopo il click (anti-spam).
- **Immagini:** sostituisci i file in `public/images/` mantenendo i nomi,
  oppure aggiorna i percorsi.
- **Colori:** `src/styles/variables.css`.

## Funzionalità già pronte

- Tema chiaro/scuro: parte da `prefers-color-scheme`, salva la scelta,
  nessun flash al caricamento.
- Lingua IT/EN: URL separati, tag `hreflang`, `<html lang>` aggiornato,
  scelta salvata.
- Animazioni morbide (immagini fluttuanti, nastro scorrevole, transizione tra
  pagine), disattivate se l'utente preferisce meno movimento.
- Responsive, link "vai al contenuto", focus visibile, bottoni reali.

## Da fare

- [ ] Inserire testi, foto, immagini dei progetti e CV in PDF
- [ ] Scrivere la riga esplicativa della home
- [ ] Per ogni progetto: "cosa ho fatto io", risultato, link al repository
- [ ] Verificare i README dei repository collegati
- [ ] Valutare il giapponese (aggiungere `locales/ja.json`, vedi `languages.js`)
- [ ] Scegliere dominio e hosting (Netlify, Vercel o GitHub Pages)

## Nota sulla pubblicazione

È una single-page app: l'hosting deve rimandare tutte le rotte a `index.html`.

- **Netlify:** file `frontend/public/_redirects` con `/*  /index.html  200`
- **Vercel:** `vercel.json` con un rewrite verso `/index.html`
- **GitHub Pages:** copiare `index.html` in `404.html` dopo la build

Per una SEO migliore (ogni pagina già pronta in HTML) si potrà valutare
in seguito il prerendering o il passaggio ad Astro.
