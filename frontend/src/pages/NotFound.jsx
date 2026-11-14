import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function NotFound() {
  const { t, to } = useI18n();
  return (
    <section className="not-found grid-paper">
      <div className="container">
        <h1 className="display-title">{t('notFound.title')}</h1>
        <p className="lead">{t('notFound.text')}</p>
        <Link className="btn btn-primary" to={to()}>{t('notFound.back')}</Link>
      </div>
    </section>
  );
}
