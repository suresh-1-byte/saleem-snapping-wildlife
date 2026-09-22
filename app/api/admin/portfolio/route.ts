import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// GET - Fetch all portfolio images from Cloudinary
export async function GET(request: NextRequest) {
  try {
    // Fetch all images from wildlife/portfolio folder in Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'wildlife/portfolio',
      max_results: 500,
      context: true, // Include metadata
    });

    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      cloudinaryUrl: resource.secure_url,
      cloudinaryPublicId: resource.public_id,
      title: resource.context?.custom?.title || 'Untitled',
      location: resource.context?.custom?.location || 'Unknown',
      category: resource.context?.custom?.category ? resource.context.custom.category.split(',') : ['All'],
      uploadedAt: resource.created_at,
    }));

    console.log(`Fetched ${images.length} portfolio images from Cloudinary`);
    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching portfolio data from Cloudinary:', error);
    return NextResponse.json({ success: true, images: [] });
  }
}

// POST - Add new portfolio image with metadata stored in Cloudinary
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const categories = formData.get('categories') as string; // comma-separated

    if (!file || !title || !location || !categories) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'File, title, location, and categories are required'
      }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    console.log('Uploading to Cloudinary with metadata:', { title, location, categories });

    // Upload to Cloudinary WITH metadata in context
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'wildlife/portfolio',
      resource_type: 'auto',
      context: {
        title: title,
        location: location,
        category: categories,
      },
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    const newImage = {
      id: result.public_id,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      title,
      location,
      category: categories.split(',').map((c: string) => c.trim()),
      uploadedAt: result.created_at,
    };

    // Revalidate pages
    revalidatePath('/wildlife');
    revalidatePath('/');

    return NextResponse.json({ 
      success: true, 
      image: newImage
    });
  } catch (error) {
    console.error('Portfolio upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Remove portfolio image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
    }

    console.log('Deleting from Cloudinary:', imageId);

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(imageId);

    console.log('Delete result:', result);

    // Revalidate pages
    revalidatePath('/wildlife');
    revalidatePath('/');

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Portfolio delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
