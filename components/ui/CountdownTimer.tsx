'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, targetDate.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const days    = Math.floor(diff / 86_400_000);
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const units = [
    { value: days,    label: 'Jours' },
    { value: hours,   label: 'Heures' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Secondes' },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-4">
          <div className="text-center">
            <div
              className="rounded-xl px-4 py-3 min-w-16 text-center mb-1"
              style={{
                background: 'rgba(0,123,255,0.12)',
                border: '1px solid rgba(0,123,255,0.25)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  fontSize: 32,
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                {pad(value)}
              </span>
            </div>
            <span style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {label}
            </span>
          </div>
          {i < 3 && (
            <span style={{ color: '#007BFF', fontSize: 24, fontWeight: 900, marginTop: -20 }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
