import { useI18n } from '../i18n/I18nContext.jsx';

export default function SiteFooter() {
  const { t, lang } = useI18n();
  return (
    <footer className="site-footer container">
      <span>{t('footer.rights')}</span>
      <span>{lang.toUpperCase()}</span>
    </footer>
  );
}
