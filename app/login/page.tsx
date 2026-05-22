'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // TODO: wire to Supabase auth
      await new Promise(r => setTimeout(r, 800));
      setError('Supabase non configuré. Ajoutez vos credentials dans .env.local.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #0A1628 0%, #070B14 60%, #050810 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl"
              style={{ background: 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)', boxShadow: '0 0 30px rgba(0,123,255,0.35)' }}
            >
              MPL
            </div>
            <div>
              <div className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18 }}>ICC 2026</div>
              <div style={{ color: '#AAAAAA', fontSize: 12 }}>Mauritius Padel League</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, #0D1526 0%, #111D35 100%)',
            border: '1px solid rgba(0,123,255,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <h1 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Connexion
          </h1>
          <p style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }} className="mb-6">
            Espace réservé aux responsables de club
          </p>

          {/* Mode tabs */}
          <div className="flex rounded-lg p-1 mb-6" style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,123,255,0.1)' }}>
            {(['password', 'magic'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm rounded-md font-medium transition-all"
                style={{
                  background: mode === m ? '#007BFF' : 'transparent',
                  color: mode === m ? '#FFFFFF' : '#AAAAAA',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 12,
                }}
              >
                {m === 'password' ? 'Mot de passe' : 'Magic Link'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                Adresse email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AAAAAA' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-white outline-none transition-all"
                  style={{
                    background: '#111D35',
                    border: '1px solid rgba(0,123,255,0.2)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                  }}
                  onFocus={e => { e.target.style.borderColor = '#007BFF'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,123,255,0.2)'; }}
                />
              </div>
            </div>

            {/* Password (password mode only) */}
            {mode === 'password' && (
              <div>
                <label style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AAAAAA' }} />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-lg text-white outline-none transition-all"
                    style={{
                      background: '#111D35',
                      border: '1px solid rgba(0,123,255,0.2)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                    }}
                    onFocus={e => { e.target.style.borderColor = '#007BFF'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,123,255,0.2)'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#AAAAAA' }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg text-sm"
                style={{ background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.3)', color: '#FF3B5C', fontFamily: 'Inter, sans-serif' }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all"
              style={{
                background: loading ? 'rgba(0,123,255,0.5)' : 'linear-gradient(135deg, #007BFF 0%, #005BEA 100%)',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
                boxShadow: loading ? 'none' : '0 4px 20px rgba(0,123,255,0.35)',
              }}
            >
              {loading ? 'Connexion...' : mode === 'password' ? 'Se connecter' : 'Envoyer le lien'}
            </button>
          </form>

          <p className="text-center mt-6" style={{ color: '#444455', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
            Problème de connexion ?{' '}
            <a href="mailto:cbezandry@gmail.com" style={{ color: '#007BFF' }}>
              Contacter l'admin
            </a>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" style={{ color: '#AAAAAA', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
