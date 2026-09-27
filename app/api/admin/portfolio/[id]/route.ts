import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinary, cloudinaryErrorMessage, revalidateCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// PUT - Update a wildlife photo's title, location and categories
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const imageId = decodeURIComponent(params.id);
    if (!imageId.startsWith('wildlife/portfolio/')) {
      return NextResponse.json({ error: 'Invalid image ID' }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const location = typeof body.location === 'string' ? body.location.trim() : '';
    const categories = typeof body.categories === 'string' ? body.categories.trim() : '';

    if (!title || !location || !categories) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'Title, location, and categories are required'
      }, { status: 400 });
    }

    await cloudinary.uploader.explicit(imageId, {
      type: 'upload',
      context: { title, location, category: categories },
    });

    revalidateCloudinary();

    return NextResponse.json({
      success: true,
      image: {
        id: imageId,
        title,
        location,
        category: categories.split(',').map((c: string) => c.trim()).filter(Boolean),
      }
    });
  } catch (error) {
    console.error(`Update error: ${cloudinaryErrorMessage(error)}`);
    const updateError = error as { message?: string; error?: { message?: string } };
    return NextResponse.json({
      error: 'Update failed',
      details: updateError.error?.message || updateError.message || 'Unknown error'
    }, { status: 500 });
  }
}
