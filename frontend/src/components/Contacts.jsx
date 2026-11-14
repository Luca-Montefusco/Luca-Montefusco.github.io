import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { CONTACTS } from '../data/projects.js';

export default function Contacts() {
  const { t } = useI18n();
  const [email, setEmail] = useState(null);

  /* L'indirizzo non compare nell'HTML finché l'utente non clicca (anti-spam). */
  const revealEmail = () => setEmail(`${CONTACTS.emailUser}@${CONTACTS.emailDomain}`);

  return (
    <section id="contatti" className="contacts grid-paper">
      <div className="container contacts-inner">
        <h2 className="display-title">{t('contacts.title')}</h2>

        <div className="button-row">
          {email ? (
            <a className="btn btn-primary" href={`mailto:${email}`}>{email}</a>
          ) : (
            <button type="button" className="btn btn-primary" onClick={revealEmail}>
              {t('contacts.emailLabel')}
            </button>
          )}
          <a className="btn" href={CONTACTS.github} target="_blank" rel="noreferrer">
            {t('contacts.github')}
          </a>
          <a className="btn" href={CONTACTS.linkedin} target="_blank" rel="noreferrer">
            {t('contacts.linkedin')}
          </a>
        </div>
      </div>
    </section>
  );
}
