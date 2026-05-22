-- ============================================================
-- ICC 2026 — Seed Data
-- Run after migration 001_initial.sql
-- ============================================================

-- ── JOURNÉES ─────────────────────────────────────────────────
INSERT INTO journees (numero, date, phase, statut) VALUES
(1,  '2026-07-06', 'ALLER',  'PLANIFIEE'),
(2,  '2026-07-27', 'ALLER',  'PLANIFIEE'),
(3,  '2026-08-17', 'ALLER',  'PLANIFIEE'),
(4,  '2026-09-07', 'ALLER',  'PLANIFIEE'),
(5,  '2026-09-28', 'ALLER',  'PLANIFIEE'),
(6,  '2027-01-12', 'RETOUR', 'PLANIFIEE'),
(7,  '2027-02-02', 'RETOUR', 'PLANIFIEE'),
(8,  '2027-02-23', 'RETOUR', 'PLANIFIEE'),
(9,  '2027-03-16', 'RETOUR', 'PLANIFIEE'),
(10, '2027-04-07', 'RETOUR', 'PLANIFIEE');

-- ── CLUBS POOL NORD ──────────────────────────────────────────
INSERT INTO clubs (slug, nom, pool, ville, courts, couleur) VALUES
('cana-beau-plan',          'Cana Beau Plan',          'NORD', 'Beau Plan',             2, '#3B82F6'),
('urban-sport-grand-baie',  'Urban Sport Grand Baie',  'NORD', 'Grand Baie',            2, '#3B82F6'),
('rm-club-forbach',         'RM Club Forbach',          'NORD', 'Forbach',               2, '#3B82F6'),
('labourdonnais-mapou',     'Labourdonnais Mapou',     'NORD', 'Mapou',                 2, '#3B82F6'),
('isla-padel-grand-baie',   'Isla Padel Grand Baie',   'NORD', 'Grand Baie',            2, '#3B82F6'),
('mont-choisy-golf',        'Mont Choisy Golf',         'NORD', 'Mont Choisy',           2, '#3B82F6');

-- ── CLUBS POOL OUEST ─────────────────────────────────────────
INSERT INTO clubs (slug, nom, pool, ville, courts, couleur) VALUES
('club-med-albion',         'Club Med Albion',          'OUEST', 'Albion',              2, '#8B5CF6'),
('urban-sport-black-river', 'Urban Sport Black River',  'OUEST', 'Black River',         2, '#8B5CF6'),
('sparc-cascavelle',        'SPARC Cascavelle',          'OUEST', 'Cascavelle',          2, '#8B5CF6'),
('rm-club-tamarin',         'RM Club Tamarin',           'OUEST', 'Tamarin',             2, '#8B5CF6'),
('terres-brunes',           'Terres Brunes S&L',        'OUEST', 'Terres Brunes',       2, '#8B5CF6'),
('energia-pte-cannonniers', 'Energia Pte Cannonniers',  'OUEST', 'Pointe aux Cannonniers', 2, '#8B5CF6');

-- ── CLUBS POOL CENTRE/EST ────────────────────────────────────
INSERT INTO clubs (slug, nom, pool, ville, courts, couleur) VALUES
('club-house',              'Club House',               'CENTRE_EST', 'Centre',          2, '#10B981'),
('i-padel-rm-hennessy',     'I Padel RM Hennessy',      'CENTRE_EST', 'Hennessy',        2, '#10B981'),
('i-padel-rm-port-chambly', 'I Padel RM Port Chambly',  'CENTRE_EST', 'Port Chambly',    2, '#10B981'),
('oxygen-moka',             'Oxygen Moka',               'CENTRE_EST', 'Moka',            2, '#10B981'),
('moka-rangers',            'Moka Rangers',              'CENTRE_EST', 'Moka',            2, '#10B981'),
('studio-by-rm-azuri',      'Studio By RM Azuri',        'CENTRE_EST', 'Azuri',           2, '#10B981');

-- ── CLASSEMENTS INITIAUX ─────────────────────────────────────
INSERT INTO classements (pool, club_id, saison)
SELECT pool, id, '2026-2027' FROM clubs;

-- ── ADMIN USER PROFILE ───────────────────────────────────────
-- Run after creating the user via Supabase Auth dashboard
-- INSERT INTO user_profiles (id, role, nom, email) VALUES
-- ('<supabase-auth-user-id>', 'SUPER_ADMIN', 'Christian Bezandry', 'cbezandry@gmail.com');
