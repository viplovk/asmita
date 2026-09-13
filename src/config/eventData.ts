import { EventCoordinator, ExperienceTheme } from '../types';

export const EVENT_DETAILS = {
  name: 'ASMITA',
  tagline: 'ETHNIC DAY',
  subtitle: 'A Celebration of Culture, Identity & Expression',
  devanagariName: 'अस्मिता',
  dateString: 'September 16, 2026 • Wednesday',
  dateISO: '2026-09-16T15:00:00+05:30', // Target date for countdown
  day: 'WEDNESDAY',
  dateFormatted: 'SEPTEMBER 16, 2026',
  venue: 'Seminar Hall, F Block',
  institution: 'IEC College of Engineering & Technology',
  location: 'Greater Noida, Uttar Pradesh',
  fullVenue: 'Seminar Hall, F Block, IEC College of Engineering & Technology, Knowledge Park I, Greater Noida',
  presentedBy: 'Spearheads Student Council',
  governingBody: 'The IECian Cultural Society Network Under Student Council',
  footerMessage: 'Join us for an evening of culture, tradition & celebration. Traditional attire encouraged.',
  attireEncouragement: 'Traditional attire encouraged',
};

export const COORDINATORS: EventCoordinator[] = [
  {
    role: 'Faculty Coordinator',
    name: 'Amit Kumar Yadav',
    phone: '+917388362269',
    displayPhone: '+91 73883 62269',
  },
  {
    role: 'Student Coordinator',
    name: 'Kavya Aulakh',
    title: 'Vice President, Spearheads',
    organization: 'Spearheads Student Council',
    phone: '+917827978907',
    displayPhone: '+91 78279 78907',
  },
];

export const EXPERIENCE_THEMES: ExperienceTheme[] = [
  {
    id: 'tradition',
    title: 'TRADITION',
    subtitle: 'Timeless Roots & Ancestral Heritage',
    description: 'Honoring centuries of craftsmanship, indigenous handlooms, and generational rituals woven into the fabric of our diverse homeland.',
    accentColor: '#B65A3C',
    materialLook: 'terracotta',
    highlights: ['Handloom Weaves', 'Indigenous Motifs', 'Ancestral Pride'],
  },
  {
    id: 'style',
    title: 'STYLE',
    subtitle: 'Sartorial Elegance & Drapes',
    description: 'An editorial celebration of regal silhouettes, raw silk textures, aged brass ornaments, and contemporary ethnic statements.',
    accentColor: '#B08A45',
    materialLook: 'brass',
    highlights: ['Handcrafted Silhouettes', 'Brass Ornaments', 'Textile Artistry'],
  },
  {
    id: 'culture',
    title: 'CULTURE',
    subtitle: 'Plurality of Living Expressions',
    description: 'Where every state, dialect, and folk tradition converges into one ceremonial evening of collective identity and shared pride.',
    accentColor: '#C08A32',
    materialLook: 'parchment',
    highlights: ['Pan-Indian Harmony', 'Folk Narratives', 'Living Heritage'],
  },
  {
    id: 'celebration',
    title: 'CELEBRATION',
    subtitle: 'Festive Kinship & Joyous Gathering',
    description: 'A shared sanctuary of festive rhythm, music, friendship, and unforgettable memories captured in your finest traditional attire.',
    accentColor: '#8E3F2C',
    materialLook: 'wood',
    highlights: ['Ceremonial Diya', 'Kinship & Camaraderie', 'Unforgettable Evening'],
  },
];

export const ATTIRE_INSPIRATIONS = [
  {
    category: 'Handloom Sarees & Drapes',
    description: 'Chanderi, Banarasi, Kanjeevaram, Tussar, Sambalpuri, and indigenous cotton weaves draped with grace.',
    tag: 'Classic Heritage',
  },
  {
    category: 'Kurtas, Sherwanis & Bandhgalas',
    description: 'Raw tussar silks, embroidered kurtas, bandis, dhoti ensembles, and tailored Nehru jackets.',
    tag: 'Regal Craft',
  },
  {
    category: 'Regional Folk & Tribal Ensembles',
    description: 'Mekhela Chador, Pheran, Mundu & Veshti, Garba Chaniya Cholis, Patola, and state regalia.',
    tag: 'Living Mosaic',
  },
  {
    category: 'Indo-Western & Fusion Accents',
    description: 'Handblock-printed jackets, terracotta and oxidized brass jewelry, juttis, kolhapuris, and embroidered dupattas.',
    tag: 'Modern Expression',
  },
];
