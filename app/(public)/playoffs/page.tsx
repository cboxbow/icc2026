import type { Metadata } from 'next';
import { Trophy, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Playoffs',
  description: 'Bracket playoffs ICC 2026 — Quarts, demi-finales et Grande Finale.',
};

export default function PlayoffsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-black mb-2"
          style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF' }}
        >
          PLAYOFFS
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
          8 équipes qualifiées · Mai–Juin 2027
        </p>
      </div>

      {/* Format info */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: 'rgba(255,215,0,0.05)',
          border: '1px solid rgba(255,215,0,0.2)',
        }}
      >
        <div className="flex items-start gap-3">
          <Trophy size={22} style={{ color: '#FFD700', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 className="text-white font-bold mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
              Qualification
            </h3>
            <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 13, lineHeight: 1.6 }}>
              Top 2 de chaque pool (6 clubs) + 2 meilleurs 3es places (2 clubs) = <strong style={{ color: '#FFFFFF' }}>8 équipes qualifiées</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Bracket placeholder */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
          border: '1px solid rgba(0,123,255,0.15)',
        }}
      >
        {/* Stages header */}
        <div className="grid grid-cols-3 border-b" style={{ borderColor: 'rgba(0,123,255,0.12)' }}>
          {['Quarts de finale', 'Demi-finales', 'Finale'].map((stage, i) => (
            <div
              key={stage}
              className="px-4 py-3 text-center"
              style={{
                borderRight: i < 2 ? '1px solid rgba(0,123,255,0.12)' : 'none',
              }}
            >
              <span style={{ color: '#AAAAAA', fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {stage}
              </span>
              <div style={{ color: '#444455', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
                {i === 0 ? 'Mai 2027' : i === 1 ? 'Mai 2027' : 'Juin 2027'}
              </div>
            </div>
          ))}
        </div>

        {/* Bracket visual */}
        <div className="p-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <Trophy size={48} style={{ color: '#FFD700', opacity: 0.3 }} />
            <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 15 }}>
              Le bracket sera disponible après la phase de poules
            </p>
            <p style={{ color: '#444455', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
              Fin de la phase régulière : 7 Avril 2027
            </p>
          </div>
        </div>

        {/* Slots preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 pt-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'rgba(13,21,38,0.6)', border: '1px solid rgba(0,123,255,0.08)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                    style={{ background: 'rgba(0,123,255,0.1)', color: '#007BFF', fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
                  >
                    QF{i + 1}
                  </div>
                  <div>
                    <div
                      className="w-24 h-3 rounded skeleton mb-1"
                      style={{ background: 'rgba(17,29,53,1)' }}
                    />
                    <div style={{ color: '#444455', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>vs</div>
                    <div
                      className="w-20 h-3 rounded skeleton"
                      style={{ background: 'rgba(17,29,53,1)' }}
                    />
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: '#444455' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
