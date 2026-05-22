import Link from 'next/link';
import type { Classement } from '@/lib/supabase/types';
import { sortStandings, signedDiff } from '@/lib/utils/standings';
import { RankBadge } from './RankBadge';

interface StandingsTableProps {
  standings: Classement[];
  compact?: boolean;
}

function FormePill({ result }: { result: 'V' | 'N' | 'D' }) {
  const map = {
    V: { bg: '#00D084', label: 'V' },
    N: { bg: '#444455', label: 'N' },
    D: { bg: '#FF3B5C', label: 'D' },
  };
  const cfg = map[result];
  return (
    <span
      className="inline-flex items-center justify-center rounded-full w-5 h-5 text-white font-bold"
      style={{ background: cfg.bg, fontSize: 9 }}
    >
      {cfg.label}
    </span>
  );
}

export function StandingsTable({ standings, compact = false }: StandingsTableProps) {
  const sorted = sortStandings(standings);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0,123,255,0.12)' }}>
            <th className="text-left py-3 px-2 w-8" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>#</th>
            <th className="text-left py-3 px-2" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>CLUB</th>
            <th className="text-center py-3 px-2" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>J</th>
            <th className="text-center py-3 px-2" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>V</th>
            <th className="text-center py-3 px-2" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>N</th>
            <th className="text-center py-3 px-2" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>D</th>
            <th className="text-center py-3 px-2 font-bold" style={{ color: '#66CCFF', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>PTS</th>
            {!compact && (
              <>
                <th className="text-center py-3 px-2 hidden lg:table-cell" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>+/-M</th>
                <th className="text-center py-3 px-2 hidden lg:table-cell" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>+/-S</th>
                <th className="text-center py-3 px-2 hidden xl:table-cell" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>FORME</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => {
            const rank = idx + 1;
            const isTop2 = rank <= 2;
            const isBarrage = rank === 3;
            const forme = row.forme ? row.forme.split('').filter(c => ['V','N','D'].includes(c)) as Array<'V'|'N'|'D'> : [];

            return (
              <tr
                key={row.club_id}
                className="transition-colors"
                style={{
                  background: rank === 1
                    ? 'rgba(255,215,0,0.04)'
                    : rank === 2
                    ? 'rgba(0,123,255,0.04)'
                    : 'transparent',
                  borderBottom: '1px solid rgba(0,123,255,0.06)',
                  borderLeft: isTop2
                    ? '3px solid #00D084'
                    : isBarrage
                    ? '3px solid #FFB800'
                    : '3px solid transparent',
                }}
              >
                <td className="py-3 px-2 text-center">
                  <RankBadge rank={rank} />
                </td>
                <td className="py-3 px-2">
                  {row.club ? (
                    <Link
                      href={`/clubs/${row.club.slug}`}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold"
                        style={{ background: row.club.couleur, fontSize: 8 }}
                      >
                        {row.club.nom.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-white font-medium truncate" style={{ fontSize: compact ? 12 : 13, fontFamily: 'Inter, sans-serif', maxWidth: compact ? 120 : undefined }}>
                        {row.club.nom}
                      </span>
                    </Link>
                  ) : (
                    <span style={{ color: '#AAAAAA' }}>—</span>
                  )}
                </td>
                <td className="py-3 px-2 text-center" style={{ color: '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{row.journees_jouees}</td>
                <td className="py-3 px-2 text-center" style={{ color: '#00D084', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{row.victoires}</td>
                <td className="py-3 px-2 text-center" style={{ color: '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{row.nuls}</td>
                <td className="py-3 px-2 text-center" style={{ color: '#FF3B5C', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{row.defaites}</td>
                <td className="py-3 px-2 text-center font-bold" style={{ color: '#66CCFF', fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}>{row.points}</td>
                {!compact && (
                  <>
                    <td className="py-3 px-2 text-center hidden lg:table-cell" style={{ color: '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      {signedDiff(row.matchs_gagnes, row.matchs_perdus)}
                    </td>
                    <td className="py-3 px-2 text-center hidden lg:table-cell" style={{ color: '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                      {signedDiff(row.sets_pour, row.sets_contre)}
                    </td>
                    <td className="py-3 px-2 hidden xl:table-cell">
                      <div className="flex items-center justify-center gap-0.5">
                        {forme.slice(-5).map((r, i) => <FormePill key={i} result={r} />)}
                        {forme.length === 0 && <span style={{ color: '#444455', fontSize: 11 }}>—</span>}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
