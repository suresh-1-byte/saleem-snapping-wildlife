import { NextRequest, NextResponse } from 'next/server';
import { unlink, writeFile } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const imagePath = formData.get('imagePath') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!imagePath) {
      return NextResponse.json({ error: 'No image path provided' }, { status: 400 });
    }

    const relativePath = decodeURIComponent(imagePath).replace(/^[/\\]+/, '');
    if (!relativePath.startsWith('images/')) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    const publicRoot = path.resolve(process.cwd(), 'public');
    const publicPath = path.resolve(publicRoot, relativePath);
    if (!publicPath.startsWith(`${publicRoot}${path.sep}`)) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to the specified path
    await writeFile(publicPath, buffer);

    return NextResponse.json({ success: true, path: `/${relativePath}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imagePath = new URL(request.url).searchParams.get('imagePath');
    if (!imagePath) {
      return NextResponse.json({ error: 'No image path provided' }, { status: 400 });
    }

    const relativePath = decodeURIComponent(imagePath).replace(/^[/\\]+/, '');
    if (!relativePath.startsWith('images/')) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    const publicRoot = path.resolve(process.cwd(), 'public');
    const publicPath = path.resolve(publicRoot, relativePath);
    if (!publicPath.startsWith(`${publicRoot}${path.sep}`)) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    await unlink(publicPath);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
