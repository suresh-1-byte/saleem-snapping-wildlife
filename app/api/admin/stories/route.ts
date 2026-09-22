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

    const stories = await readContent('stories.json', 'stories');
    return NextResponse.json({ stories });
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
    if (!story?.id || !story?.title || !story?.location || !story?.introduction || !story?.content) {
      return NextResponse.json({ error: 'Title, location, introduction, and content are required' }, { status: 400 });
    }

    const stories = await readContent<any>('stories.json', 'stories');
    const existingIndex = stories.findIndex((s: any) => s.id === story.id);
    
    if (existingIndex >= 0) {
      stories[existingIndex] = story;
    } else {
      stories.push(story);
    }

    await writeContent('stories.json', 'stories', stories);
    revalidatePath('/stories');
    revalidatePath('/');
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

    if (!id) return NextResponse.json({ error: 'Story ID required' }, { status: 400 });

    const stories = await readContent<any>('stories.json', 'stories');
    await writeContent('stories.json', 'stories', stories.filter((s: any) => s.id !== id));
    revalidatePath('/stories');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
  }
}
