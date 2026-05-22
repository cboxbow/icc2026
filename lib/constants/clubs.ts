export type Pool = 'NORD' | 'OUEST' | 'CENTRE_EST';

export interface Club {
  id: string;
  slug: string;
  nom: string;
  pool: Pool;
  ville: string;
  courts: number;
  couleur: string;
}

export const CLUBS: Club[] = [
  // POOL NORD
  { id: '1', slug: 'cana-beau-plan',            nom: 'Cana Beau Plan',            pool: 'NORD',       ville: 'Beau Plan',             courts: 5, couleur: '#3B82F6' },
  { id: '2', slug: 'urban-sport-grand-baie',    nom: 'Urban Sport Grand Baie',    pool: 'NORD',       ville: 'Grand Baie',            courts: 3, couleur: '#3B82F6' },
  { id: '3', slug: 'rm-club-forbach',           nom: 'RM Club Forbach',           pool: 'NORD',       ville: 'Grand Baie',            courts: 7, couleur: '#3B82F6' },
  { id: '4', slug: 'labourdonnais-mapou',       nom: 'Labourdonnais Mapou',       pool: 'NORD',       ville: 'Mapou',                 courts: 3, couleur: '#3B82F6' },
  { id: '5', slug: 'isla-padel-grand-baie',     nom: 'Isla Padel Grand Baie',     pool: 'NORD',       ville: 'Grand Baie',            courts: 6, couleur: '#3B82F6' },
  { id: '6', slug: 'mont-choisy-golf',          nom: 'Mont Choisy Golf',          pool: 'NORD',       ville: 'Mont Choisy',           courts: 2, couleur: '#3B82F6' },
  // POOL OUEST
  { id: '7',  slug: 'club-med-albion',          nom: 'Club Med Albion',           pool: 'OUEST',      ville: 'Albion',                courts: 3, couleur: '#8B5CF6' },
  { id: '8',  slug: 'urban-sport-black-river',  nom: 'Urban Sport Black River',   pool: 'OUEST',      ville: 'Black River',           courts: 4, couleur: '#8B5CF6' },
  { id: '9',  slug: 'sparc-cascavelle',         nom: 'SPARC Cascavelle',          pool: 'OUEST',      ville: 'Cascavelle',            courts: 4, couleur: '#8B5CF6' },
  { id: '10', slug: 'rm-club-tamarin',          nom: 'RM Club Tamarin',           pool: 'OUEST',      ville: 'Tamarin',               courts: 5, couleur: '#8B5CF6' },
  { id: '11', slug: 'terres-brunes',            nom: 'Terres Brunes S&L',         pool: 'OUEST',      ville: 'Tamarin',               courts: 3, couleur: '#8B5CF6' },
  { id: '12', slug: 'energia-pte-cannonniers',  nom: 'Energia Pte Cannonniers',   pool: 'OUEST',      ville: 'Pte aux Cannonniers',   courts: 2, couleur: '#8B5CF6' },
  // POOL CENTRE/EST
  { id: '13', slug: 'club-house',               nom: 'Club House',                pool: 'CENTRE_EST', ville: 'Black River',           courts: 2, couleur: '#10B981' },
  { id: '14', slug: 'i-padel-rm-hennessy',      nom: 'I Padel RM Hennessy',       pool: 'CENTRE_EST', ville: 'Hennessy',              courts: 4, couleur: '#10B981' },
  { id: '15', slug: 'i-padel-rm-port-chambly',  nom: 'I Padel RM Port Chambly',   pool: 'CENTRE_EST', ville: 'Port Chambly',          courts: 3, couleur: '#10B981' },
  { id: '16', slug: 'oxygen-moka',              nom: 'Oxygen Moka',               pool: 'CENTRE_EST', ville: 'Moka',                  courts: 2, couleur: '#10B981' },
  { id: '17', slug: 'moka-rangers',             nom: 'Moka Rangers',              pool: 'CENTRE_EST', ville: 'Moka',                  courts: 4, couleur: '#10B981' },
  { id: '18', slug: 'studio-by-rm-azuri',       nom: 'Studio By RM Azuri',        pool: 'CENTRE_EST', ville: 'Azuri',                 courts: 3, couleur: '#10B981' },
];

export const CLUBS_BY_POOL: Record<Pool, Club[]> = {
  NORD:       CLUBS.filter(c => c.pool === 'NORD'),
  OUEST:      CLUBS.filter(c => c.pool === 'OUEST'),
  CENTRE_EST: CLUBS.filter(c => c.pool === 'CENTRE_EST'),
};

export const POOL_LABELS: Record<Pool, string> = {
  NORD:       'Pool Nord',
  OUEST:      'Pool Ouest',
  CENTRE_EST: 'Pool Centre/Est',
};

export const POOL_COLORS: Record<Pool, string> = {
  NORD:       '#3B82F6',
  OUEST:      '#8B5CF6',
  CENTRE_EST: '#10B981',
};

export function getClubBySlug(slug: string): Club | undefined {
  return CLUBS.find(c => c.slug === slug);
}
