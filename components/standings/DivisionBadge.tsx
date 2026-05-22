import { cn } from '@/lib/utils/cn';
import type { Division, Genre } from '@/lib/supabase/types';
import { DIVISION_COLORS, DIVISION_LABELS, GENRE_LABELS } from '@/lib/supabase/types';

interface DivisionBadgeProps {
  division: Division | null;
  genre?: Genre;
  size?: 'sm' | 'md' | 'lg';
  showGenre?: boolean;
  className?: string;
}

export function DivisionBadge({
  division,
  genre,
  size = 'md',
  showGenre = false,
  className,
}: DivisionBadgeProps) {
  if (!division) {
    return (
      <span
        className={cn('inline-flex items-center rounded-full font-semibold whitespace-nowrap', className)}
        style={{
          color: '#AAAAAA',
          background: 'rgba(170,170,170,0.12)',
          border: '1px solid rgba(170,170,170,0.2)',
          ...SIZES[size],
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Division TBD
      </span>
    );
  }

  const color = DIVISION_COLORS[division];
  const label = showGenre && genre
    ? `${DIVISION_LABELS[division]} ${GENRE_LABELS[genre]}`
    : DIVISION_LABELS[division];

  return (
    <span
      className={cn('inline-flex items-center rounded-full font-semibold whitespace-nowrap', className)}
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}35`,
        ...SIZES[size],
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {label}
    </span>
  );
}

const SIZES = {
  sm: { fontSize: 10, padding: '1px 6px' },
  md: { fontSize: 12, padding: '2px 8px' },
  lg: { fontSize: 13, padding: '3px 10px' },
} as const;
