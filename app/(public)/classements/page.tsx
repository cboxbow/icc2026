'use client';

import { useState, useEffect } from 'react';
import type { Classement, DivisionGenre, Division, Genre } from '@/lib/supabase/types';
import { DIVISIONS_GENRES } from '@/lib/supabase/types';
import { sortStandings, PLAYOFF_SPOTS, RELEGATION_SPOTS, getForme } from '@/lib/utils/standings';
import Image from 'next/image';
import Link from 'next/link';

export default function ClassementsPage() {
  const [active, setActive] = useState<DivisionGenre>(DIVISIONS_GENRES[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-black mb-1"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px,5vw,48px)', color: '#FFFFFF' }}>
          CLASSEMENTS
        </h1>
        <p style={{ color: '#AAAAAA', fontSize: 14 }}>Saison 2026/2027 · Mis à jour en temps réel</p>
      </div>

      {/* Division + Genre tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DIVISIONS_GENRES.map(dg => {
          const isActive = dg.division === active.division && dg.genre === active.genre;
          return (
            <button
              key={`${dg.division}-${dg.genre}`}
              onClick={() => setActive(dg)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: isActive ? dg.color : 'rgba(13,21,38,0.8)',
                color: isActive ? (dg.color === '#FFD700' ? '#000' : '#FFF') : '#AAAAAA',
                border: `1px solid ${isActive ? dg.color : 'rgba(0,123,255,0.15)'}`,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {dg.label}
            </button>
          );
        })}
      </div>

      {/* Active standings */}
      <StandingsSection key={`${active.division}-${active.genre}`} division={active.division} genre={active.genre} color={active.color} />

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6">
        <LegendItem color="#FFD700" label="Qualification playoffs" />
        <LegendItem color="#FF3B5C" label="Zone relégation" />
        <div className="flex items-center gap-2">
          {(['V', 'N', 'D'] as const).map(r => <FormeChip key={r} result={r} />)}
          <span style={{ color: '#AAAAAA', fontSize: 12 }}>Forme (5 derniers)</span>
        </div>
      </div>

      {/* Points system */}
      <section className="mt-10 p-6 rounded-xl"
        style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,123,255,0.1)' }}>
        <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
          Système de points
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Victoire (2-0 ou 2-1)', value: '3 pts', color: '#00D084' },
            { label: 'Match nul (1-1)',        value: '1 pt',  color: '#AAAAAA' },
            { label: 'Défaite',                value: '0 pt',  color: '#FF3B5C' },
            { label: 'Forfait',                value: '-1 pt', color: '#FF3B5C' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span style={{ color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 16, minWidth: 52 }}>{value}</span>
              <span style={{ color: '#AAAAAA', fontSize: 12 }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ color: '#444455', fontSize: 11, marginTop: 10 }}>
          Rencontre : 3 doubles (P1×P1 · P2×P2 · P3×P3) · Best of 3 sets · Golden Point · Match Tie-Break
        </p>
      </section>
    </div>
  );
}

// ─── Standings section ────────────────────────────────────────────────────────
function StandingsSection({ division, genre, color }: { division: Division; genre: Genre; color: string }) {
  const [standings, setStandings] = useState<Classement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/classements/${division}?genre=${genre}&saison=2026-2027`)
      .then(r => r.json())
      .then((data: Classement[]) => { setStandings(sortStandings(Array.isArray(data) ? data : [])); setLoading(false); })
      .catch(() => setLoading(false));
  }, [division, genre]);

  const playoffSpots = PLAYOFF_SPOTS[division] ?? 0;
  const relSpots = RELEGATION_SPOTS[division] ?? 0;

  if (loading) return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.15)' }}>
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-14 mx-4 my-2 rounded-lg" />)}
    </div>
  );

  if (standings.length === 0) return (
    <div className="rounded-xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: `1px solid ${color}25` }}>
      <p style={{ color: '#444455', fontSize: 14 }}>Saison pas encore commencée — J1 le 6 juillet 2026</p>
    </div>
  );

  return (
    <div className="rounded-xl overflow-x-auto" style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: `1px solid ${color}30` }}>
      <table className="w-full min-w-[640px]" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0,123,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
            {['#','Club','PJ','V','N','D','Pts','Forme'].map(h => (
              <th key={h} className="px-3 py-3 text-left"
                style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => {
            const pos = i + 1;
            const isPlayoff = pos <= playoffSpots;
            const isRel = relSpots > 0 && pos > standings.length - relSpots;
            const forme = getForme(s.forme).slice(-5);
            const club = s.club;
            return (
              <tr key={s.id} style={{
                borderBottom: '1px solid rgba(0,123,255,0.06)',
                background: isPlayoff ? `${color}08` : isRel ? 'rgba(255,59,92,0.05)' : 'transparent',
                borderLeft: `3px solid ${isPlayoff ? color : isRel ? '#FF3B5C' : 'transparent'}`,
              }}>
                <td className="px-3 py-3 w-10">
                  <span style={{ color: pos <= 3 ? color : '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 15 }}>
                    {pos}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <Link href={club?.slug ? `/clubs/${club.slug}` : '#'} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    {club?.logo_url ? (
                      <Image src={club.logo_url} alt={club.nom} width={28} height={28} style={{ objectFit: 'contain', flexShrink: 0 }} />
                    ) : (
                      <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${club?.couleur ?? color} 0%, ${club?.couleur ?? color}99 100%)` }}>
                        {club?.nom.slice(0, 2).toUpperCase() ?? '?'}
                      </div>
                    )}
                    <span style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600 }}>
                      {club?.nom ?? s.club_id}
                    </span>
                  </Link>
                </td>
                <td className="px-3 py-3 text-center" style={{ color: '#AAAAAA', fontSize: 13 }}>{s.journees_jouees}</td>
                <td className="px-3 py-3 text-center" style={{ color: '#00D084', fontSize: 13, fontWeight: 700 }}>{s.victoires}</td>
                <td className="px-3 py-3 text-center" style={{ color: '#AAAAAA', fontSize: 13 }}>{s.nuls}</td>
                <td className="px-3 py-3 text-center" style={{ color: '#FF3B5C', fontSize: 13 }}>{s.defaites}</td>
                <td className="px-3 py-3 text-center">
                  <span style={{ color: '#66CCFF', fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, fontSize: 17 }}>{s.points}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">{forme.map((r, fi) => <FormeChip key={fi} result={r} />)}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-sm" style={{ background: `${color}20`, borderLeft: `3px solid ${color}` }} />
      <span style={{ color: '#AAAAAA', fontSize: 12 }}>{label}</span>
    </div>
  );
}

function FormeChip({ result }: { result: 'V' | 'N' | 'D' }) {
  return (
    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
      style={{ background: result === 'V' ? '#00D084' : result === 'D' ? '#FF3B5C' : '#444455', fontSize: 9 }}>
      {result}
    </span>
  );
}
