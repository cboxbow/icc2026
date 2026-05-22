import { Crown, ChevronUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RankBadgeProps {
  rank: number;
  className?: string;
}

export function RankBadge({ rank, className }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className={cn('flex items-center justify-center gap-1', className)}>
        <Crown size={14} style={{ color: '#FFD700' }} />
        <span style={{ color: '#FFD700', fontWeight: 900, fontSize: 15, fontFamily: 'Poppins, sans-serif' }}>1</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <span style={{ color: '#66CCFF', fontWeight: 700, fontSize: 14, fontFamily: 'Poppins, sans-serif' }}
        className={className}>
        {rank}
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span style={{ color: '#AAAAAA', fontWeight: 600, fontSize: 14, fontFamily: 'Poppins, sans-serif' }}
        className={className}>
        {rank}
      </span>
    );
  }
  return (
    <span style={{ color: '#AAAAAA', fontWeight: 400, fontSize: 13, fontFamily: 'Inter, sans-serif' }}
      className={className}>
      {rank}
    </span>
  );
}
