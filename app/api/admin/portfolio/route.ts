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

const PORTFOLIO_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

// GET - Fetch all portfolio images
export async function GET(request: NextRequest) {
  try {
    const fileContent = await fs.readFile(PORTFOLIO_FILE, 'utf-8');
    const portfolioData = JSON.parse(fileContent);
    return NextResponse.json({ success: true, images: portfolioData });
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json({ success: true, images: [] });
  }
}

// POST - Add new portfolio image with metadata
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

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'wildlife/portfolio',
      resource_type: 'auto',
    });

    console.log('Cloudinary upload successful:', result.secure_url);

    // Read existing portfolio data
    let portfolioData = [];
    try {
      const fileContent = await fs.readFile(PORTFOLIO_FILE, 'utf-8');
      portfolioData = JSON.parse(fileContent);
    } catch (error) {
      console.log('Creating new portfolio data file');
    }

    // Add new image to portfolio
    const newImage = {
      id: result.public_id,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      title,
      location,
      category: categories.split(',').map((c: string) => c.trim()),
      uploadedAt: new Date().toISOString(),
    };

    portfolioData.push(newImage);

    // Save updated portfolio data
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2));

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

// DELETE - Remove portfolio image
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

    // Read portfolio data
    const fileContent = await fs.readFile(PORTFOLIO_FILE, 'utf-8');
    const portfolioData = JSON.parse(fileContent);

    // Find image
    const imageIndex = portfolioData.findIndex((img: any) => img.id === imageId);
    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const image = portfolioData[imageIndex];

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryPublicId);

    // Remove from portfolio data
    portfolioData.splice(imageIndex, 1);

    // Save updated data
    await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2));

    // Revalidate pages
    revalidatePath('/wildlife');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Portfolio delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
