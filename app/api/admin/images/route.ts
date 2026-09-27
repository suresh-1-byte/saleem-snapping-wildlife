import { NextResponse } from 'next/server';
import { getSiteImageMap, isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// Uploaded replacements for the website's fixed images, keyed by Cloudinary
// public ID (e.g. "images/hero-pg"). The website layout reads the same map.
export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
  }

  const images = await getSiteImageMap();
  return NextResponse.json(
    { success: true, images },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
