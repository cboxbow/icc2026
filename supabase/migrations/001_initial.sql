-- ============================================================
-- ICC 2026 — Mauritius Padel League Interclub Championship
-- Migration 001 — Initial Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── CLUBS ────────────────────────────────────────────────────
CREATE TABLE clubs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  nom           TEXT NOT NULL,
  pool          TEXT NOT NULL CHECK (pool IN ('NORD', 'OUEST', 'CENTRE_EST')),
  ville         TEXT NOT NULL,
  courts        INT DEFAULT 2,
  logo_url      TEXT,
  couleur       TEXT DEFAULT '#007BFF',
  contact_nom   TEXT,
  contact_email TEXT,
  contact_tel   TEXT,
  actif         BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── JOUEURS ──────────────────────────────────────────────────
CREATE TABLE joueurs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id     UUID REFERENCES clubs(id) ON DELETE CASCADE,
  prenom      TEXT NOT NULL,
  nom         TEXT NOT NULL,
  categorie   TEXT NOT NULL CHECK (categorie IN ('H', 'F')),
  licence_no  TEXT UNIQUE,
  date_naiss  DATE,
  niveau      TEXT DEFAULT 'CLUB' CHECK (niveau IN ('CLUB', 'REGIONAL', 'NATIONAL')),
  actif       BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── JOURNÉES ─────────────────────────────────────────────────
CREATE TABLE journees (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero    INT NOT NULL,
  date      DATE NOT NULL,
  phase     TEXT NOT NULL CHECK (phase IN ('ALLER', 'RETOUR')),
  statut    TEXT DEFAULT 'PLANIFIEE' CHECK (statut IN ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'REPORTEE')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── RENCONTRES ───────────────────────────────────────────────
CREATE TABLE rencontres (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journee_id      UUID REFERENCES journees(id),
  pool            TEXT NOT NULL CHECK (pool IN ('NORD', 'OUEST', 'CENTRE_EST')),
  club_domicile   UUID REFERENCES clubs(id),
  club_visiteur   UUID REFERENCES clubs(id),
  statut          TEXT DEFAULT 'PLANIFIEE'
                  CHECK (statut IN ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'REPORTEE', 'FORFAIT')),
  score_dom       INT DEFAULT 0,
  score_vis       INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(journee_id, club_domicile, club_visiteur)
);

-- ── MATCHS INDIVIDUELS ───────────────────────────────────────
CREATE TABLE matchs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rencontre_id  UUID REFERENCES rencontres(id) ON DELETE CASCADE,
  ordre         INT NOT NULL,
  categorie     TEXT NOT NULL CHECK (categorie IN ('H', 'F')),
  niveau        INT NOT NULL CHECK (niveau BETWEEN 1 AND 5),
  heure_prevue  TIME,
  heure_debut   TIMESTAMPTZ,
  heure_fin     TIMESTAMPTZ,
  statut        TEXT DEFAULT 'PLANIFIE'
                CHECK (statut IN ('PLANIFIE', 'EN_COURS', 'TERMINE', 'FORFAIT')),
  valide        BOOLEAN DEFAULT FALSE,
  -- Équipe domicile
  j1_dom_id     UUID REFERENCES joueurs(id),
  j2_dom_id     UUID REFERENCES joueurs(id),
  -- Équipe visiteur
  j1_vis_id     UUID REFERENCES joueurs(id),
  j2_vis_id     UUID REFERENCES joueurs(id),
  -- Scores sets
  set1_dom      INT,
  set1_vis      INT,
  set2_dom      INT,
  set2_vis      INT,
  set3_dom      INT,
  set3_vis      INT,
  -- Super tie-break
  supertb_dom   INT,
  supertb_vis   INT,
  -- Résultat calculé
  gagnant       TEXT CHECK (gagnant IN ('DOM', 'VIS', 'NUL')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── CLASSEMENTS ──────────────────────────────────────────────
CREATE TABLE classements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool            TEXT NOT NULL CHECK (pool IN ('NORD', 'OUEST', 'CENTRE_EST')),
  club_id         UUID REFERENCES clubs(id),
  saison          TEXT DEFAULT '2026-2027',
  journees_jouees INT DEFAULT 0,
  victoires       INT DEFAULT 0,
  nuls            INT DEFAULT 0,
  defaites        INT DEFAULT 0,
  points          INT DEFAULT 0,
  matchs_gagnes   INT DEFAULT 0,
  matchs_perdus   INT DEFAULT 0,
  sets_pour       INT DEFAULT 0,
  sets_contre     INT DEFAULT 0,
  jeux_pour       INT DEFAULT 0,
  jeux_contre     INT DEFAULT 0,
  forme           TEXT DEFAULT '',
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(pool, club_id, saison)
);

-- ── USER PROFILES ────────────────────────────────────────────
CREATE TABLE user_profiles (
  id        UUID PRIMARY KEY REFERENCES auth.users(id),
  role      TEXT DEFAULT 'PUBLIC'
            CHECK (role IN ('PUBLIC', 'CLUB', 'ADMIN', 'SUPER_ADMIN')),
  club_id   UUID REFERENCES clubs(id),
  nom       TEXT,
  email     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── SANCTIONS ────────────────────────────────────────────────
CREATE TABLE sanctions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  joueur_id        UUID REFERENCES joueurs(id),
  match_id         UUID REFERENCES matchs(id),
  type             TEXT CHECK (type IN ('AVERTISSEMENT', 'SUSPENSION', 'AMENDE', 'FORFAIT')),
  description      TEXT,
  matchs_suspendus INT DEFAULT 0,
  admin_id         UUID REFERENCES user_profiles(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── SPONSORS ─────────────────────────────────────────────────
CREATE TABLE sponsors (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom      TEXT NOT NULL,
  logo_url TEXT,
  site_url TEXT,
  tier     TEXT CHECK (tier IN ('TITLE', 'GOLD', 'SILVER', 'OFFICIAL')),
  afficher BOOLEAN DEFAULT TRUE,
  ordre    INT DEFAULT 0
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX idx_matchs_rencontre        ON matchs(rencontre_id);
CREATE INDEX idx_matchs_statut           ON matchs(statut);
CREATE INDEX idx_rencontres_journee      ON rencontres(journee_id);
CREATE INDEX idx_rencontres_pool         ON rencontres(pool);
CREATE INDEX idx_classements_pool_points ON classements(pool, points DESC);
CREATE INDEX idx_joueurs_club            ON joueurs(club_id);
CREATE INDEX idx_joueurs_categorie       ON joueurs(club_id, categorie);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE clubs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE joueurs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE journees      ENABLE ROW LEVEL SECURITY;
ALTER TABLE rencontres    ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE classements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors      ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_clubs"      ON clubs        FOR SELECT USING (true);
CREATE POLICY "public_read_joueurs"    ON joueurs      FOR SELECT USING (true);
CREATE POLICY "public_read_journees"   ON journees     FOR SELECT USING (true);
CREATE POLICY "public_read_rencontres" ON rencontres   FOR SELECT USING (true);
CREATE POLICY "public_read_matchs"     ON matchs       FOR SELECT USING (true);
CREATE POLICY "public_read_classements" ON classements FOR SELECT USING (true);
CREATE POLICY "public_read_sponsors"   ON sponsors     FOR SELECT USING (afficher = true);

-- Club managers
CREATE POLICY "club_update_own" ON clubs FOR UPDATE
  USING (id = (SELECT club_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "club_manage_joueurs" ON joueurs FOR ALL
  USING (club_id = (SELECT club_id FROM user_profiles WHERE id = auth.uid()));

CREATE POLICY "club_insert_score" ON matchs FOR UPDATE
  USING (
    rencontre_id IN (
      SELECT r.id FROM rencontres r
      WHERE r.club_domicile = (SELECT club_id FROM user_profiles WHERE id = auth.uid())
         OR r.club_visiteur = (SELECT club_id FROM user_profiles WHERE id = auth.uid())
    )
    AND statut IN ('PLANIFIE', 'EN_COURS')
    AND valide = FALSE
  );

-- Admin full access
CREATE POLICY "admin_all_matchs" ON matchs FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_rencontres" ON rencontres FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_journees" ON journees FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_clubs" ON clubs FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_classements" ON classements FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_sanctions" ON sanctions FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

CREATE POLICY "admin_all_sponsors" ON sponsors FOR ALL
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN', 'SUPER_ADMIN'));

-- User profile self-access
CREATE POLICY "user_profile_own" ON user_profiles FOR ALL
  USING (id = auth.uid());

-- ── REALTIME ─────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE matchs;
ALTER PUBLICATION supabase_realtime ADD TABLE rencontres;
ALTER PUBLICATION supabase_realtime ADD TABLE classements;
