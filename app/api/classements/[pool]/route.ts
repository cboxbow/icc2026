import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ pool: string }> },
) {
  const { pool } = await params;
  const validPools = ['NORD', 'OUEST', 'CENTRE_EST'];
  if (!validPools.includes(pool.toUpperCase())) {
    return NextResponse.json({ error: 'Pool invalide' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('classements')
      .select('*, club:clubs(*)')
      .eq('pool', pool.toUpperCase())
      .eq('saison', '2026-2027')
      .order('points', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }
}
