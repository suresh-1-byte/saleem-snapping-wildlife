import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { cloudinaryErrorMessage, revalidateCloudinary } from '@/lib/cloudinary';
import { normalizeContactSettings } from '@/lib/contactSettings';
import { readContactSettings, saveContactSettings } from '@/lib/contactSettingsStore';

export const dynamic = 'force-dynamic';

// GET - Current email and Instagram details
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await readContactSettings();
  return NextResponse.json({ success: true, settings }, { headers: { 'Cache-Control': 'no-store' } });
}

// PUT - Save email and Instagram details (Contact page and footer update immediately)
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { settings, error } = normalizeContactSettings(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await saveContactSettings(settings);
    revalidateCloudinary();

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error(`Contact settings save error: ${cloudinaryErrorMessage(error)}`);
    return NextResponse.json({
      error: 'Could not save contact details',
      details: cloudinaryErrorMessage(error),
    }, { status: 500 });
  }
}
