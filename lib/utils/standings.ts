import type { Classement, Division, Genre } from '@/lib/supabase/types';

/** Sort: points → diff_matchs → diff_sets → diff_jeux */
export function sortStandings(rows: Classement[]): Classement[] {
  return [...rows].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffMatchA = a.matchs_gagnes - a.matchs_perdus;
    const diffMatchB = b.matchs_gagnes - b.matchs_perdus;
    if (diffMatchB !== diffMatchA) return diffMatchB - diffMatchA;
    const diffSetsA = a.sets_pour - a.sets_contre;
    const diffSetsB = b.sets_pour - b.sets_contre;
    if (diffSetsB !== diffSetsA) return diffSetsB - diffSetsA;
    return (b.jeux_pour - b.jeux_contre) - (a.jeux_pour - a.jeux_contre);
  });
}

/** Filter + sort for a specific division + genre */
export function getStandingsForDivision(
  rows: Classement[],
  division: Division,
  genre: Genre
): Classement[] {
  return sortStandings(rows.filter(r => r.division === division && r.genre === genre));
}

/** Playoff qualification spots per division */
export const PLAYOFF_SPOTS: Record<number, number> = { 1: 4, 2: 1, 3: 1, 4: 1 };

/** Relegation zone spots (bottom N) */
export const RELEGATION_SPOTS: Record<number, number> = { 1: 2, 2: 2, 3: 2, 4: 0 };

export function getForme(formeStr: string): Array<'V' | 'N' | 'D'> {
  return formeStr.split('').filter(c => ['V', 'N', 'D'].includes(c)) as Array<'V' | 'N' | 'D'>;
}

export function calcPoints(v: number, n: number): number {
  return v * 3 + n * 1;
}

export function signedDiff(a: number, b: number): string {
  const d = a - b;
  return d > 0 ? `+${d}` : `${d}`;
}
