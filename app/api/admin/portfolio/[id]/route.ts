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

// PUT - Update image metadata in Cloudinary
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imageId = decodeURIComponent(params.id);
    const body = await request.json();
    const { title, location, categories } = body;

    if (!title || !location || !categories) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'Title, location, and categories are required'
      }, { status: 400 });
    }

    console.log('Updating Cloudinary metadata for:', imageId);

    // Update context metadata in Cloudinary
    const result = await cloudinary.uploader.explicit(imageId, {
      type: 'upload',
      context: {
        title: title,
        location: location,
        category: categories,
      },
    });

    console.log('Cloudinary metadata updated successfully');

    // Revalidate pages
    revalidatePath('/wildlife');
    revalidatePath('/');

    return NextResponse.json({ 
      success: true,
      image: {
        id: result.public_id,
        title,
        location,
        category: categories.split(',').map((c: string) => c.trim()),
      }
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ 
      error: 'Update failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
