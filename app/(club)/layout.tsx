import Link from 'next/link';
import { LayoutDashboard, Users, ClipboardList, FileText, LogOut } from 'lucide-react';

const CLUB_NAV = [
  { href: '/club/dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/club/joueurs',   label: 'Joueurs',    icon: Users },
  { href: '/club/resultats', label: 'Résultats',  icon: ClipboardList },
];

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: 'radial-gradient(ellipse at 20% 50%, #0A1628 0%, #070B14 60%, #050810 100%)' }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col"
        style={{
          background: 'rgba(13,21,38,0.95)',
          borderRight: '1px solid rgba(0,123,255,0.12)',
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(0,123,255,0.1)' }}>
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs"
              style={{ background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)' }}
            >
              MPL
            </div>
            <div>
              <div className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>ICC 2026</div>
              <div style={{ color: '#AAAAAA', fontSize: 10 }}>Espace Club</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {CLUB_NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                color: '#AAAAAA',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(0,123,255,0.1)', paddingTop: 12 }}>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full"
            style={{ color: '#FF3B5C', fontFamily: 'Poppins, sans-serif' }}
          >
            <LogOut size={18} />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
