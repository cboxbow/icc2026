import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ background: '#070B14', borderTop: '1px solid rgba(0,123,255,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logos/mpl-msra.png"
                alt="Mauritius Padel League"
                width={140}
                height={52}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: '#AAAAAA', fontSize: 13 }} className="leading-relaxed">
              Interclub Championship 2026/2027<br />
              Juillet 2026 → Juin 2027
            </p>
            <p style={{ color: '#444455', fontSize: 12 }} className="mt-2">
              Sous tutelle MSRA
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                ['/', 'Accueil'],
                ['/classements', 'Classements'],
                ['/calendrier', 'Calendrier'],
                ['/clubs', 'Clubs'],
                ['/playoffs', 'Playoffs'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors"
                    style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Contact
            </h3>
            <div className="space-y-2" style={{ color: '#AAAAAA', fontSize: 13 }}>
              <p>Mauritius Padel League</p>
              <p>cbezandry@gmail.com</p>
              <p className="mt-4" style={{ color: '#444455', fontSize: 11 }}>
                © {new Date().getFullYear()} MPL — Tous droits réservés
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 divider-blue" />

        <p className="text-center mt-4" style={{ color: '#444455', fontSize: 11 }}>
          Plateforme officielle ICC 2026 · Mauritius Padel League Interclub Championship
        </p>
      </div>
    </footer>
  );
}
