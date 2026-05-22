import { cn } from '@/lib/utils/cn';
import type { Pool } from '@/lib/supabase/types';

const POOL_CONFIG: Record<Pool, { label: string; color: string; bg: string }> = {
  NORD:       { label: 'Pool Nord',       color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  OUEST:      { label: 'Pool Ouest',      color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)' },
  CENTRE_EST: { label: 'Pool Centre/Est', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
};

interface PoolBadgeProps {
  pool: Pool;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PoolBadge({ pool, size = 'md', className }: PoolBadgeProps) {
  const cfg = POOL_CONFIG[pool];
  const sizes = {
    sm: { fontSize: 10, padding: '1px 6px' },
    md: { fontSize: 12, padding: '2px 8px' },
    lg: { fontSize: 13, padding: '3px 10px' },
  };

  return (
    <span
      className={cn('inline-flex items-center rounded-full font-semibold whitespace-nowrap', className)}
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.color}30`,
        ...sizes[size],
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {cfg.label}
    </span>
  );
}
