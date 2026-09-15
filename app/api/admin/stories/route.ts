import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readJSON, writeJSON } from '@/lib/db';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stories = await readJSON('stories.json') || { stories: [] };
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const story = await request.json();
    const data = await readJSON('stories.json') || { stories: [] };
    
    const existingIndex = data.stories.findIndex((s: any) => s.id === story.id);
    
    if (existingIndex >= 0) {
      data.stories[existingIndex] = story;
    } else {
      data.stories.push(story);
    }

    await writeJSON('stories.json', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save story' }, { status: 500 });
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

    const data = await readJSON('stories.json') || { stories: [] };
    data.stories = data.stories.filter((s: any) => s.id !== id);

    await writeJSON('stories.json', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
  }
}
