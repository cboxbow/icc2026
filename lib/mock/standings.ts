import type { Classement, Club, Division, Genre } from '../supabase/types';
import { CLUBS } from '../constants/clubs';

function mockStanding(
  clubId: string,
  division: Division,
  genre: Genre,
  v: number, n: number, d: number,
  mg: number, mp: number,
  sp: number, sc: number,
  jp: number, jc: number,
  forme: string,
): Classement {
  return {
    id: clubId,
    club_id: clubId,
    saison: '2026-2027',
    division,
    genre,
    journees_jouees: v + n + d,
    victoires: v,
    nuls: n,
    defaites: d,
    points: v * 3 + n,
    matchs_gagnes: mg,
    matchs_perdus: mp,
    sets_pour: sp,
    sets_contre: sc,
    jeux_pour: jp,
    jeux_contre: jc,
    forme,
    updated_at: new Date().toISOString(),
    club: CLUBS.find(c => c.id === clubId) as unknown as Club | undefined,
  };
}

/** Empty D1 Men standings (season not started) */
export const MOCK_STANDINGS_D1H: Classement[] = [
  mockStanding('1', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('2', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('3', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('4', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('5', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('6', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('7', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('8', 1, 'H', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
];

/** Empty D1 Women standings (season not started) */
export const MOCK_STANDINGS_D1F: Classement[] = [
  mockStanding('9',  1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('10', 1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('11', 1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('12', 1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('13', 1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('14', 1, 'F', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
];
