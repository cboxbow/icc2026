import type { Classement, Club } from '../supabase/types';
import { CLUBS } from '../constants/clubs';

function mockStanding(clubId: string, pool: 'NORD' | 'OUEST' | 'CENTRE_EST', v: number, n: number, d: number, mg: number, mp: number, sp: number, sc: number, jp: number, jc: number, forme: string): Classement {
  return {
    id: clubId,
    pool,
    club_id: clubId,
    saison: '2026-2027',
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

export const MOCK_STANDINGS_NORD: Classement[] = [
  mockStanding('1', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('2', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('3', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('4', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('5', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('6', 'NORD', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
];

export const MOCK_STANDINGS_OUEST: Classement[] = [
  mockStanding('7',  'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('8',  'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('9',  'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('10', 'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('11', 'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('12', 'OUEST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
];

export const MOCK_STANDINGS_CENTRE: Classement[] = [
  mockStanding('13', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('14', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('15', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('16', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('17', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
  mockStanding('18', 'CENTRE_EST', 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
];
