import type { Division, Genre } from '@/lib/supabase/types';

/** Lightweight static club record — used for fallback rendering before DB data is available. */
export interface StaticClub {
  id: string;
  slug: string;
  nom: string;
  ville: string;
  courts: number;
  couleur: string;
  /** null until divisions are assigned (June 2026) */
  division: Division | null;
  genre: Genre;
  logo_url: string | null;
}

export const CLUBS: StaticClub[] = [
  // ── Men's clubs (genre: 'H') ─────────────────────────────────────────────
  { id: '1',  slug: 'cana-beau-plan',           nom: 'Cana Beau Plan',           ville: 'Beau Plan',           courts: 5, couleur: '#3B82F6', division: null, genre: 'H', logo_url: '/logos/cana.png'              },
  { id: '2',  slug: 'urban-sport-grand-baie',   nom: 'Urban Sport Grand Baie',   ville: 'Grand Baie',          courts: 3, couleur: '#0EA5E9', division: null, genre: 'H', logo_url: '/logos/urban-sport.png'       },
  { id: '3',  slug: 'rm-club-forbach',          nom: 'RM Club Forbach',          ville: 'Grand Baie',          courts: 7, couleur: '#6366F1', division: null, genre: 'H', logo_url: '/logos/rm-club.png'           },
  { id: '4',  slug: 'labourdonnais-mapou',      nom: 'Labourdonnais Mapou',      ville: 'Mapou',               courts: 3, couleur: '#8B5CF6', division: null, genre: 'H', logo_url: '/logos/labourdonnais.png'     },
  { id: '5',  slug: 'isla-padel-grand-baie',    nom: 'Isla Padel Grand Baie',    ville: 'Grand Baie',          courts: 6, couleur: '#10B981', division: null, genre: 'H', logo_url: '/logos/isla-padel.png'        },
  { id: '6',  slug: 'mont-choisy-golf',         nom: 'Mont Choisy Golf',         ville: 'Mont Choisy',         courts: 2, couleur: '#14B8A6', division: null, genre: 'H', logo_url: '/logos/mont-choisy.png'       },
  { id: '7',  slug: 'club-med-albion',          nom: 'Club Med Albion',          ville: 'Albion',              courts: 3, couleur: '#F59E0B', division: null, genre: 'H', logo_url: '/logos/club-med.png'          },
  { id: '8',  slug: 'urban-sport-black-river',  nom: 'Urban Sport Black River',  ville: 'Black River',         courts: 4, couleur: '#0EA5E9', division: null, genre: 'H', logo_url: '/logos/urban-sport.png'       },
  { id: '9',  slug: 'sparc-cascavelle',         nom: 'SPARC Cascavelle',         ville: 'Cascavelle',          courts: 4, couleur: '#EF4444', division: null, genre: 'H', logo_url: '/logos/sparc.png'             },
  { id: '10', slug: 'rm-club-tamarin',          nom: 'RM Club Tamarin',          ville: 'Tamarin',             courts: 5, couleur: '#6366F1', division: null, genre: 'H', logo_url: '/logos/rm-club.png'           },
  { id: '11', slug: 'terres-brunes',            nom: 'Terres Brunes S&L',        ville: 'Tamarin',             courts: 3, couleur: '#78716C', division: null, genre: 'H', logo_url: '/logos/terres-brunes.png'     },
  { id: '12', slug: 'energia-pte-cannonniers',  nom: 'Energia Pte Cannonniers',  ville: 'Pte aux Cannonniers', courts: 2, couleur: '#F97316', division: null, genre: 'H', logo_url: '/logos/energia.png'           },
  { id: '13', slug: 'club-house',               nom: 'Club House',               ville: 'Black River',         courts: 2, couleur: '#EC4899', division: null, genre: 'H', logo_url: '/logos/club-house.png'        },
  { id: '14', slug: 'i-padel-rm-hennessy',      nom: 'I Padel RM Hennessy',      ville: 'Hennessy',            courts: 4, couleur: '#A855F7', division: null, genre: 'H', logo_url: '/logos/i-padel.png'           },
  { id: '15', slug: 'i-padel-rm-port-chambly',  nom: 'I Padel RM Port Chambly',  ville: 'Port Chambly',        courts: 3, couleur: '#A855F7', division: null, genre: 'H', logo_url: '/logos/i-padel.png'           },
  { id: '16', slug: 'oxygen-moka',              nom: 'Oxygen Moka',              ville: 'Moka',                courts: 2, couleur: '#22C55E', division: null, genre: 'H', logo_url: '/logos/oxygen.png'            },
  { id: '17', slug: 'moka-rangers',             nom: 'Moka Rangers',             ville: 'Moka',                courts: 4, couleur: '#EAB308', division: null, genre: 'H', logo_url: '/logos/moka-rangers.png'      },
  { id: '18', slug: 'studio-by-rm-azuri',       nom: 'Studio By RM Azuri',       ville: 'Azuri',               courts: 3, couleur: '#06B6D4', division: null, genre: 'H', logo_url: '/logos/studio-rm.png'         },
];

export function getClubBySlug(slug: string): StaticClub | undefined {
  return CLUBS.find(c => c.slug === slug);
}
