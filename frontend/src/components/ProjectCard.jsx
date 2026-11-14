import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function ProjectCard({ project, index = 0, compact = false }) {
  const { t, to } = useI18n();
  const base = `projects.items.${project.slug}`;

  return (
    <article className={`project-card accent-${index % 3}${compact ? ' compact' : ''}`}>
      {!compact && (
        <img
          className={`project-cover${project.coverFit === 'contain' ? ' contain' : ''}`}
          src={project.cover}
          alt=""
          loading="lazy"
        />
      )}
      <div className="card-labels">
        <span className="mono-label">{t(`${base}.tag`)}</span>
        {project.status === 'wip' && <span className="wip-badge">{t('projects.wip')}</span>}
      </div>
      <h3>{t(`${base}.desc`)}</h3>
      <span className="project-name">{project.name}</span>
      {!compact && (
        <div className="project-mine">
          <strong>{t('projects.mine')}:</strong> {t(`${base}.mine`)}
        </div>
      )}
      {project.stack.length > 0 && (
        <ul className="chips" aria-label={t('projects.stack')}>
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
      {project.detail !== false && (
        <Link className="text-link" to={to(`/progetti/${project.slug}`)}>
          {t('projects.readMore')} →
        </Link>
      )}
    </article>
  );
}
