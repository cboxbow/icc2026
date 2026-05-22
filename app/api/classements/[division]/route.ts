import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 30;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ division: string }> },
) {
  const { division } = await params;
  const divNum = parseInt(division, 10);
  if (![1, 2, 3, 4].includes(divNum)) {
    return NextResponse.json({ error: 'Division invalide (1-4)' }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const genre = searchParams.get('genre') ?? 'H';
  const saison = searchParams.get('saison') ?? '2026-2027';

  if (!['H', 'F'].includes(genre)) {
    return NextResponse.json({ error: 'Genre invalide (H ou F)' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('classements')
      .select('*, club:clubs(*)')
      .eq('division', divNum)
      .eq('genre', genre)
      .eq('saison', saison)
      .order('points', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([], { status: 200 }); // Return empty — DB not yet migrated
  }
}
