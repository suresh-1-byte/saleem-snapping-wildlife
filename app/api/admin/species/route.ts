import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readJSON, writeJSON } from '@/lib/db';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const species = await readJSON('species.json') || { species: [] };
    return NextResponse.json(species);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch species' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const spec = await request.json();
    const data = await readJSON('species.json') || { species: [] };
    
    const existingIndex = data.species.findIndex((s: any) => s.id === spec.id);
    
    if (existingIndex >= 0) {
      data.species[existingIndex] = spec;
    } else {
      data.species.push(spec);
    }

    await writeJSON('species.json', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save species' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const data = await readJSON('species.json') || { species: [] };
    data.species = data.species.filter((s: any) => s.id !== id);

    await writeJSON('species.json', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete species' }, { status: 500 });
  }
}
