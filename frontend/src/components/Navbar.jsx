import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import LanguageSwitch from './LanguageSwitch.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const { t, to } = useI18n();

  return (
    <header className="navbar container">
      <Link to={to()} className="logo" aria-label={t('nav.home')}>
        <span>luca</span>
        <span>montefusco</span>
      </Link>

      <nav className="nav-links" aria-label="Menu">
        <Link to={to('#about')}>{t('nav.about')}</Link>
        <NavLink to={to('/progetti')}>{t('nav.projects')}</NavLink>
        <Link to={to('#contatti')}>{t('nav.contacts')}</Link>
      </nav>

      <div className="nav-actions">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
}
