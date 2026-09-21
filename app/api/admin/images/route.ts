import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export async function GET(request: NextRequest) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
    }

    // Fetch all images from Cloudinary
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'images/',
      max_results: 500,
    });

    // Create a mapping of paths to URLs
    const imageMap: Record<string, string> = {};
    
    result.resources.forEach((resource: any) => {
      // Extract the path from public_id (e.g., "images/hero pg" -> "/images/hero pg.png")
      const publicId = resource.public_id;
      const path = `/${publicId}`;
      imageMap[path] = resource.secure_url;
      
      // Also add URL-encoded versions
      const encodedPath = path.replace(/ /g, '%20');
      imageMap[encodedPath] = resource.secure_url;
    });

    return NextResponse.json({ success: true, images: imageMap });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
