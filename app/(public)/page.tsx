import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Calendar, Users, ArrowRight, ChevronRight, Star, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { JOURNEES, getNextJournee } from '@/lib/constants/calendar';
import { CLUBS_BY_POOL, POOL_COLORS } from '@/lib/constants/clubs';
import { createClient } from '@/lib/supabase/server';
import { sortStandings } from '@/lib/utils/standings';
import { PoolBadge } from '@/components/standings/PoolBadge';
import { RankBadge } from '@/components/standings/RankBadge';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import type { Classement, Pool } from '@/lib/supabase/types';

export const metadata: Metadata = {
  title: 'Accueil — ICC 2026',
  description: 'Mauritius Padel League Interclub Championship 2026/2027. Scores live, classements et calendrier.',
};

export const revalidate = 60;

const POOL_COLORS_MAP = [
  { pool: 'NORD'       as Pool, color: '#3B82F6' },
  { pool: 'OUEST'      as Pool, color: '#8B5CF6' },
  { pool: 'CENTRE_EST' as Pool, color: '#10B981' },
];

async function getStandingsByPool(): Promise<Record<Pool, Classement[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('classements')
      .select('*, club:clubs(*)')
      .eq('saison', '2026-2027');
    if (error || !data) throw new Error();
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

export default async function HomePage() {
  const [standings, nextJournee] = await Promise.all([
    getStandingsByPool(),
    Promise.resolve(getNextJournee()),
  ]);
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
        style={{ background: '#070B14' }}
      >
        {/* Dot-blue background image */}
        <Image
          src="/dot-blue.png"
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.35 }}
          priority
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(7,11,20,0.5) 0%, rgba(7,11,20,0.75) 60%, #070B14 100%)' }}
        />

        {/* Ambient blue glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 800px 600px at 50% 40%, rgba(0,123,255,0.10) 0%, transparent 70%)',
          }}
        />

        {/* MPL Logo — outside z-10 so mix-blend-mode reaches the hero background layers */}
        <div className="mb-6" style={{ mixBlendMode: 'screen', flexShrink: 0 }}>
          <Image
            src="/logos/mpl-msra.png"
            alt="Mauritius Padel League"
            width={380}
            height={150}
            style={{ objectFit: 'contain', display: 'block' }}
            priority
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
          {/* Season label */}
          <div className="mb-4 flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(0,123,255,0.15)',
                border: '1px solid rgba(0,123,255,0.3)',
                color: '#66CCFF',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" style={{ background: '#00D084' }} />
              Saison 2026/2027 · Inscriptions ouvertes
            </span>
          </div>

          {/* Main title */}
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontFamily: '"Arial Black", Impact, sans-serif',
              fontSize: 'clamp(36px, 8vw, 72px)',
              background: 'linear-gradient(135deg, #007BFF 0%, #66CCFF 50%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            INTERCLUB
            <br />
            CHAMPIONSHIP 2026
          </h1>

          <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 18 }} className="mb-8">
            Mauritius Padel League — Saison 2026/2027
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: Users, label: '18 Clubs' },
              { icon: Trophy, label: '3 Pools' },
              { icon: Calendar, label: '10 Journées' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  background: 'rgba(13,21,38,0.8)',
                  border: '1px solid rgba(0,123,255,0.2)',
                }}
              >
                <Icon size={16} style={{ color: '#007BFF' }} />
                <span style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/classements"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)',
                boxShadow: '0 4px 20px rgba(0,123,255,0.35)',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
              }}
            >
              <BarChart3Icon />
              Voir les classements
            </Link>
            <Link
              href="/calendrier"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all"
              style={{
                background: 'rgba(13,21,38,0.9)',
                border: '1px solid rgba(0,123,255,0.3)',
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
              }}
            >
              <Calendar size={18} />
              Calendrier
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>Défiler</span>
          <div
            className="w-0.5 h-8"
            style={{ background: 'linear-gradient(180deg, #007BFF, transparent)' }}
          />
        </div>
      </section>

      {/* ── PROCHAINE JOURNÉE ──────────────────────────────────────── */}
      {nextJournee && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
                border: '1px solid rgba(0,123,255,0.2)',
                boxShadow: '0 0 40px rgba(0,123,255,0.08)',
              }}
            >
              <div className="mb-2">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: 'rgba(0,123,255,0.15)', color: '#66CCFF', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Clock size={11} />
                  Prochaine Journée
                </span>
              </div>

              <h2
                className="text-white font-black mb-1"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(24px, 5vw, 40px)' }}
              >
                JOURNÉE {nextJournee.numero}
              </h2>

              <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }} className="mb-6">
                {nextJournee.date.toLocaleDateString('fr-MU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}
                Phase {nextJournee.phase === 'ALLER' ? 'Aller' : 'Retour'}
              </p>

              <CountdownTimer targetDate={nextJournee.date} />

              <div className="mt-6">
                <Link
                  href="/calendrier"
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: '#007BFF', fontFamily: 'Poppins, sans-serif' }}
                >
                  Voir le calendrier complet <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CLASSEMENTS PREVIEW ───────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-black"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', color: '#FFFFFF' }}
            >
              CLASSEMENTS
            </h2>
            <Link
              href="/classements"
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: '#007BFF', fontFamily: 'Poppins, sans-serif' }}
            >
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {POOL_COLORS_MAP.map(({ pool, color }) => {
              const sorted = standings[pool].slice(0, 3);
              return (
                <div
                  key={pool}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
                    border: `1px solid ${color}25`,
                  }}
                >
                  {/* Pool header */}
                  <div
                    className="px-5 py-3 flex items-center justify-between"
                    style={{ background: `${color}12`, borderBottom: `1px solid ${color}25` }}
                  >
                    <PoolBadge pool={pool} size="sm" />
                  </div>

                  {/* Top 3 */}
                  <div className="p-3">
                    {sorted.map((row, idx) => (
                      <div
                        key={row.club_id}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg"
                        style={{
                          background: idx === 0 ? 'rgba(255,215,0,0.04)' : 'transparent',
                          borderBottom: idx < 2 ? '1px solid rgba(0,123,255,0.06)' : 'none',
                        }}
                      >
                        <RankBadge rank={idx + 1} />
                        {idx === 0 && (
                          <Star size={12} style={{ color: '#FFD700', flexShrink: 0 }} />
                        )}
                        <span
                          className="flex-1 truncate"
                          style={{
                            color: idx === 0 ? '#FFFFFF' : '#AAAAAA',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 13,
                            fontWeight: idx === 0 ? 600 : 400,
                          }}
                        >
                          {row.club?.nom ?? '—'}
                        </span>
                        <span
                          style={{
                            color: '#66CCFF',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {row.points} pts
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 pb-3">
                    <Link
                      href={`/classements#${pool.toLowerCase()}`}
                      className="block text-center text-xs py-2 rounded-lg transition-colors"
                      style={{
                        color: color,
                        background: `${color}10`,
                        border: `1px solid ${color}20`,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      Classement complet →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLUBS SECTION ─────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'rgba(13,21,38,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-black"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', color: '#FFFFFF' }}
            >
              18 CLUBS PARTICIPANTS
            </h2>
            <Link
              href="/clubs"
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#007BFF', fontFamily: 'Poppins, sans-serif' }}
            >
              Tous les clubs <ChevronRight size={16} />
            </Link>
          </div>

          {/* Pool groups */}
          {POOL_COLORS_MAP.map(({ pool, color }) => (
            <div key={pool} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ background: color }} />
                <PoolBadge pool={pool} size="md" />
              </div>
              <div className="flex flex-wrap gap-2">
                {CLUBS_BY_POOL[pool].map(club => (
                  <Link
                    key={club.id}
                    href={`/clubs/${club.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                    style={{
                      background: 'rgba(13,21,38,0.8)',
                      border: '1px solid rgba(0,123,255,0.12)',
                      color: '#FFFFFF',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: color, fontSize: 7 }}
                    >
                      {club.nom.slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{club.nom}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CALENDAR PREVIEW ──────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-black"
              style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', color: '#FFFFFF' }}
            >
              CALENDRIER
            </h2>
            <Link
              href="/calendrier"
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#007BFF', fontFamily: 'Poppins, sans-serif' }}
            >
              Calendrier complet <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {JOURNEES.map(j => {
              const isPast = j.date < new Date();
              const isNext = j === nextJournee;
              return (
                <Link key={j.numero} href="/calendrier">
                  <div
                    className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all"
                    style={{
                      background: isNext
                        ? 'rgba(0,123,255,0.12)'
                        : 'rgba(13,21,38,0.8)',
                      border: isNext
                        ? '1px solid rgba(0,123,255,0.4)'
                        : '1px solid rgba(0,123,255,0.1)',
                    }}
                  >
                    {/* Journée number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm"
                      style={{
                        background: isNext ? '#007BFF' : isPast ? 'rgba(0,208,132,0.15)' : 'rgba(13,21,38,1)',
                        color: isNext ? '#FFFFFF' : isPast ? '#00D084' : '#AAAAAA',
                        fontFamily: 'Poppins, sans-serif',
                        border: isPast ? '1px solid rgba(0,208,132,0.3)' : '1px solid rgba(0,123,255,0.15)',
                      }}
                    >
                      J{j.numero}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className="font-semibold"
                        style={{
                          color: isNext ? '#FFFFFF' : '#AAAAAA',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 13,
                        }}
                      >
                        {j.date.toLocaleDateString('fr-MU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div style={{ color: '#444455', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>
                        Phase {j.phase === 'ALLER' ? 'Aller' : 'Retour'}
                      </div>
                    </div>

                    {isNext && (
                      <span
                        className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ background: 'rgba(0,123,255,0.2)', color: '#66CCFF', fontFamily: 'Poppins, sans-serif' }}
                      >
                        Prochain
                      </span>
                    )}
                    {isPast && (
                      <span
                        className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ background: 'rgba(0,208,132,0.15)', color: '#00D084', fontFamily: 'Poppins, sans-serif' }}
                      >
                        Terminé
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORMAT SECTION ────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'rgba(13,21,38,0.5)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-black mb-3"
            style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', color: '#FFFFFF' }}
          >
            FORMAT DE COMPÉTITION
          </h2>
          <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }} className="mb-10">
            Championnat en poules — Round-robin aller-retour
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '18', label: 'Clubs', sub: '3 pools de 6' },
              { value: '10', label: 'Journées', sub: '5 aller + 5 retour' },
              { value: '9', label: 'Matchs/journée', sub: '5H + 4F par club' },
              { value: '8', label: 'Playoffs', sub: 'Top 2 + 2 meilleurs 3es' },
            ].map(({ value, label, sub }) => (
              <div
                key={label}
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
                  border: '1px solid rgba(0,123,255,0.15)',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Arial Black", Impact, sans-serif',
                    fontSize: 36,
                    background: 'linear-gradient(135deg, #007BFF 0%, #66CCFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label}</div>
                <div style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 11, marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BarChart3Icon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
