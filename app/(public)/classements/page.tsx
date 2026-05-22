import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { StandingsTable } from '@/components/standings/StandingsTable';
import { PoolBadge } from '@/components/standings/PoolBadge';
import { sortStandings } from '@/lib/utils/standings';
import type { Classement, Pool } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Classements',
  description: 'Classements ICC 2026 — Pool Nord, Pool Ouest, Pool Centre/Est.',
};

export const revalidate = 30;

const POOLS: Pool[] = ['NORD', 'OUEST', 'CENTRE_EST'];

async function getStandings(): Promise<Record<Pool, Classement[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('classements')
      .select('*, club:clubs(*)')
      .eq('saison', '2026-2027');

    if (error || !data) throw new Error(error?.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = data as any[];
    return {
      NORD:       sortStandings(rows.filter(r => r.pool === 'NORD')       as Classement[]),
      OUEST:      sortStandings(rows.filter(r => r.pool === 'OUEST')      as Classement[]),
      CENTRE_EST: sortStandings(rows.filter(r => r.pool === 'CENTRE_EST') as Classement[]),
    };
  } catch {
    return { NORD: [], OUEST: [], CENTRE_EST: [] };
  }
}

export default async function ClassementsPage() {
  const standings = await getStandings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}
        >
          CLASSEMENTS
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          Saison 2026/2027 · Mis à jour en temps réel
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { color: '#00D084', label: 'Qualifié playoffs (Top 2)' },
          { color: '#FFB800', label: 'Barrage (3e place)' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ background: `${color}20`, borderLeft: `3px solid ${color}` }} />
            <span style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {(['V', 'N', 'D'] as const).map(r => (
              <span key={r} className="w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: r === 'V' ? '#00D084' : r === 'D' ? '#FF3B5C' : '#444455', fontSize: 8 }}>
                {r}
              </span>
            ))}
          </div>
          <span style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Forme (5 derniers)</span>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-10">
        {POOLS.map(pool => (
          <section key={pool} id={pool.toLowerCase()}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-1 h-8 rounded-full"
                style={{ background: pool === 'NORD' ? '#3B82F6' : pool === 'OUEST' ? '#8B5CF6' : '#10B981' }}
              />
              <PoolBadge pool={pool} size="lg" />
              <span style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                · {standings[pool].length} clubs
              </span>
            </div>

            <div className="rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.15)' }}>
              {standings[pool].length > 0
                ? <StandingsTable standings={standings[pool]} />
                : (
                  <div className="px-6 py-8 text-center">
                    <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      Saison pas encore commencée — J1 le 6 juillet 2026
                    </p>
                  </div>
                )}
            </div>
          </section>
        ))}
      </div>

      {/* Points system */}
      <section className="mt-12 p-6 rounded-xl"
        style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,123,255,0.1)' }}>
        <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
          Système de points
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Victoire', value: '3 pts', color: '#00D084' },
            { label: 'Nul',      value: '1 pt',  color: '#AAAAAA' },
            { label: 'Défaite',  value: '0 pt',  color: '#FF3B5C' },
            { label: 'Forfait',  value: '-1 pt', color: '#FF3B5C' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span style={{ color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 16, minWidth: 48 }}>{value}</span>
              <span style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ color: '#444455', fontSize: 12, fontFamily: 'Inter, sans-serif', marginTop: 12 }}>
          Départage : Points → Diff. matchs → Diff. sets → Diff. jeux → Confrontation directe
        </p>
      </section>
    </div>
  );
}
