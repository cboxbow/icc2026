-- Update clubs with correct court counts and logo URLs
-- Run this in Supabase SQL Editor

UPDATE clubs SET courts = 5, logo_url = '/logos/cana-padel.png',           ville = 'Beau Plan'           WHERE slug = 'cana-beau-plan';
UPDATE clubs SET courts = 3, logo_url = '/logos/urban-sport.png',           ville = 'Grand Baie'          WHERE slug = 'urban-sport-grand-baie';
UPDATE clubs SET courts = 7, logo_url = '/logos/rm-grand-baie-v2.png',      ville = 'Grand Baie'          WHERE slug = 'rm-club-forbach';
UPDATE clubs SET courts = 3, logo_url = '/logos/labourdonnais-v2.png',      ville = 'Mapou'               WHERE slug = 'labourdonnais-mapou';
UPDATE clubs SET courts = 6, logo_url = '/logos/isla-padel-v2.png',         ville = 'Grand Baie'          WHERE slug = 'isla-padel-grand-baie';
UPDATE clubs SET courts = 2, logo_url = '/logos/mont-choisy.png',           ville = 'Mont Choisy'         WHERE slug = 'mont-choisy-golf';

UPDATE clubs SET courts = 3, logo_url = '/logos/club-med.png',              ville = 'Albion'              WHERE slug = 'club-med-albion';
UPDATE clubs SET courts = 4, logo_url = '/logos/urban-padel.png',           ville = 'Black River'         WHERE slug = 'urban-sport-black-river';
UPDATE clubs SET courts = 4, logo_url = '/logos/sparc.png',                 ville = 'Cascavelle'          WHERE slug = 'sparc-cascavelle';
UPDATE clubs SET courts = 5, logo_url = '/logos/rm-tamarin.png',            ville = 'Tamarin'             WHERE slug = 'rm-club-tamarin';
UPDATE clubs SET courts = 3, logo_url = '/logos/terres-brunes.png',         ville = 'Tamarin'             WHERE slug = 'terres-brunes';
UPDATE clubs SET courts = 2, logo_url = '/logos/energia.png',               ville = 'Pte aux Cannonniers' WHERE slug = 'energia-pte-cannonniers';

UPDATE clubs SET courts = 2, logo_url = '/logos/club-house-tamarin.png',    ville = 'Black River'         WHERE slug = 'club-house';
UPDATE clubs SET courts = 4, logo_url = '/logos/ipadel-rm.png',             ville = 'Hennessy'            WHERE slug = 'i-padel-rm-hennessy';
UPDATE clubs SET courts = 3, logo_url = '/logos/ipadel-rm.png',             ville = 'Port Chambly'        WHERE slug = 'i-padel-rm-port-chambly';
UPDATE clubs SET courts = 2, logo_url = '/logos/oxygen.png',                ville = 'Moka'                WHERE slug = 'oxygen-moka';
UPDATE clubs SET courts = 4, logo_url = '/logos/synergy-v2.png',            ville = 'Moka'                WHERE slug = 'moka-rangers';
UPDATE clubs SET courts = 3, logo_url = '/logos/studio-rm.png',             ville = 'Azuri'               WHERE slug = 'studio-by-rm-azuri';
