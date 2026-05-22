import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { ClubCard } from '@/components/club/ClubCard';
import type { Club, Division, Genre } from '@/lib/supabase/types';
import { DIVISION_COLORS, DIVISION_LABELS, GENRE_LABELS } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Clubs',
  description: "Les clubs participants à l'ICC 2026/2027 — Mauritius Padel League.",
};

export const revalidate = 3600;

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

/** Group clubs by division+genre. Clubs with null division go into an "unassigned" bucket. */
function groupByDivision(clubs: Club[]): {
  assigned: { division: Division; genre: Genre; clubs: Club[] }[];
  unassigned: Club[];
} {
  const map = new Map<string, { division: Division; genre: Genre; clubs: Club[] }>();
  const unassigned: Club[] = [];

  for (const club of clubs) {
    if (!club.division) {
      unassigned.push(club);
    } else {
      const key = `${club.division}-${club.genre}`;
      if (!map.has(key)) {
        map.set(key, { division: club.division, genre: club.genre as Genre, clubs: [] });
      }
      map.get(key)!.clubs.push(club);
    }
  }

  // Sort: D1H, D2H, D3H, D4H, D1F, D2F, D3F
  const order = ['1-H','2-H','3-H','4-H','1-F','2-F','3-F'];
  const assigned = [...map.values()].sort((a, b) => {
    const ia = order.indexOf(`${a.division}-${a.genre}`);
    const ib = order.indexOf(`${b.division}-${b.genre}`);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return { assigned, unassigned };
}

export default async function ClubsPage() {
  const clubs = await getClubs();
  const { assigned, unassigned } = groupByDivision(clubs);

  // If no division assigned yet, show flat list
  const showFlat = assigned.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}>
          LES CLUBS
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          {clubs.length > 0 ? `${clubs.length} clubs participants` : 'Inscriptions en cours'} · Saison 2026/2027
          {showFlat && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(0,123,255,0.12)', color: '#66CCFF', border: '1px solid rgba(0,123,255,0.2)', fontFamily: 'Poppins, sans-serif' }}>
              Divisions attribuées en juin 2026
            </span>
          )}
        </p>
      </div>

      {showFlat ? (
        /* ── Flat grid (no divisions assigned yet) ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map(club => <ClubCard key={club.id} club={club} />)}
        </div>
      ) : (
        /* ── Grouped by division ── */
        <>
          {assigned.map(({ division, genre, clubs: divClubs }) => {
            const color = DIVISION_COLORS[division];
            return (
              <section key={`${division}-${genre}`} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full" style={{ background: color }} />
                  <span className="font-semibold"
                    style={{ color, fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700 }}>
                    {DIVISION_LABELS[division]} {GENRE_LABELS[genre as Genre]}
                  </span>
                  <span style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                    · {divClubs.length} clubs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {divClubs.map(club => <ClubCard key={club.id} club={club} />)}
                </div>
              </section>
            );
          })}

          {/* Unassigned */}
          {unassigned.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ background: '#444455' }} />
                <span className="font-semibold"
                  style={{ color: '#AAAAAA', fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700 }}>
                  Division en cours d'attribution
                </span>
                <span style={{ color: '#444455', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                  · {unassigned.length} clubs
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {unassigned.map(club => <ClubCard key={club.id} club={club} />)}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
