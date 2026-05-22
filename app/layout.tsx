import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ICC 2026 — Mauritius Padel League Interclub Championship',
    template: '%s — ICC 2026',
  },
  description: 'Plateforme officielle du Mauritius Padel League Interclub Championship 2026/2027. Classements, résultats, calendrier et scores en direct.',
  openGraph: {
    title: 'ICC 2026 — Mauritius Padel League',
    description: 'Interclub Championship 2026/2027 — 18 clubs, 3 pools, saison juillet 2026 → juin 2027.',
    locale: 'fr_MU',
    type: 'website',
  },
  keywords: ['padel', 'mauritius', 'interclub', 'MPL', 'ICC 2026', 'championship'],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
