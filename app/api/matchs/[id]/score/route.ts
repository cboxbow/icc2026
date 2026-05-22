import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const supabase = await createClient();
    const { data: matchRaw, error } = await supabase
      .from('matchs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !matchRaw) {
      return NextResponse.json({ error: 'Match introuvable' }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match = matchRaw as any;
    const r = null as any;
    const overlay = {
      match_id: match.id,
      statut:   match.statut,
      categorie: match.categorie,
      niveau:   match.niveau,
      equipe_dom: {
        club:    r?.club_domicile_data?.nom ?? 'Domicile',
        joueurs: [
          match.j1_dom ? `${(match.j1_dom as any).prenom} ${(match.j1_dom as any).nom}` : '—',
          match.j2_dom ? `${(match.j2_dom as any).prenom} ${(match.j2_dom as any).nom}` : '—',
        ],
        couleur: r?.club_domicile_data?.couleur ?? '#007BFF',
      },
      equipe_vis: {
        club:    r?.club_visiteur_data?.nom ?? 'Visiteur',
        joueurs: [
          match.j1_vis ? `${(match.j1_vis as any).prenom} ${(match.j1_vis as any).nom}` : '—',
          match.j2_vis ? `${(match.j2_vis as any).prenom} ${(match.j2_vis as any).nom}` : '—',
        ],
        couleur: r?.club_visiteur_data?.couleur ?? '#8B5CF6',
      },
      sets: [
        { dom: match.set1_dom, vis: match.set1_vis },
        { dom: match.set2_dom, vis: match.set2_vis },
        { dom: match.set3_dom, vis: match.set3_vis },
      ],
      set_actuel: match.set3_dom !== null ? 3 : match.set2_dom !== null ? 2 : 1,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(overlay);
  } catch {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }
}
