import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ClubCard } from '@/components/club/ClubCard';
import { PoolBadge } from '@/components/standings/PoolBadge';
import { POOL_COLORS } from '@/lib/constants/clubs';
import type { Club, Pool } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Clubs',
  description: "18 clubs participants à l'ICC 2026 — Mauritius Padel League.",
};

export const revalidate = 3600;

const POOLS: Pool[] = ['NORD', 'OUEST', 'CENTRE_EST'];

async function getClubs(): Promise<Club[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('actif', true)
      .order('nom');
    if (error || !data) throw new Error();
    return data as Club[];
  } catch {
    return [];
  }
}

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1
          className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}
        >
          LES CLUBS
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          {clubs.length} clubs répartis en 3 pools géographiques · Saison 2026/2027
        </p>
      </div>

      {POOLS.map(pool => {
        const poolClubs = clubs.filter(c => c.pool === pool);
        return (
          <section key={pool} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: POOL_COLORS[pool] }} />
              <PoolBadge pool={pool} size="lg" />
              <span style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                · {poolClubs.length} clubs
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {poolClubs.map(club => <ClubCard key={club.id} club={club} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
