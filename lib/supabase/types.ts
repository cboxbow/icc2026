// ─── Enums ────────────────────────────────────────────────────────────────────
export type Division = 1 | 2 | 3 | 4;
export type Genre = 'H' | 'F';
export type Role = 'PUBLIC' | 'CLUB' | 'ADMIN' | 'SUPER_ADMIN';
export type MatchStatut = 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'FORFAIT';
export type RencontreStatut = 'PLANIFIE' | 'EN_COURS' | 'TERMINEE' | 'REPORTEE' | 'FORFAIT';
export type JourneeStatut = 'PLANIFIE' | 'EN_COURS' | 'TERMINEE' | 'REPORTEE';
export type SanctionType = 'AVERTISSEMENT' | 'SUSPENSION' | 'AMENDE' | 'FORFAIT';
export type SponsorTier = 'TITLE' | 'GOLD' | 'SILVER' | 'OFFICIAL';
export type Gagnant = 'DOM' | 'VIS' | 'NUL';
export type JourneePhase = 'ALLER' | 'RETOUR';

// ─── Division helpers ─────────────────────────────────────────────────────────
export const DIVISION_LABELS: Record<Division, string> = {
  1: 'Division 1',
  2: 'Division 2',
  3: 'Division 3',
  4: 'Division 4',
};
export const DIVISION_COLORS: Record<Division, string> = {
  1: '#FFD700', // gold — elite
  2: '#007BFF', // blue — national
  3: '#1E90FF', // bright blue — regional
  4: '#66CCFF', // neon — development
};
export const GENRE_LABELS: Record<Genre, string> = {
  H: 'Messieurs',
  F: 'Dames',
};

// ─── Database types ───────────────────────────────────────────────────────────
export interface Club {
  id: string;
  slug: string;
  nom: string;
  division: Division | null;   // null until assigned June 2026
  genre: Genre;
  ville: string | null;
  courts: number;
  logo_url: string | null;
  couleur: string;
  contact_nom: string | null;
  contact_email: string | null;
  contact_tel: string | null;
  actif: boolean;
  created_at: string;
}

export interface Joueur {
  id: string;
  club_id: string;
  nom: string;
  prenom: string;
  date_naissance: string | null;
  genre: Genre;
  licence: string | null;
  classement: number;
  division_max: Division | null;
  actif: boolean;
  created_at: string;
  // Joined
  club?: Club;
}

export interface Journee {
  id: string;
  numero: number;
  date: string;
  phase: JourneePhase;
  statut: JourneeStatut;
}

export interface Rencontre {
  id: string;
  journee_id: string;
  club_dom_id: string;
  club_vis_id: string;
  division: Division;
  genre: Genre;
  lieu: string | null;
  heure: string | null;
  statut: RencontreStatut;
  score_dom: number;
  score_vis: number;
  pts_dom: number;
  pts_vis: number;
  valide: boolean;
  valide_par: string | null;
  created_at: string;
  // Joined
  journee?: Journee;
  club_dom?: Club;
  club_vis?: Club;
  matchs?: Match[];
}

export interface Match {
  id: string;
  rencontre_id: string;
  ordre: 1 | 2 | 3;
  j1_dom_id: string | null;
  j2_dom_id: string | null;
  j1_vis_id: string | null;
  j2_vis_id: string | null;
  set1_dom: number | null;
  set1_vis: number | null;
  set2_dom: number | null;
  set2_vis: number | null;
  set3_dom: number | null;
  set3_vis: number | null;
  supertb_dom: number | null;
  supertb_vis: number | null;
  gagnant: Gagnant | null;
  statut: MatchStatut;
  heure_debut: string | null;
  heure_fin: string | null;
  live_actif: boolean;
  created_at: string;
  // Joined
  j1_dom?: Joueur;
  j2_dom?: Joueur;
  j1_vis?: Joueur;
  j2_vis?: Joueur;
}

export interface Classement {
  id: string;
  club_id: string;
  saison: string;
  division: Division;
  genre: Genre;
  journees_jouees: number;
  victoires: number;
  nuls: number;
  defaites: number;
  points: number;
  matchs_gagnes: number;
  matchs_perdus: number;
  sets_pour: number;
  sets_contre: number;
  jeux_pour: number;
  jeux_contre: number;
  forme: string;
  updated_at: string;
  // Joined
  club?: Club;
}

export interface UserProfile {
  id: string;
  role: Role;
  club_id: string | null;
  nom: string | null;
  email: string | null;
  created_at: string;
}

export interface Sanction {
  id: string;
  joueur_id: string | null;
  club_id: string | null;
  rencontre_id: string | null;
  type: SanctionType;
  description: string | null;
  matchs_suspendus: number;
  montant: number | null;
  admin_id: string | null;
  created_at: string;
  // Joined
  joueur?: Joueur;
  club?: Club;
}

export interface Sponsor {
  id: string;
  nom: string;
  logo_url: string | null;
  site_url: string | null;
  tier: SponsorTier;
  afficher: boolean;
  ordre: number;
}

// ─── Division + Genre combos for standings tabs ───────────────────────────────
export interface DivisionGenre {
  division: Division;
  genre: Genre;
  label: string;
  color: string;
}

export const DIVISIONS_GENRES: DivisionGenre[] = [
  { division: 1, genre: 'H', label: 'D1 Messieurs', color: '#FFD700' },
  { division: 2, genre: 'H', label: 'D2 Messieurs', color: '#007BFF' },
  { division: 3, genre: 'H', label: 'D3 Messieurs', color: '#1E90FF' },
  { division: 4, genre: 'H', label: 'D4 Messieurs', color: '#66CCFF' },
  { division: 1, genre: 'F', label: 'D1 Dames',     color: '#FFD700' },
  { division: 2, genre: 'F', label: 'D2 Dames',     color: '#007BFF' },
  { division: 3, genre: 'F', label: 'D3 Dames',     color: '#1E90FF' },
];
