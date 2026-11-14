import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { PROJECTS } from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import Marquee from '../components/Marquee.jsx';

/*
  Animazione di apertura (tutta in CSS, vedi "Apertura pagina Progetti"
  in global.css):
  1. un "sipario" colorato con la scritta Progetti copre lo schermo e scorre via verso l'alto;
  2. il titolo sale dal basso, lettera per lettera;
  3. le card "cadono sul tavolo" una dopo l'altra, ruotate, e si raddrizzano;
  4. il nastro scorrevole (tra progetti principali e altri) entra da sinistra.
*/
export default function Projects() {
  const { t, to } = useI18n();
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const title = t('projects.title');

  return (
    <div className="projects-page">
      <div className="curtain" aria-hidden="true">
        <span>{title}</span>
      </div>

      <section className="page-head grid-paper">
        <div className="container">
          <Link className="text-link back reveal-fade" to={to()}>← {t('projects.back')}</Link>
          <h1 className="display-title split-title" aria-label={title}>
            {[...title].map((ch, i) => (
              <span key={i} className="char-mask" aria-hidden="true">
                <span className="char" style={{ '--i': i }}>{ch === ' ' ? ' ' : ch}</span>
              </span>
            ))}
          </h1>
          <p className="lead reveal-fade">{t('projects.intro')}</p>
        </div>
      </section>

      <section className="container section">
        <div className="project-grid">
          {featured.map((p, i) => (
            <div key={p.slug} className="card-drop" style={{ '--i': i }}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Nastro tra i progetti principali e gli altri */}
      <div className="marquee-in">
        <Marquee />
      </div>

      {others.length > 0 && (
        <section className="container section">
          <h2 className="section-title">{t('projects.othersTitle')}</h2>
          <div className="project-grid">
            {others.map((p, i) => (
              <div key={p.slug} className="card-drop" style={{ '--i': featured.length + i }}>
                <ProjectCard project={p} index={i + 1} compact />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
