import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinary, cloudinaryErrorMessage, listAssets, revalidateCloudinary } from '@/lib/cloudinary';
import { toPortfolioImage } from '@/lib/portfolioData';

export const dynamic = 'force-dynamic';

// GET - Wildlife page photos (same source the /wildlife page renders from)
export async function GET() {
  const images = (await listAssets('wildlife/portfolio/')).map(toPortfolioImage);
  return NextResponse.json({ success: true, images }, { headers: { 'Cache-Control': 'no-store' } });
}

// POST - Server-side upload fallback; the admin panel uploads directly to Cloudinary.
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const categories = formData.get('categories') as string;

    if (!file || !title || !location || !categories) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'File, title, location, and categories are required'
      }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataURI = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'wildlife/portfolio',
      resource_type: 'image',
      context: { title, location, category: categories },
    });

    revalidateCloudinary();

    return NextResponse.json({ success: true, image: { id: result.public_id, cloudinaryUrl: result.secure_url } });
  } catch (error) {
    console.error(`Portfolio upload error: ${cloudinaryErrorMessage(error)}`);
    return NextResponse.json({
      error: 'Upload failed',
      details: cloudinaryErrorMessage(error)
    }, { status: 500 });
  }
}

// DELETE - Remove a wildlife photo from Cloudinary (and so from the website)
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imageId = new URL(request.url).searchParams.get('id');
    if (!imageId || !imageId.startsWith('wildlife/portfolio/')) {
      return NextResponse.json({ error: 'Valid image ID required' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(imageId, { invalidate: true });
    if (result.result !== 'ok' && result.result !== 'not found') {
      return NextResponse.json({ error: 'Delete failed', details: result.result }, { status: 500 });
    }

    revalidateCloudinary();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(`Portfolio delete error: ${cloudinaryErrorMessage(error)}`);
    return NextResponse.json({
      error: 'Delete failed',
      details: cloudinaryErrorMessage(error)
    }, { status: 500 });
  }
}
