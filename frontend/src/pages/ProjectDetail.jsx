import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { findProject } from '../data/projects.js';
import NotFound from './NotFound.jsx';

/* Pagina "case study" di un singolo progetto. */
export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, to } = useI18n();
  const project = findProject(slug);

  if (!project || project.detail === false) return <NotFound />;

  const base = `projects.items.${project.slug}`;

  return (
    <>
      <section className="page-head grid-paper">
        <div className="container">
          <Link className="text-link back" to={to('/progetti')}>← {t('projects.backToProjects')}</Link>
          <div className="card-labels">
            <span className="mono-label">{t(`${base}.tag`)}</span>
            {project.status === 'wip' && <span className="wip-badge">{t('projects.wip')}</span>}
          </div>
          <h1 className="detail-title">{t(`${base}.desc`)}</h1>
          <p className="project-name big">{project.name}</p>
        </div>
      </section>

      <section className="container section detail">
        <img className={`detail-cover${project.coverFit === 'contain' ? ' contain' : ''}`} src={project.cover} alt="" />

        <div className="detail-grid">
          <div className="detail-block">
            <h2>{t('projects.problem')}</h2>
            <p>{t(`${base}.problem`)}</p>
          </div>
          <div className="detail-block highlight">
            <h2>{t('projects.mine')}</h2>
            <p>{t(`${base}.mine`)}</p>
          </div>
          <div className="detail-block">
            <h2>{t('projects.result')}</h2>
            <p>{t(`${base}.result`)}</p>
          </div>
          <div className="detail-block">
            <h2>{t('projects.stack')}</h2>
            <ul className="chips outline">
              {project.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            {(project.repo || project.demo) && (
              <>
                <h2 className="mt">{t('projects.links')}</h2>
                <div className="button-row">
                  {project.repo && (
                    <a className="btn" href={project.repo} target="_blank" rel="noreferrer">{t('projects.repo')}</a>
                  )}
                  {project.demo && (
                    <a className="btn" href={project.demo} target="_blank" rel="noreferrer">{t('projects.demo')}</a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

      </section>
    </>
  );
}
