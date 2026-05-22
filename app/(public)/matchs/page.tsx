import type { Metadata } from 'next';
import { JOURNEES } from '@/lib/constants/calendar';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Matchs',
  description: 'Tous les matchs ICC 2026 — Résultats et scores en direct.',
};

export default function MatchsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1
          className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}
        >
          MATCHS
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          Résultats et scores en temps réel
        </p>
      </div>

      {/* Journées list */}
      <div className="space-y-4">
        {JOURNEES.map(j => {
          const isPast = j.date < new Date();
          return (
            <div
              key={j.numero}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
                border: '1px solid rgba(0,123,255,0.12)',
              }}
            >
              {/* Journée header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(0,123,255,0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <Calendar size={16} style={{ color: '#007BFF' }} />
                  <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
                    Journée {j.numero}
                  </span>
                  <span style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                    · {j.date.toLocaleDateString('fr-MU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    background: isPast ? 'rgba(0,208,132,0.1)' : 'rgba(13,21,38,1)',
                    color: isPast ? '#00D084' : '#444455',
                    border: `1px solid ${isPast ? 'rgba(0,208,132,0.3)' : 'rgba(0,123,255,0.1)'}`,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {isPast ? 'Terminée' : 'Planifiée'}
                </span>
              </div>

              {/* Rencontres placeholder */}
              <div className="px-5 py-4">
                <p style={{ color: '#444455', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                  {isPast
                    ? 'Résultats disponibles dans l\'espace de saisie.'
                    : `Rencontres planifiées le ${j.date.toLocaleDateString('fr-MU', { weekday: 'long', day: 'numeric', month: 'long' })}.`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
