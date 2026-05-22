import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Layers, Trophy, Calendar, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { PoolBadge } from '@/components/standings/PoolBadge';
import type { Club, Classement } from '@/lib/supabase/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

async function getClub(slug: string): Promise<{ club: Club; classement: Classement | null } | null> {
  try {
    const supabase = await createClient();
    const { data: clubRaw, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error || !clubRaw) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const club = clubRaw as any as Club;

    const { data: classementRaw } = await supabase
      .from('classements')
      .select('*')
      .eq('club_id', club.id)
      .eq('saison', '2026-2027')
      .single();

    return { club, classement: classementRaw ? (classementRaw as unknown as Classement) : null };
  } catch {
    return null;
  }
}

async function getRank(club: Club, classement: Classement | null): Promise<number | null> {
  if (!classement) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('classements')
      .select('points, matchs_gagnes, matchs_perdus, sets_pour, sets_contre')
      .eq('pool', club.pool)
      .eq('saison', '2026-2027')
      .order('points', { ascending: false });
    if (!data) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = data as any[];
    const rank = rows.findIndex(r =>
      r.points === classement.points &&
      r.matchs_gagnes === classement.matchs_gagnes
    );
    return rank >= 0 ? rank + 1 : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getClub(slug);
  if (!result) return { title: 'Club introuvable' };
  return {
    title: result.club.nom,
    description: `Fiche club ICC 2026 — ${result.club.nom} · ${result.club.ville}`,
  };
}

export default async function ClubPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getClub(slug);
  if (!result) notFound();

  const { club, classement } = result;
  const rank = await getRank(club, classement);

  const forme = classement?.forme?.split('').filter(c => ['V', 'N', 'D'].includes(c)) ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div
        className="rounded-2xl p-8 mb-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${club.couleur}15 0%, rgba(13,21,38,0.9) 60%)`,
          border: `1px solid ${club.couleur}30`,
        }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{ background: `radial-gradient(ellipse at 80% 50%, ${club.couleur} 0%, transparent 70%)` }} />

        <div className="relative flex flex-col sm:flex-row items-start gap-6">
          {/* Logo */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0 overflow-hidden"
            style={{
              background: club.logo_url ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${club.couleur} 0%, ${club.couleur}99 100%)`,
              boxShadow: `0 0 30px ${club.couleur}40`,
            }}
          >
            {club.logo_url ? (
              <Image src={club.logo_url} alt={club.nom} width={80} height={80} style={{ objectFit: 'contain', width: '100%', height: '100%', padding: 8 }} />
            ) : (
              club.nom.slice(0, 2).toUpperCase()
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <PoolBadge pool={club.pool} size="md" />
            </div>
            <h1 className="text-white font-black mb-2"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)' }}>
              {club.nom}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5" style={{ color: '#AAAAAA', fontSize: 13 }}>
                <MapPin size={14} style={{ color: club.couleur }} />
                {club.ville}
              </div>
              <div className="flex items-center gap-1.5" style={{ color: '#AAAAAA', fontSize: 13 }}>
                <Layers size={14} style={{ color: club.couleur }} />
                {club.courts} courts padel
              </div>
            </div>
          </div>

          {/* Rank */}
          <div className="flex-shrink-0 text-center px-6 py-4 rounded-xl"
            style={{ background: 'rgba(13,21,38,0.6)', border: '1px solid rgba(0,123,255,0.15)' }}>
            <div style={{
              fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 36,
              color: rank === 1 ? '#FFD700' : '#66CCFF', lineHeight: 1,
            }}>
              {rank ? `#${rank}` : '—'}
            </div>
            <div style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', marginTop: 4 }}>
              {club.pool === 'NORD' ? 'Pool Nord' : club.pool === 'OUEST' ? 'Pool Ouest' : 'Pool Centre/Est'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Calendar, label: 'Journées jouées', value: classement?.journees_jouees ?? 0,  color: club.couleur },
          { icon: Trophy,   label: 'Victoires',       value: classement?.victoires ?? 0,        color: '#00D084' },
          { icon: Trophy,   label: 'Points',          value: classement?.points ?? 0,           color: '#66CCFF' },
          { icon: Users,    label: 'Nuls / Défaites', value: `${classement?.nuls ?? 0}N / ${classement?.defaites ?? 0}D`, color: '#AAAAAA' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="text-center rounded-xl p-4"
            style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.1)' }}>
            <Icon size={20} style={{ color, margin: '0 auto 8px' }} />
            <div style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 28, color: '#FFFFFF', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Forme */}
      {forme.length > 0 && (
        <div className="rounded-xl p-5 mb-6 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.12)' }}>
          <span style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Forme récente</span>
          <div className="flex gap-1.5">
            {forme.slice(-5).map((r, i) => (
              <span key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: r === 'V' ? '#00D084' : r === 'D' ? '#FF3B5C' : '#444455', fontSize: 11 }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Roster placeholder */}
      <div className="rounded-xl p-6 mb-6"
        style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.12)' }}>
        <h2 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
          <Users size={18} className="inline mr-2" style={{ color: club.couleur }} />
          Effectif
        </h2>
        <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
          L'effectif sera disponible après ouverture de la saison.
        </p>
      </div>

      {/* Match history placeholder */}
      <div className="rounded-xl p-6"
        style={{ background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)', border: '1px solid rgba(0,123,255,0.12)' }}>
        <h2 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
          <Calendar size={18} className="inline mr-2" style={{ color: club.couleur }} />
          Résultats
        </h2>
        <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
          Les résultats seront disponibles à partir du 6 juillet 2026 (J1).
        </p>
      </div>
    </div>
  );
}
