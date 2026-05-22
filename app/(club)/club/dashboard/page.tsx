import type { Metadata } from 'next';
import { Calendar, Trophy, Users, ClipboardList, Plus } from 'lucide-react';
import { JOURNEES, getNextJournee } from '@/lib/constants/calendar';

export const metadata: Metadata = { title: 'Dashboard Club — ICC 2026' };

const nextJournee = getNextJournee();

export default function ClubDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white font-black mb-1" style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 32 }}>
          Dashboard
        </h1>
        <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
          Gérez votre club · Saison ICC 2026/2027
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Calendar,     label: 'Journées jouées', value: '0',  color: '#007BFF' },
          { icon: Trophy,       label: 'Victoires',       value: '0',  color: '#00D084' },
          { icon: Users,        label: 'Joueurs inscrits', value: '0', color: '#8B5CF6' },
          { icon: ClipboardList, label: 'Matchs saisis',  value: '0',  color: '#FFB800' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
              border: `1px solid ${color}20`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} style={{ color }} />
            </div>
            <div style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: 32, color: '#FFFFFF', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Poppins, sans-serif', marginTop: 4 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prochaine journée */}
        <div
          className="rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
            border: '1px solid rgba(0,123,255,0.2)',
          }}
        >
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
            <Calendar size={16} className="inline mr-2" style={{ color: '#007BFF' }} />
            Prochaine journée
          </h2>
          {nextJournee ? (
            <div>
              <div className="text-white font-black mb-1" style={{ fontFamily: '"Arial Black", sans-serif', fontSize: 24 }}>
                Journée {nextJournee.numero}
              </div>
              <p style={{ color: '#AAAAAA', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
                {nextJournee.date.toLocaleDateString('fr-MU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Plus size={16} />
                  Saisir les résultats
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
              Saison terminée.
            </p>
          )}
        </div>

        {/* Quick actions */}
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
              { label: 'Gérer les joueurs',       icon: Users,        color: '#8B5CF6', href: '/joueurs' },
              { label: 'Saisir les résultats',    icon: ClipboardList, color: '#007BFF', href: '/resultats' },
              { label: 'Télécharger convocation', icon: Calendar,     color: '#00D084', href: '#' },
            ].map(({ label, icon: Icon, color, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}20`,
                  color: '#FFFFFF',
                }}
              >
                <Icon size={18} style={{ color }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Score entry table */}
      <div
        className="mt-6 rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
          border: '1px solid rgba(0,123,255,0.12)',
        }}
      >
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,123,255,0.1)' }}>
          <h2 className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
            <ClipboardList size={16} className="inline mr-2" style={{ color: '#007BFF' }} />
            Saisie de scores
          </h2>
        </div>
        <div className="px-6 py-8 text-center">
          <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
            Aucun match à saisir pour le moment.
          </p>
          <p style={{ color: '#444455', fontFamily: 'Inter, sans-serif', fontSize: 12, marginTop: 4 }}>
            Les résultats seront disponibles après la Journée 1 (6 juillet 2026).
          </p>
        </div>
      </div>
    </div>
  );
}
