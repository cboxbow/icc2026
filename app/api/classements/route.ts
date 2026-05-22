import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('classements')
      .select('*, club:clubs(*)')
      .eq('saison', '2026-2027')
      .order('points', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }
}
