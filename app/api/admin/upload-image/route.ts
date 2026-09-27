import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinary, cloudinaryErrorMessage, isCloudinaryConfigured, isManagedPublicId, revalidateCloudinary } from '@/lib/cloudinary';
import { publicIdForPath } from '@/lib/siteImages';

export const dynamic = 'force-dynamic';

// Server-side upload, kept as a fallback. The admin panel uploads directly from
// the browser to Cloudinary (see /api/admin/cloudinary/sign) to avoid request
// size limits.
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json({
        error: 'Cloudinary not configured',
        details: 'Please set up Cloudinary environment variables'
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const imagePath = formData.get('imagePath') as string;

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const publicId = imagePath ? publicIdForPath(imagePath) : null;
    if (!publicId || !isManagedPublicId(publicId)) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataURI = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image',
    });

    revalidateCloudinary();

    return NextResponse.json({
      success: true,
      path: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error(`Upload error: ${cloudinaryErrorMessage(error)}`);
    const uploadError = error as { message?: string; error?: { message?: string } };
    return NextResponse.json({
      error: 'Upload failed',
      details: uploadError.error?.message || uploadError.message || 'Unknown upload error',
    }, { status: 500 });
  }
}

// Removes an uploaded image. For fixed website images this restores the
// original default from /public/images.
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('imagePath');
    const publicId = searchParams.get('publicId') || (imagePath ? publicIdForPath(imagePath) : null);

    if (!publicId || !isManagedPublicId(publicId)) {
      return NextResponse.json({ error: 'Invalid image to remove' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json({ error: 'Delete failed', details: result.result }, { status: 500 });
    }

    revalidateCloudinary();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(`Delete error: ${cloudinaryErrorMessage(error)}`);
    const deleteError = error as { message?: string; error?: { message?: string } };
    return NextResponse.json({
      error: 'Delete failed',
      details: deleteError.error?.message || deleteError.message || 'Unknown error'
    }, { status: 500 });
  }
}
