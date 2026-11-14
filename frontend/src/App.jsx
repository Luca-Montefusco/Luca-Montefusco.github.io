import { Navigate, Route, Routes } from 'react-router-dom';
import { I18nLayout } from './i18n/I18nContext.jsx';
import { detectLanguage } from './i18n/languages.js';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import NotFound from './pages/NotFound.jsx';

/*
  Struttura degli URL:
    /            -> reindirizza a /it o /en (scelta salvata o lingua del browser)
    /:lang       -> Home
    /:lang/progetti          -> elenco progetti
    /:lang/progetti/:slug    -> pagina del singolo progetto (case study)
*/
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectLanguage()}`} replace />} />
      <Route path="/:lang" element={<I18nLayout />}>
        <Route index element={<Home />} />
        <Route path="progetti" element={<Projects />} />
        <Route path="progetti/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
