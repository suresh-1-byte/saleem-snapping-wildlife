import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinary, cloudinaryErrorMessage, listAssets, revalidateCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// GET - Homepage "Featured Work" photos (same source the homepage renders from)
export async function GET() {
  const images = (await listAssets('wildlife/featured/')).map((asset) => ({
    id: asset.publicId,
    cloudinaryUrl: asset.url,
    cloudinaryPublicId: asset.publicId,
    uploadedAt: asset.createdAt,
  }));
  return NextResponse.json({ success: true, images }, { headers: { 'Cache-Control': 'no-store' } });
}

// POST - Server-side upload fallback; the admin panel uploads directly to Cloudinary.
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const file = (await request.formData()).get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataURI = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'wildlife/featured',
      resource_type: 'image',
    });

    revalidateCloudinary();

    return NextResponse.json({ success: true, image: { id: result.public_id, cloudinaryUrl: result.secure_url } });
  } catch (error) {
    console.error(`Featured upload error: ${cloudinaryErrorMessage(error)}`);
    return NextResponse.json({
      error: 'Upload failed',
      details: cloudinaryErrorMessage(error)
    }, { status: 500 });
  }
}

// DELETE - Remove a featured photo from Cloudinary (and so from the homepage)
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imageId = new URL(request.url).searchParams.get('id');
    if (!imageId || !imageId.startsWith('wildlife/featured/')) {
      return NextResponse.json({ error: 'Valid image ID required' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(imageId, { invalidate: true });
    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json({ error: 'Delete failed', details: result.result }, { status: 500 });
    }

    revalidateCloudinary();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(`Featured delete error: ${cloudinaryErrorMessage(error)}`);
    return NextResponse.json({
      error: 'Delete failed',
      details: cloudinaryErrorMessage(error)
    }, { status: 500 });
  }
}
