export type Pool = 'NORD' | 'OUEST' | 'CENTRE_EST';
export type Role = 'PUBLIC' | 'CLUB' | 'ADMIN' | 'SUPER_ADMIN';
export type MatchCategorie = 'H' | 'F';
export type MatchStatut = 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'FORFAIT';
export type RencontreStatut = 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'REPORTEE' | 'FORFAIT';
export type JourneeStatut = 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'REPORTEE';
export type SanctionType = 'AVERTISSEMENT' | 'SUSPENSION' | 'AMENDE' | 'FORFAIT';
export type SponsorTier = 'TITLE' | 'GOLD' | 'SILVER' | 'OFFICIAL';
export type Gagnant = 'DOM' | 'VIS' | 'NUL';

export interface Club {
  id: string;
  slug: string;
  nom: string;
  pool: Pool;
  ville: string;
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
  prenom: string;
  nom: string;
  categorie: MatchCategorie;
  licence_no: string | null;
  date_naiss: string | null;
  niveau: string;
  actif: boolean;
  created_at: string;
}

export interface Journee {
  id: string;
  numero: number;
  date: string;
  phase: 'ALLER' | 'RETOUR';
  statut: JourneeStatut;
  created_at: string;
}

export interface Rencontre {
  id: string;
  journee_id: string;
  pool: Pool;
  club_domicile: string;
  club_visiteur: string;
  statut: RencontreStatut;
  score_dom: number;
  score_vis: number;
  created_at: string;
  // Joined
  club_domicile_data?: Club;
  club_visiteur_data?: Club;
  matchs?: Match[];
}

export interface Match {
  id: string;
  rencontre_id: string;
  ordre: number;
  categorie: MatchCategorie;
  niveau: number;
  heure_prevue: string | null;
  heure_debut: string | null;
  heure_fin: string | null;
  statut: MatchStatut;
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
  created_at: string;
  // Joined
  j1_dom?: Joueur;
  j2_dom?: Joueur;
  j1_vis?: Joueur;
  j2_vis?: Joueur;
}

export interface Classement {
  id: string;
  pool: Pool;
  club_id: string;
  saison: string;
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
  joueur_id: string;
  match_id: string;
  type: SanctionType;
  description: string | null;
  matchs_suspendus: number;
  admin_id: string;
  created_at: string;
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

export interface Database {
  public: {
    Tables: {
      clubs: { Row: Club; Insert: Omit<Club, 'id' | 'created_at'>; Update: Partial<Club> };
      joueurs: { Row: Joueur; Insert: Omit<Joueur, 'id' | 'created_at'>; Update: Partial<Joueur> };
      journees: { Row: Journee; Insert: Omit<Journee, 'id' | 'created_at'>; Update: Partial<Journee> };
      rencontres: { Row: Rencontre; Insert: Omit<Rencontre, 'id' | 'created_at'>; Update: Partial<Rencontre> };
      matchs: { Row: Match; Insert: Omit<Match, 'id' | 'created_at'>; Update: Partial<Match> };
      classements: { Row: Classement; Insert: Omit<Classement, 'id'>; Update: Partial<Classement> };
      user_profiles: { Row: UserProfile; Insert: Omit<UserProfile, 'created_at'>; Update: Partial<UserProfile> };
      sanctions: { Row: Sanction; Insert: Omit<Sanction, 'id' | 'created_at'>; Update: Partial<Sanction> };
      sponsors: { Row: Sponsor; Insert: Omit<Sponsor, 'id'>; Update: Partial<Sponsor> };
    };
  };
}
