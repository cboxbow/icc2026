import type { Match } from '@/lib/supabase/types';

interface MatchRowProps {
  match: Match;
  showTime?: boolean;
}

function SetScore({ dom, vis }: { dom: number | null; vis: number | null }) {
  if (dom === null || vis === null) return <span style={{ color: '#444455' }}>—</span>;
  const domWon = dom > vis;
  const visWon = vis > dom;
  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
      <span style={{ color: domWon ? '#FFFFFF' : '#AAAAAA', fontWeight: domWon ? 700 : 400 }}>{dom}</span>
      <span style={{ color: '#444455' }}>-</span>
      <span style={{ color: visWon ? '#FFFFFF' : '#AAAAAA', fontWeight: visWon ? 700 : 400 }}>{vis}</span>
    </span>
  );
}

export function MatchRow({ match, showTime = false }: MatchRowProps) {
  const label = `Double ${match.ordre}`;
  const isLive = match.statut === 'EN_COURS';
  const isDone = match.statut === 'TERMINE';

  const domName = match.j1_dom && match.j2_dom
    ? `${match.j1_dom.prenom} / ${match.j2_dom.prenom}`
    : 'À définir';
  const visName = match.j1_vis && match.j2_vis
    ? `${match.j1_vis.prenom} / ${match.j2_vis.prenom}`
    : 'À définir';

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
      style={{
        background: isLive ? 'rgba(0,123,255,0.08)' : 'transparent',
        border: isLive ? '1px solid rgba(0,123,255,0.25)' : '1px solid transparent',
      }}
    >
      {/* Label: Double 1 / 2 / 3 */}
      <div className="flex-shrink-0 w-14 text-center">
        <span
          className="inline-flex items-center justify-center rounded font-bold text-xs"
          style={{
            color: '#007BFF',
            background: 'rgba(0,123,255,0.15)',
            padding: '2px 5px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {label}
        </span>
      </div>

      {/* Live indicator */}
      {isLive && (
        <div className="badge-live text-white flex-shrink-0">LIVE</div>
      )}

      {/* Players & Scores */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          {/* DOM */}
          <div className="flex-1 min-w-0">
            <span
              className="truncate block"
              style={{
                color: match.gagnant === 'DOM' ? '#FFFFFF' : '#AAAAAA',
                fontWeight: match.gagnant === 'DOM' ? 600 : 400,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
              }}
            >
              {domName}
            </span>
          </div>

          {/* Sets */}
          {isDone || isLive ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <SetScore dom={match.set1_dom} vis={match.set1_vis} />
              {match.set2_dom !== null && <SetScore dom={match.set2_dom} vis={match.set2_vis} />}
              {match.set3_dom !== null && <SetScore dom={match.set3_dom} vis={match.set3_vis} />}
            </div>
          ) : (
            <span style={{ color: '#444455', fontSize: 12 }}>
              {showTime && match.heure_debut ? new Date(match.heure_debut).toLocaleTimeString('fr-MU', { hour: '2-digit', minute: '2-digit' }) : 'vs'}
            </span>
          )}

          {/* VIS */}
          <div className="flex-1 min-w-0 text-right">
            <span
              className="truncate block"
              style={{
                color: match.gagnant === 'VIS' ? '#FFFFFF' : '#AAAAAA',
                fontWeight: match.gagnant === 'VIS' ? 600 : 400,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
              }}
            >
              {visName}
            </span>
          </div>
        </div>
      </div>

      {/* Result badge */}
      {match.gagnant && (
        <div className="flex-shrink-0">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: '#00D084', fontSize: 10, display: 'inline-flex' }}
          >
            ✓
          </span>
        </div>
      )}
    </div>
  );
}
