import type { Classement } from '../supabase/types';

export function sortStandings(standings: Classement[]): Classement[] {
  return [...standings].sort((a, b) => {
    // 1. Points
    if (b.points !== a.points) return b.points - a.points;
    // 2. Diff matchs
    const diffA = a.matchs_gagnes - a.matchs_perdus;
    const diffB = b.matchs_gagnes - b.matchs_perdus;
    if (diffB !== diffA) return diffB - diffA;
    // 3. Diff sets
    const setsA = a.sets_pour - a.sets_contre;
    const setsB = b.sets_pour - b.sets_contre;
    if (setsB !== setsA) return setsB - setsA;
    // 4. Diff jeux
    const jeuxA = a.jeux_pour - a.jeux_contre;
    const jeuxB = b.jeux_pour - b.jeux_contre;
    return jeuxB - jeuxA;
  });
}

export function getForme(formeStr: string): Array<'V' | 'N' | 'D'> {
  return formeStr.split('').filter(c => ['V', 'N', 'D'].includes(c)) as Array<'V' | 'N' | 'D'>;
}

export function calcPoints(v: number, n: number, d: number): number {
  return v * 3 + n * 1;
}

export function diffMatchs(gagnes: number, perdus: number): string {
  const diff = gagnes - perdus;
  return diff > 0 ? `+${diff}` : `${diff}`;
}

export function diffSets(pour: number, contre: number): string {
  const diff = pour - contre;
  return diff > 0 ? `+${diff}` : `${diff}`;
}
