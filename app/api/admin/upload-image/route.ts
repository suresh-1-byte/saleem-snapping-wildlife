import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
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

    // Check for Blob token
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN is not set');
      return NextResponse.json({ 
        error: 'Blob storage not configured',
        details: 'BLOB_READ_WRITE_TOKEN environment variable is missing'
      }, { status: 500 });
    }

    // Upload to Vercel Blob Storage
    const blob = await put(relativePath, file, {
      access: 'public',
      addRandomSuffix: false,
      token: token,
    });

    return NextResponse.json({ success: true, path: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imageUrl = new URL(request.url).searchParams.get('imagePath');
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    // Check for Blob token
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN is not set');
      return NextResponse.json({ 
        error: 'Blob storage not configured',
        details: 'BLOB_READ_WRITE_TOKEN environment variable is missing'
      }, { status: 500 });
    }

    // Delete from Vercel Blob Storage
    await del(imageUrl, { token: token });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
