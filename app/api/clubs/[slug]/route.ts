import { NextResponse } from 'next/server';
import { getClubBySlug } from '@/lib/constants/clubs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return NextResponse.json({ error: 'Club introuvable' }, { status: 404 });
  return NextResponse.json(club);
}
