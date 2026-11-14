import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext.jsx';
import { TOOLS } from '../data/projects.js';
import Contacts from '../components/Contacts.jsx';
import CvMenu from '../components/CvMenu.jsx';
import { HERO_PATH } from '../data/heroPath.js';

/* Immagini intorno al titolo: sostituisci i file in /public/images/hero/ */
/*const HERO_IMAGES = [
  { src: '/images/hero/hero-1.svg', className: 'hero-img pos-1' },
  { src: '/images/hero/hero-2.svg', className: 'hero-img pos-2' },
  { src: '/images/hero/hero-3.svg', className: 'hero-img pos-3' },
  { src: '/images/hero/hero-4.svg', className: 'hero-img pos-4' },
]; */


function Timeline({ title, items }) {
  return (
    <div className="timeline">
      <h3>{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="timeline-row">
          <span className="timeline-years"><span className="years-text">{item.years}</span></span>
          <div>
            <strong>{item.role}</strong>
            {item.place && <><br />{item.place}</>}
            {item.desc && <p className="timeline-desc">{item.desc}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { t, to } = useI18n();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero grid-paper">
        <svg className="hero-line" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
          {/* Anello chiuso con riccioli e onde (generato da scripts/hero_path.py) */}
          <path d={HERO_PATH} vectorEffect="non-scaling-stroke" />
        </svg>

        {/* {HERO_IMAGES.map((img, i) => (
          <div key={i} className={img.className}>
            <img className="float" src={img.src} alt={t('hero.imageAlt')} style={{ animationDelay: `${-i * 1.5}s` }} />
          </div>
        ))} */}

        <div className="hero-content">
          <span className="stamp">{t('hero.stamp')}</span>
          <div className="hero-title-wrap">
            <h1 className="hero-title">
              {t('hero.titleLine1')}
              <br />
              {t('hero.titleLine2')}
            </h1>
            <span className="name-sticker">{t('hero.name')}</span>
            <span className="hero-meta hero-year">{t('hero.year')}</span>
            <span className="hero-meta hero-place">{t('hero.place')}</span>
          </div>
          <p className="hero-tagline">{t('hero.tagline')}</p>
          <div className="button-row center">
            <Link className="btn btn-primary" to={to('/progetti')}>{t('hero.ctaProjects')}</Link>
            <CvMenu />
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section id="about" className="about grid-paper small">
        <div className="container about-inner">
          <div className="about-photo">
            <div className="photo-frame">
              <img src="/images/about/photo.webp" alt={t('about.photoAlt')} />
            </div>
            <span className="stamp tilt-right">{t('about.stamp')}</span>
            <div className="timeline">
              <h3>{t('about.toolsTitle')}</h3>
              <ul className="chips outline">
                {TOOLS.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </div>

          <div className="about-text">
            <h2 className="section-title">
              {t('about.greeting')} <mark>{t('about.name')}</mark>.
            </h2>
            {t('about.p1') && <p>{t('about.p1')}</p>}
            {t('about.p2') && <p>{t('about.p2')}</p>}
            <p className="now">{t('about.now')}</p>

            {/* Formazione, poi certificazioni, poi esperienze */}
            <div className="about-timelines">
              <Timeline title={t('about.educationTitle')} items={t('about.education')} />
              <Timeline title={t('about.certificationsTitle')} items={t('about.certifications')} />
              <Timeline title={t('about.experienceTitle')} items={t('about.experience')} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTATTI (subito dopo l'About) ---------- */}
      <Contacts />
    </>
  );
}
