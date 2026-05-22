'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Calendar, Users, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { href: '/',             label: 'Accueil',      icon: Trophy },
  { href: '/classements',  label: 'Classements',  icon: BarChart3 },
  { href: '/calendrier',   label: 'Calendrier',   icon: Calendar },
  { href: '/clubs',        label: 'Clubs',        icon: Users },
  { href: '/playoffs',     label: 'Playoffs',     icon: Trophy },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{ background: 'rgba(7, 11, 20, 0.92)', borderBottom: '1px solid rgba(0,123,255,0.15)', backdropFilter: 'blur(12px)' }}
      className="sticky top-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logos/mpl-msra.png"
            alt="Mauritius Padel League"
            width={120}
            height={40}
            style={{ objectFit: 'contain', maxHeight: 36 }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'text-white'
                    : 'hover:text-white',
                )}
                style={{
                  color: active ? '#FFFFFF' : '#AAAAAA',
                  background: active ? 'rgba(0,123,255,0.15)' : 'transparent',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150"
            style={{ color: '#AAAAAA', fontFamily: 'Poppins, sans-serif' }}
          >
            Connexion
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all duration-150"
            style={{ background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)', fontFamily: 'Poppins, sans-serif' }}
          >
            Espace Club
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg"
          style={{ color: '#AAAAAA' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: 'rgba(0,123,255,0.15)', background: '#070B14' }}
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{
                  color: active ? '#FFFFFF' : '#AAAAAA',
                  background: active ? 'rgba(0,123,255,0.15)' : 'transparent',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <Icon size={18} style={{ color: active ? '#007BFF' : '#AAAAAA' }} />
                {label}
              </Link>
            );
          })}
          <div className="border-t mt-2 pt-2" style={{ borderColor: 'rgba(0,123,255,0.1)' }}>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white mt-1"
              style={{ background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)', fontFamily: 'Poppins, sans-serif' }}
            >
              Espace Club
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
