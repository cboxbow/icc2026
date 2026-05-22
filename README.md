# ICC 2026 — Mauritius Padel League Interclub Championship

Plateforme officielle du championnat interclub MPL 2026/2027.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** · design system dark navy complet
- **Supabase** (PostgreSQL + Auth + Realtime + Storage)
- **Zustand** · **React Query** · **Lucide React** · **Framer Motion**

## Démarrage rapide

```bash
npm install
cp .env.local.example .env.local
# → renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Pages

| URL | Description |
|-----|-------------|
| `/` | Accueil — hero, classements preview, countdown J+1 |
| `/classements` | Classements complets (3 pools) |
| `/calendrier` | Calendrier des 10 journées |
| `/clubs` | Liste des 18 clubs |
| `/clubs/[slug]` | Fiche club — stats, roster, résultats |
| `/matchs` | Tous les matchs |
| `/playoffs` | Bracket playoffs |
| `/login` | Connexion (mot de passe ou magic link) |
| `/club/dashboard` | Espace responsable de club |
| `/admin/dashboard` | Espace admin MPL |
| `/obs/match/[id]` | Overlay OBS (params: theme, show_sets, show_players) |

## API endpoints

```
GET /api/classements            → tous pools
GET /api/classements/:pool      → NORD | OUEST | CENTRE_EST
GET /api/clubs                  → 18 clubs
GET /api/clubs/:slug            → fiche club
GET /api/matchs/:id/score       → score live (format OBS)
```

## Setup Supabase

1. Créer un projet sur supabase.com
2. Copier Project URL + anon key → `.env.local`
3. SQL Editor → exécuter `supabase/migrations/001_initial.sql`
4. SQL Editor → exécuter `supabase/seed.sql`
5. Créer le compte admin via **Auth → Users → Invite** (cbezandry@gmail.com)
6. Exécuter dans SQL Editor :
   ```sql
   INSERT INTO user_profiles (id, role, nom, email)
   VALUES ('<auth-uuid>', 'SUPER_ADMIN', 'Christian Bezandry', 'cbezandry@gmail.com');
   ```

## Déploiement Vercel

```bash
npx vercel
# Variables : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, RESEND_API_KEY
```

Domaine cible : `icc2026.mu`

---

MPL · Mauritius Padel League · cbezandry@gmail.com
