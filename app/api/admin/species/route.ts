import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readContent, writeContent } from '@/lib/contentStorage';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const species = await readContent('species.json', 'species');
    return NextResponse.json({ species });
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
    if (!spec?.id || !spec?.commonName || !spec?.category) {
      return NextResponse.json({ error: 'Common name and category are required' }, { status: 400 });
    }

    const species = await readContent<any>('species.json', 'species');
    const existingIndex = species.findIndex((s: any) => s.id === spec.id);
    
    if (existingIndex >= 0) {
      species[existingIndex] = spec;
    } else {
      species.push(spec);
    }

    await writeContent('species.json', 'species', species);
    revalidatePath('/species');
    revalidatePath('/');
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

    if (!id) return NextResponse.json({ error: 'Species ID required' }, { status: 400 });

    const species = await readContent<any>('species.json', 'species');
    await writeContent('species.json', 'species', species.filter((s: any) => s.id !== id));
    revalidatePath('/species');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete species' }, { status: 500 });
  }
}
