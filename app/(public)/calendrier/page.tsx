import type { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';
import { JOURNEES, PLAYOFFS, getNextJournee, MATCH_SCHEDULE } from '@/lib/constants/calendar';

export const metadata: Metadata = {
  title: 'Calendrier',
  description: 'Calendrier officiel ICC 2026 — Toutes les journées du championnat.',
};

const nextJournee = getNextJournee();

export default function CalendrierPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}
        >
          CALENDRIER
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          Saison 2026/2027 · Juillet 2026 → Juin 2027
        </p>
      </div>

      {/* Phase Aller */}
      <PhaseSection phase="ALLER" label="Phase Aller" />

      {/* Phase Retour */}
      <PhaseSection phase="RETOUR" label="Phase Retour" />

      {/* Playoffs */}
      <section className="mb-12">
        <SectionTitle label="Playoffs" color="#FFD700" />
        <div className="space-y-3">
          {[
            { stage: 'Quarts de finale', date: PLAYOFFS.quarts },
            { stage: 'Demi-finales',     date: PLAYOFFS.demis  },
            { stage: 'Grande Finale',    date: PLAYOFFS.finale, highlight: true },
          ].map(({ stage, date, highlight }) => (
            <div
              key={stage}
              className="flex items-center gap-4 px-5 py-4 rounded-xl"
              style={{
                background: highlight ? 'rgba(255,215,0,0.06)' : 'rgba(13,21,38,0.8)',
                border: highlight ? '1px solid rgba(255,215,0,0.3)' : '1px solid rgba(0,123,255,0.1)',
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: highlight ? 'rgba(255,215,0,0.15)' : 'rgba(13,21,38,1)',
                  border: highlight ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(0,123,255,0.15)',
                }}
              >
                {highlight ? '🏆' : '⚡'}
              </div>
              <div className="flex-1">
                <div
                  className="font-semibold"
                  style={{
                    color: highlight ? '#FFD700' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                  }}
                >
                  {stage}
                </div>
                <div style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{date}</div>
              </div>
              {highlight && (
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700', fontFamily: 'Poppins, sans-serif' }}
                >
                  FINALE
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Horaires type */}
      <section
        className="rounded-xl p-6"
        style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,123,255,0.1)' }}
      >
        <h3 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
          <Clock size={16} className="inline mr-2" style={{ color: '#007BFF' }} />
          Horaires types (club 2 courts)
        </h3>
        <div className="space-y-2">
          {MATCH_SCHEDULE.map(({ heure, matchs }) => (
            <div key={heure} className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  color: '#66CCFF',
                  minWidth: 56,
                }}
              >
                {heure}
              </span>
              <div className="flex gap-2">
                {matchs.map(m => (
                  <span
                    key={m}
                    className="px-2 py-0.5 rounded text-xs font-semibold"
                    style={{
                      background: m.startsWith('M') ? 'rgba(0,123,255,0.15)' : 'rgba(139,92,246,0.15)',
                      color: m.startsWith('M') ? '#007BFF' : '#8B5CF6',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
              {matchs.length === 2 && (
                <span style={{ color: '#444455', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>simultanés</span>
              )}
            </div>
          ))}
        </div>
        <p style={{ color: '#444455', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 12 }}>
          Fin prévue ~22h15 · M = Messieurs · W = Dames
        </p>
      </section>
    </div>
  );
}

function SectionTitle({ label, color = '#007BFF' }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-7 rounded-full" style={{ background: color }} />
      <h2 className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18 }}>{label}</h2>
    </div>
  );
}

function PhaseSection({ phase, label }: { phase: 'ALLER' | 'RETOUR'; label: string }) {
  const journees = JOURNEES.filter(j => j.phase === phase);
  const color = phase === 'ALLER' ? '#007BFF' : '#8B5CF6';

  return (
    <section className="mb-10">
      <SectionTitle label={label} color={color} />
      <div className="space-y-3">
        {journees.map(j => {
          const isPast = j.date < new Date();
          const isNext = j === nextJournee;

          return (
            <div
              key={j.numero}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all"
              style={{
                background: isNext ? 'rgba(0,123,255,0.1)' : 'rgba(13,21,38,0.8)',
                border: isNext
                  ? '1px solid rgba(0,123,255,0.4)'
                  : isPast
                  ? '1px solid rgba(0,208,132,0.15)'
                  : '1px solid rgba(0,123,255,0.08)',
              }}
            >
              {/* Journée badge */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black"
                style={{
                  background: isNext ? '#007BFF' : isPast ? 'rgba(0,208,132,0.1)' : 'rgba(13,21,38,1)',
                  color: isNext ? '#FFFFFF' : isPast ? '#00D084' : '#AAAAAA',
                  fontFamily: '"Arial Black", sans-serif',
                  fontSize: 13,
                  border: isPast ? '1px solid rgba(0,208,132,0.3)' : '1px solid rgba(0,123,255,0.15)',
                }}
              >
                J{j.numero}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div
                  className="font-semibold mb-0.5"
                  style={{
                    color: isNext ? '#FFFFFF' : '#CCCCCC',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                  }}
                >
                  {j.date.toLocaleDateString('fr-MU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                  Journée {j.numero} · Phase {j.phase === 'ALLER' ? 'Aller' : 'Retour'}
                </div>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                {isNext && (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(0,123,255,0.2)', color: '#66CCFF', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Prochain
                  </span>
                )}
                {isPast && !isNext && (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(0,208,132,0.1)', color: '#00D084', fontFamily: 'Poppins, sans-serif' }}
                  >
                    ✓ Terminé
                  </span>
                )}
                {!isPast && !isNext && (
                  <span
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(13,21,38,1)', color: '#444455', fontFamily: 'Poppins, sans-serif', border: '1px solid rgba(0,123,255,0.1)' }}
                  >
                    Planifié
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
