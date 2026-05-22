export interface Journee {
  numero: number;
  date: Date;
  phase: 'ALLER' | 'RETOUR';
  statut: 'PLANIFIEE' | 'EN_COURS' | 'TERMINEE' | 'REPORTEE';
}

export const JOURNEES: Journee[] = [
  { numero: 1,  date: new Date('2026-07-06'), phase: 'ALLER',  statut: 'PLANIFIEE' },
  { numero: 2,  date: new Date('2026-07-27'), phase: 'ALLER',  statut: 'PLANIFIEE' },
  { numero: 3,  date: new Date('2026-08-17'), phase: 'ALLER',  statut: 'PLANIFIEE' },
  { numero: 4,  date: new Date('2026-09-07'), phase: 'ALLER',  statut: 'PLANIFIEE' },
  { numero: 5,  date: new Date('2026-09-28'), phase: 'ALLER',  statut: 'PLANIFIEE' },
  { numero: 6,  date: new Date('2027-01-12'), phase: 'RETOUR', statut: 'PLANIFIEE' },
  { numero: 7,  date: new Date('2027-02-02'), phase: 'RETOUR', statut: 'PLANIFIEE' },
  { numero: 8,  date: new Date('2027-02-23'), phase: 'RETOUR', statut: 'PLANIFIEE' },
  { numero: 9,  date: new Date('2027-03-16'), phase: 'RETOUR', statut: 'PLANIFIEE' },
  { numero: 10, date: new Date('2027-04-07'), phase: 'RETOUR', statut: 'PLANIFIEE' },
];

export const SAISON_START = new Date('2026-07-06');
export const SAISON_END   = new Date('2027-06-30');

export const PLAYOFFS = {
  quarts:  'Mai 2027',
  demis:   'Mai 2027',
  finale:  'Juin 2027',
};

export const MATCH_SCHEDULE = [
  { heure: '16h00', matchs: ['M5', 'W4'] },
  { heure: '17h15', matchs: ['M4', 'W3'] },
  { heure: '18h30', matchs: ['M3', 'W2'] },
  { heure: '19h45', matchs: ['M2', 'W1'] },
  { heure: '21h00', matchs: ['M1'] },
];

export function getNextJournee(): Journee | undefined {
  const now = new Date();
  return JOURNEES.find(j => j.date > now);
}

export function getCurrentJournee(): Journee | undefined {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return JOURNEES.find(j => {
    const d = new Date(j.date.getFullYear(), j.date.getMonth(), j.date.getDate());
    return d.getTime() === today.getTime();
  });
}
