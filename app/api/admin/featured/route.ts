import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { isAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const FEATURED_FILE = path.join(process.cwd(), 'data', 'featured.json');

// GET - Fetch all featured images
export async function GET(request: NextRequest) {
  try {
    const fileContent = await fs.readFile(FEATURED_FILE, 'utf-8');
    const featuredData = JSON.parse(fileContent);
    return NextResponse.json({ success: true, images: featuredData });
  } catch (error) {
    console.error('Error reading featured data:', error);
    return NextResponse.json({ success: true, images: [] });
  }
}

// POST - Add new featured image
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'wildlife/featured',
      resource_type: 'auto',
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    // Read existing featured data
    let featuredData = [];
    try {
      const fileContent = await fs.readFile(FEATURED_FILE, 'utf-8');
      featuredData = JSON.parse(fileContent);
    } catch (error) {
      console.log('Creating new featured data file');
    }

    // Add new image
    const newImage = {
      id: result.public_id,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      uploadedAt: new Date().toISOString(),
    };

    featuredData.push(newImage);

    // Save updated data
    await fs.writeFile(FEATURED_FILE, JSON.stringify(featuredData, null, 2));

    // Revalidate pages
    revalidatePath('/');

    return NextResponse.json({ 
      success: true, 
      image: newImage
    });
  } catch (error) {
    console.error('Featured upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Remove featured image
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

    // Read featured data
    const fileContent = await fs.readFile(FEATURED_FILE, 'utf-8');
    const featuredData = JSON.parse(fileContent);

    // Find image
    const imageIndex = featuredData.findIndex((img: any) => img.id === imageId);
    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const image = featuredData[imageIndex];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryPublicId);

    // Remove from data
    featuredData.splice(imageIndex, 1);

    // Save updated data
    await fs.writeFile(FEATURED_FILE, JSON.stringify(featuredData, null, 2));

    // Revalidate pages
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Featured delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
