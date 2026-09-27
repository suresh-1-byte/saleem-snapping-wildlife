import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinary, isCloudinaryConfigured, MANAGED_FOLDERS } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// Signs a browser-to-Cloudinary upload. Photos go straight from the admin's
// browser to Cloudinary, so they never hit Vercel's 4.5 MB request limit or
// the serverless function timeout.
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({
      error: 'Cloudinary not configured',
      details: 'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET',
    }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const folder = body?.folder;
  const publicId = body?.publicId;
  const context = body?.context;

  if (!MANAGED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
  }
  if (publicId !== undefined && (typeof publicId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(publicId))) {
    return NextResponse.json({ error: 'Invalid image name' }, { status: 400 });
  }

  const params: Record<string, string | number | boolean> = {
    timestamp: Math.round(Date.now() / 1000),
    folder,
  };
  if (publicId) {
    // Replacing a fixed slot: keep the same ID and clear Cloudinary's CDN copy.
    params.public_id = publicId;
    params.overwrite = true;
    params.invalidate = true;
  }
  if (context && typeof context === 'object') {
    // Cloudinary's "key=value|key=value" format; "=" and "|" inside values are escaped.
    params.context = Object.entries(context)
      .map(([key, value]) => `${key}=${String(value).replace(/([=|])/g, '\\$1')}`)
      .join('|');
  }

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!);

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    params,
    signature,
  });
}
