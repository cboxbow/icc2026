import { NextResponse } from 'next/server';
import { CLUBS } from '@/lib/constants/clubs';

export async function GET() {
  return NextResponse.json(CLUBS);
}
