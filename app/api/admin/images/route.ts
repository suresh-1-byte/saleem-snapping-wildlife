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

    // Fetch all images from Cloudinary (not just images/ prefix)
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500,
    });

    // Create a mapping of paths to URLs
    const imageMap: Record<string, string> = {};
    
    result.resources.forEach((resource: any) => {
      const publicId = resource.public_id; // e.g., "images/hero pg" or "wildlife/images/hero-pg"
      const secure_url = resource.secure_url;
      
      // Add direct public_id mapping
      imageMap[`/${publicId}`] = secure_url;
      
      // Extract filename from public_id
      const parts = publicId.split('/');
      const filename = parts[parts.length - 1];
      
      // Add multiple mapping patterns to catch different path formats
      imageMap[`/images/${filename}`] = secure_url;
      imageMap[`/images/${filename}.jpg`] = secure_url;
      imageMap[`/images/${filename}.png`] = secure_url;
      
      // Add URL-encoded versions
      const encodedFilename = filename.replace(/ /g, '%20');
      imageMap[`/images/${encodedFilename}`] = secure_url;
      imageMap[`/images/${encodedFilename}.jpg`] = secure_url;
      imageMap[`/images/${encodedFilename}.png`] = secure_url;
      
      // Add without extension versions
      const filenameNoExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
      imageMap[`/images/${filenameNoExt}`] = secure_url;
      
      // Add specific mappings for known images
      if (filename.includes('hero') || publicId.includes('hero')) {
        imageMap['/images/hero pg'] = secure_url;
        imageMap['/images/hero%20pg'] = secure_url;
        imageMap['/images/hero pg.png'] = secure_url;
        imageMap['/images/hero%20pg.png'] = secure_url;
      }
      if (filename.includes('closing') || filename.includes('cta') || publicId.includes('closing')) {
        imageMap['/images/closing-cta'] = secure_url;
        imageMap['/images/closing-cta.jpg'] = secure_url;
      }
      if (filename.includes('contact') || publicId.includes('contact')) {
        imageMap['/images/contact-bg'] = secure_url;
        imageMap['/images/contact-bg.jpg'] = secure_url;
      }
    });

    console.log('Image mappings created:', Object.keys(imageMap).length);
    return NextResponse.json({ success: true, images: imageMap });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
