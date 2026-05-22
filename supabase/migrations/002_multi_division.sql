-- ════════════════════════════════════════════════════════════════
-- MIGRATION 002 — Multi-Division Schema
-- MPL Interclub Championship 2026-2027
-- Men: D1(8) D2(8) D3(8) D4(open) | Women: D1(6) D2(6) D3(open)
-- ════════════════════════════════════════════════════════════════

-- Drop old pool-based objects
DROP TABLE IF EXISTS classements CASCADE;
DROP TABLE IF EXISTS matchs CASCADE;
DROP TABLE IF EXISTS rencontres CASCADE;
DROP TABLE IF EXISTS journees CASCADE;
DROP TABLE IF EXISTS joueurs CASCADE;
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS sanctions CASCADE;

-- Re-create clubs with division + genre instead of pool
ALTER TABLE clubs DROP COLUMN IF EXISTS pool;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS division INT CHECK (division IN (1,2,3,4));
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS genre    TEXT CHECK (genre IN ('H','F')) DEFAULT 'H';

-- ─── JOUEURS ─────────────────────────────────────────────────────
CREATE TABLE joueurs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id        UUID REFERENCES clubs(id) ON DELETE CASCADE,
  nom            TEXT NOT NULL,
  prenom         TEXT NOT NULL,
  date_naissance DATE,
  genre          TEXT CHECK (genre IN ('H','F')) NOT NULL,
  licence        TEXT UNIQUE,
  classement     INT DEFAULT 0,
  division_max   INT,  -- highest division validated this season
  actif          BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ─── JOURNÉES ────────────────────────────────────────────────────
CREATE TABLE journees (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero   INT UNIQUE NOT NULL,
  date     DATE NOT NULL,
  phase    TEXT NOT NULL CHECK (phase IN ('ALLER','RETOUR')),
  statut   TEXT NOT NULL DEFAULT 'PLANIFIE'
           CHECK (statut IN ('PLANIFIE','EN_COURS','TERMINEE','REPORTEE'))
);

-- ─── RENCONTRES (Club A vs Club B per journée) ────────────────────
CREATE TABLE rencontres (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journee_id   UUID NOT NULL REFERENCES journees(id),
  club_dom_id  UUID NOT NULL REFERENCES clubs(id),
  club_vis_id  UUID NOT NULL REFERENCES clubs(id),
  division     INT NOT NULL CHECK (division IN (1,2,3,4)),
  genre        TEXT NOT NULL CHECK (genre IN ('H','F')),
  lieu         TEXT,
  heure        TIME,
  statut       TEXT NOT NULL DEFAULT 'PLANIFIE'
               CHECK (statut IN ('PLANIFIE','EN_COURS','TERMINEE','REPORTEE','FORFAIT')),
  score_dom    INT NOT NULL DEFAULT 0,  -- doubles matches won by home
  score_vis    INT NOT NULL DEFAULT 0,
  pts_dom      INT NOT NULL DEFAULT 0,  -- encounter points
  pts_vis      INT NOT NULL DEFAULT 0,
  valide       BOOLEAN NOT NULL DEFAULT FALSE,
  valide_par   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── MATCHS (3 doubles per rencontre) ───────────────────────────
CREATE TABLE matchs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rencontre_id UUID NOT NULL REFERENCES rencontres(id) ON DELETE CASCADE,
  ordre        INT NOT NULL CHECK (ordre IN (1,2,3)),  -- pair 1/2/3
  -- Players (2 home, 2 away — doubles)
  j1_dom_id    UUID REFERENCES joueurs(id),
  j2_dom_id    UUID REFERENCES joueurs(id),
  j1_vis_id    UUID REFERENCES joueurs(id),
  j2_vis_id    UUID REFERENCES joueurs(id),
  -- Sets (best of 3, match tie-break in set 3)
  set1_dom     INT, set1_vis INT,
  set2_dom     INT, set2_vis INT,
  set3_dom     INT, set3_vis INT,   -- match tie-break
  supertb_dom  INT, supertb_vis INT,
  gagnant      TEXT CHECK (gagnant IN ('DOM','VIS','NUL')),
  statut       TEXT NOT NULL DEFAULT 'PLANIFIE'
               CHECK (statut IN ('PLANIFIE','EN_COURS','TERMINE','FORFAIT')),
  heure_debut  TIMESTAMPTZ,
  heure_fin    TIMESTAMPTZ,
  live_actif   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CLASSEMENTS ─────────────────────────────────────────────────
CREATE TABLE classements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id         UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  saison          TEXT NOT NULL DEFAULT '2026-2027',
  division        INT NOT NULL CHECK (division IN (1,2,3,4)),
  genre           TEXT NOT NULL CHECK (genre IN ('H','F')),
  journees_jouees INT NOT NULL DEFAULT 0,
  victoires       INT NOT NULL DEFAULT 0,
  nuls            INT NOT NULL DEFAULT 0,
  defaites        INT NOT NULL DEFAULT 0,
  points          INT NOT NULL DEFAULT 0,
  matchs_gagnes   INT NOT NULL DEFAULT 0,
  matchs_perdus   INT NOT NULL DEFAULT 0,
  sets_pour       INT NOT NULL DEFAULT 0,
  sets_contre     INT NOT NULL DEFAULT 0,
  jeux_pour       INT NOT NULL DEFAULT 0,
  jeux_contre     INT NOT NULL DEFAULT 0,
  forme           TEXT NOT NULL DEFAULT '',  -- e.g. 'VVNDV'
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(club_id, saison, division, genre)
);

-- ─── SANCTIONS ───────────────────────────────────────────────────
CREATE TABLE sanctions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  joueur_id        UUID REFERENCES joueurs(id),
  club_id          UUID REFERENCES clubs(id),
  rencontre_id     UUID REFERENCES rencontres(id),
  type             TEXT NOT NULL CHECK (type IN ('AVERTISSEMENT','SUSPENSION','AMENDE','FORFAIT')),
  description      TEXT,
  matchs_suspendus INT NOT NULL DEFAULT 0,
  montant          NUMERIC(10,2),
  admin_id         UUID REFERENCES auth.users(id),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SPONSORS ────────────────────────────────────────────────────
CREATE TABLE sponsors (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom      TEXT NOT NULL,
  logo_url TEXT,
  site_url TEXT,
  tier     TEXT NOT NULL CHECK (tier IN ('TITLE','GOLD','SILVER','OFFICIAL')),
  afficher BOOLEAN NOT NULL DEFAULT TRUE,
  ordre    INT NOT NULL DEFAULT 0
);

-- ─── RLS ─────────────────────────────────────────────────────────
ALTER TABLE joueurs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE journees   ENABLE ROW LEVEL SECURITY;
ALTER TABLE rencontres ENABLE ROW LEVEL SECURITY;
ALTER TABLE matchs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE classements ENABLE ROW LEVEL SECURITY;
ALTER TABLE sanctions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors   ENABLE ROW LEVEL SECURITY;

-- Public reads
CREATE POLICY "public_read" ON journees    FOR SELECT USING (true);
CREATE POLICY "public_read" ON rencontres  FOR SELECT USING (true);
CREATE POLICY "public_read" ON matchs      FOR SELECT USING (true);
CREATE POLICY "public_read" ON classements FOR SELECT USING (true);
CREATE POLICY "public_read" ON sponsors    FOR SELECT USING (true);
CREATE POLICY "public_read" ON joueurs     FOR SELECT USING (true);

-- Clubs manage their own players
CREATE POLICY "club_own_joueurs" ON joueurs FOR ALL USING (
  club_id = (SELECT club_id FROM user_profiles WHERE id = auth.uid())
);

-- Clubs submit their own rencontre scores
CREATE POLICY "club_own_rencontres" ON rencontres FOR UPDATE USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN','SUPER_ADMIN')
  OR club_dom_id = (SELECT club_id FROM user_profiles WHERE id = auth.uid())
  OR club_vis_id = (SELECT club_id FROM user_profiles WHERE id = auth.uid())
);

-- Admin full access
CREATE POLICY "admin_all_rencontres" ON rencontres FOR ALL USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN','SUPER_ADMIN')
);
CREATE POLICY "admin_all_matchs" ON matchs FOR ALL USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN','SUPER_ADMIN')
);
CREATE POLICY "admin_all_classements" ON classements FOR ALL USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN','SUPER_ADMIN')
);
CREATE POLICY "admin_all_sanctions" ON sanctions FOR ALL USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) IN ('ADMIN','SUPER_ADMIN')
);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE matchs;
ALTER PUBLICATION supabase_realtime ADD TABLE rencontres;
ALTER PUBLICATION supabase_realtime ADD TABLE classements;

-- ─── JOURNÉES SEED ───────────────────────────────────────────────
INSERT INTO journees (numero, date, phase) VALUES
  (1,  '2026-07-06', 'ALLER'),
  (2,  '2026-07-27', 'ALLER'),
  (3,  '2026-08-17', 'ALLER'),
  (4,  '2026-09-07', 'ALLER'),
  (5,  '2026-09-28', 'ALLER'),
  (6,  '2027-01-12', 'RETOUR'),
  (7,  '2027-02-02', 'RETOUR'),
  (8,  '2027-02-23', 'RETOUR'),
  (9,  '2027-03-16', 'RETOUR'),
  (10, '2027-04-07', 'RETOUR')
ON CONFLICT (numero) DO NOTHING;

-- ─── UPDATE CLUBS WITH DIVISION ASSIGNMENTS (TBD June 2026) ─────
-- Divisions will be assigned during registration window.
-- Run UPDATE clubs SET division = X, genre = 'H'/'F' WHERE slug = '...'
-- after the registration window closes in June 2026.
