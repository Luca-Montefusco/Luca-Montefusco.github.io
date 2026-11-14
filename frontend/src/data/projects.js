/*
  Dati dei progetti che non dipendono dalla lingua.
  I testi (descrizione, "cosa ho fatto io", ecc.) sono nei file
  src/i18n/locales/*.json, sotto projects.items.<slug>.

  featured: true  -> card grande nella pagina Progetti
  featured: false -> sezione "Altri progetti"
  coverFit: 'contain' -> per loghi/illustrazioni: immagine intera invece che ritagliata
*/
/*
  Ordine = ordine di visualizzazione.
  status: 'wip'     -> etichetta "In corso" sulla card e nella pagina
  detail: false     -> nessuna pagina di dettaglio (solo la card)
  coverFit: 'contain' -> immagine mostrata intera (grafici, loghi) invece che ritagliata
*/
const IMG = '/images/projects';
const GH = 'https://github.com/Luca-Montefusco';

export const PROJECTS = [
  /* ---- Progetti principali ---- */
  {
    slug: 'tesi',
    name: 'Machine Learning for the Characterization of the Earthquake Nucleation Process',
    featured: true,
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'NumPy', 'SciPy', 'QDYN'],
    repo: `${GH}/Machine-Learning-for-the-Characterization-of-the-Earthquake-Nucleation-Process`,
    demo: null,
    cover: `${IMG}/tesi/cover.webp`,
  },
  {
    slug: 'retroshop',
    name: 'RetroShop',
    featured: true,
    stack: ['React', 'Vite', 'Bootstrap', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'WebSocket'],
    repo: `${GH}/Web-Technologies-Site`,
    demo: null,
    cover: `${IMG}/retroshop/logo.png`,
    coverFit: 'contain',
  },
  {
    slug: 'from-music-to-image',
    name: 'Ai-rceus Pokédex',
    featured: true,
    stack: ['Python', 'PyTorch', 'torchvision', 'librosa'],
    repo: `${GH}/Ai-rceus-Pokedex`,
    demo: null,
    cover: `${IMG}/pokedex/cover.webp`,
    coverFit: 'contain',
  },
  {
    slug: 'tsunami-assessment',
    name: 'Real-Time Tsunami Potential Assessment Using Machine Learning',
    featured: true,
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'ObsPy', 'pandas'],
    repo: `${GH}/Real-Time-Tsunami-Potential-Assessment-Using-Machine-Learning`,
    demo: null,
    cover: `${IMG}/tsunami/cover.webp`,
    coverFit: 'contain',
  },

  /* ---- Altri progetti ---- */
  {
    slug: 'ehi-box',
    name: 'Ehi Box',
    featured: false,
    status: 'wip',
    detail: false,
    stack: [],
    repo: null,
    demo: null,
    cover: null,
  },
  {
    slug: 'gnn-graph-coloring',
    name: 'GNN Graph Coloring Potts',
    featured: false,
    stack: ['Python', 'PyTorch', 'PyTorch Geometric', 'NetworkX'],
    repo: `${GH}/GNN-Graph-Coloring-Potts`,
    demo: null,
    cover: `${IMG}/gnn/cover.webp`,
    coverFit: 'contain',
  },
];

export const TOOLS = [
  'Python', 'NumPy', 'pandas', 'matplotlib', 'scikit-learn', 'PyTorch',
  'React', 'FastAPI', 'PostgreSQL',
  'Git', 'GitHub', 'Jupyter Notebook', 'LaTeX',
];

/* Contatti: l'email è divisa in parti e ricomposta solo al click (anti-bot). */
export const CONTACTS = {
  emailUser: 'lucamontefusco2004',
  emailDomain: 'gmail.com',
  github: 'https://github.com/Luca-Montefusco',
  linkedin: 'https://www.linkedin.com/in/luca-montefusco-11l04',
  cvIt: '/cv/CV_Luca_Montefusco_IT.pdf',
  cvEn: '/cv/CV_Luca_Montefusco_EN.pdf',
};

export function findProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
