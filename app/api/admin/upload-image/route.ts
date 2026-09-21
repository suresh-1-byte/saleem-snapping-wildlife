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

    console.log('Attempting Blob upload:', {
      path: relativePath,
      fileSize: file.size,
      hasStoreId: !!process.env.BLOB_STORE_ID,
      storeId: process.env.BLOB_STORE_ID?.substring(0, 10) + '...',
    });

    // Upload to Vercel Blob Storage
    // The SDK will automatically use BLOB_STORE_ID from environment
    const blob = await put(relativePath, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('Blob upload successful:', blob.url);

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

    console.log('Attempting Blob delete:', imageUrl);

    // Delete from Vercel Blob Storage
    // The SDK will automatically use BLOB_STORE_ID from environment
    await del(imageUrl);
    
    console.log('Blob delete successful');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
