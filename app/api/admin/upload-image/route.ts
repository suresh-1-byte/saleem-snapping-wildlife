import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { isAuthenticated } from '@/lib/auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

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

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured',
        details: 'Please set up Cloudinary environment variables'
      }, { status: 500 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Extract folder and filename from path
    const relativePath = decodeURIComponent(imagePath).replace(/^[/\\]+/, '');
    const pathParts = relativePath.split('/');
    const filename = pathParts[pathParts.length - 1].replace(/\.[^/.]+$/, ''); // Remove extension
    const folder = pathParts.slice(0, -1).join('/');

    console.log('Uploading to Cloudinary:', { folder, filename });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder || 'wildlife',
      public_id: filename,
      overwrite: true,
      resource_type: 'auto',
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    return NextResponse.json({ 
      success: true, 
      path: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const publicId = new URL(request.url).searchParams.get('publicId');
    if (!publicId) {
      return NextResponse.json({ error: 'No public ID provided' }, { status: 400 });
    }

    console.log('Deleting from Cloudinary:', publicId);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    
    console.log('Cloudinary delete successful');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
