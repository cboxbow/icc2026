import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'OBS Overlay — ICC 2026' };

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ theme?: string; show_sets?: string; show_players?: string }>;
}

export default async function OBSOverlay({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { theme = 'dark', show_sets = 'true', show_players = 'true' } = await searchParams;

  const transparent = theme === 'transparent';

  return (
    <div
      style={{
        width: 800,
        height: 200,
        background: transparent ? 'transparent' : 'rgba(7,11,20,0.92)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        fontFamily: '"Arial Black", Impact, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        border: transparent ? 'none' : '1px solid rgba(0,123,255,0.3)',
        borderRadius: 12,
        backdropFilter: transparent ? 'none' : 'blur(12px)',
      }}
    >
      {/* Ambient glow */}
      {!transparent && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 400px 200px at 50% 50%, rgba(0,123,255,0.06) 0%, transparent 70%)',
        }} />
      )}

      {/* Left team */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 10,
            background: 'linear-gradient(135deg, #3B82F6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: 14,
            marginBottom: 4,
          }}
        >
          DOM
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
          Club Domicile
        </div>
        {show_players === 'true' && (
          <div style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Joueur 1 / Joueur 2
          </div>
        )}
      </div>

      {/* Score */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '0 24px' }}>
        {/* Match label */}
        <div
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color: '#007BFF', fontFamily: 'Poppins, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          H1 · En cours
        </div>

        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 56, color: '#FFFFFF', fontWeight: 900, lineHeight: 1 }}>0</span>
          <span style={{ fontSize: 36, color: '#444455', fontWeight: 900, lineHeight: 1 }}>—</span>
          <span style={{ fontSize: 56, color: '#FFFFFF', fontWeight: 900, lineHeight: 1 }}>0</span>
        </div>

        {/* Sets */}
        {show_sets === 'true' && (
          <div style={{ display: 'flex', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
            <span style={{ color: '#AAAAAA' }}>—</span>
          </div>
        )}

        {/* Live badge */}
        <div className="badge-live" style={{ marginTop: 4 }}>LIVE</div>
      </div>

      {/* Right team */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 10,
            background: 'linear-gradient(135deg, #8B5CF6, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: 14,
            marginBottom: 4,
          }}
        >
          VIS
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900, lineHeight: 1, textAlign: 'right' }}>
          Club Visiteur
        </div>
        {show_players === 'true' && (
          <div style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 400, textAlign: 'right' }}>
            Joueur 3 / Joueur 4
          </div>
        )}
      </div>

      {/* MPL logo bottom right */}
      <div style={{
        position: 'absolute', bottom: 8, right: 12,
        fontSize: 10, color: '#444455', fontFamily: 'Poppins, sans-serif', fontWeight: 600,
      }}>
        MPL · ICC 2026
      </div>
    </div>
  );
}
