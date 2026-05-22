import type { Metadata } from 'next';
import { Users, Trophy, Calendar, ClipboardCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { CLUBS } from '@/lib/constants/clubs';
import { JOURNEES } from '@/lib/constants/calendar';

export const metadata: Metadata = { title: 'Admin Dashboard — ICC 2026' };

const totalJournees = JOURNEES.length;
const totalClubs    = CLUBS.length;
const nextJ         = JOURNEES.find(j => j.date > new Date());

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-black mb-1" style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 32 }}>
            Dashboard Admin
          </h1>
          <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
            Mauritius Padel League · ICC 2026/2027
          </p>
        </div>
        <span
          className="px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)', fontFamily: 'Poppins, sans-serif' }}
        >
          SUPER ADMIN
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users,          label: 'Clubs inscrits',    value: totalClubs, sub: '18 pools confirmés', color: '#007BFF' },
          { icon: Trophy,         label: 'Matchs validés',    value: 0,          sub: 'Saison pas encore lancée', color: '#00D084' },
          { icon: Calendar,       label: 'Journées restantes', value: totalJournees, sub: 'J1 → J10', color: '#8B5CF6' },
          { icon: ClipboardCheck, label: 'En attente',        value: 0,          sub: 'Scores à valider', color: '#FFB800' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
              border: `1px solid ${color}20`,
            }}
          >
            <Icon size={20} style={{ color, marginBottom: 12 }} />
            <div style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 32, color: '#FFFFFF', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Poppins, sans-serif', marginTop: 4, fontWeight: 600 }}>{label}</div>
            <div style={{ color: '#444455', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Alertes */}
        <div
          className="rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
            border: '1px solid rgba(255,184,0,0.2)',
          }}
        >
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
            <AlertTriangle size={16} className="inline mr-2" style={{ color: '#FFB800' }} />
            Alertes
          </h2>
          <div className="space-y-2">
            <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
              Aucune alerte active — saison non lancée.
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div
          className="rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
            border: '1px solid rgba(0,123,255,0.12)',
          }}
        >
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
            Actions rapides
          </h2>
          <div className="space-y-2">
            {[
              { label: 'Recalculer les classements', icon: RefreshCw,      color: '#007BFF' },
              { label: 'Valider résultats en attente', icon: ClipboardCheck, color: '#00D084' },
              { label: 'Envoyer rappel clubs',        icon: Users,         color: '#8B5CF6' },
            ].map(({ label, icon: Icon, color }) => (
              <button
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}20`,
                  color: '#FFFFFF',
                }}
              >
                <Icon size={16} style={{ color }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prochaine journée info */}
      {nextJ && (
        <div
          className="rounded-xl p-6"
          style={{
            background: 'rgba(0,123,255,0.06)',
            border: '1px solid rgba(0,123,255,0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
                Prochaine journée : J{nextJ.numero}
              </h3>
              <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 13, marginTop: 4 }}>
                {nextJ.date.toLocaleDateString('fr-MU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                {' · '}{totalClubs / 2} rencontres prévues
              </p>
            </div>
            <div
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: 'rgba(0,123,255,0.15)', color: '#66CCFF', fontFamily: 'Poppins, sans-serif' }}
            >
              Planifiée
            </div>
          </div>
        </div>
      )}

      {/* Clubs list */}
      <div
        className="mt-6 rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
          border: '1px solid rgba(0,123,255,0.12)',
        }}
      >
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,123,255,0.1)' }}>
          <h2 className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
            <Users size={16} className="inline mr-2" style={{ color: '#007BFF' }} />
            Clubs inscrits ({totalClubs})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,123,255,0.08)' }}>
                {['Club', 'Pool', 'Ville', 'Courts', 'Statut'].map(h => (
                  <th key={h} className="text-left px-6 py-3" style={{ color: '#AAAAAA', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLUBS.map(club => (
                <tr
                  key={club.id}
                  style={{ borderBottom: '1px solid rgba(0,123,255,0.06)' }}
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: club.couleur, fontSize: 7 }}
                      >
                        {club.nom.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{club.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: club.pool === 'NORD' ? 'rgba(59,130,246,0.15)' : club.pool === 'OUEST' ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.15)',
                        color: club.pool === 'NORD' ? '#3B82F6' : club.pool === 'OUEST' ? '#8B5CF6' : '#10B981',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {club.pool}
                    </span>
                  </td>
                  <td className="px-6 py-3" style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{club.ville}</td>
                  <td className="px-6 py-3" style={{ color: '#AAAAAA', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{club.courts}</td>
                  <td className="px-6 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,208,132,0.15)', color: '#00D084', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Inscrit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
