import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Layers } from 'lucide-react';
import type { Club } from '@/lib/supabase/types';
import { DivisionBadge } from '@/components/standings/DivisionBadge';

interface ClubCardProps {
  club: Club;
  points?: number;
  rang?: number;
  victoires?: number;
  defaites?: number;
}

export function ClubCard({ club, points, rang, victoires, defaites }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.slug}`}>
      <div className="card p-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 overflow-hidden"
            style={{ background: club.logo_url ? 'transparent' : `linear-gradient(135deg, ${club.couleur} 0%, ${club.couleur}99 100%)` }}
          >
            {club.logo_url ? (
              <Image src={club.logo_url} alt={club.nom} width={56} height={56} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            ) : (
              club.nom.slice(0, 2).toUpperCase()
            )}
          </div>
          <DivisionBadge division={club.division} genre={club.genre} showGenre size="sm" />
        </div>

        {/* Name */}
        <h3 className="text-white font-bold mb-1 leading-tight" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15 }}>
          {club.nom}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-4">
          <MapPin size={12} style={{ color: '#AAAAAA' }} />
          <span style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{club.ville ?? '—'}</span>
          <span style={{ color: '#444455', fontSize: 12 }} className="ml-2">•</span>
          <Layers size={12} style={{ color: '#AAAAAA' }} className="ml-2" />
          <span style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{club.courts} courts</span>
        </div>

        {/* Stats */}
        {(points !== undefined || rang !== undefined) && (
          <div className="grid grid-cols-3 gap-2 pt-4 mt-auto" style={{ borderTop: '1px solid rgba(0,123,255,0.1)' }}>
            {rang !== undefined && (
              <div className="text-center">
                <div style={{ color: rang === 1 ? '#FFD700' : '#FFFFFF', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18 }}>
                  #{rang}
                </div>
                <div style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Poppins, sans-serif' }}>Rang</div>
              </div>
            )}
            {points !== undefined && (
              <div className="text-center">
                <div style={{ color: '#66CCFF', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18 }}>
                  {points}
                </div>
                <div style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Poppins, sans-serif' }}>Pts</div>
              </div>
            )}
            {victoires !== undefined && (
              <div className="text-center">
                <div style={{ color: '#00D084', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18 }}>
                  {victoires}V
                </div>
                <div style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Poppins, sans-serif' }}>Victoires</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
