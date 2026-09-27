import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { revalidateCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// Called by the admin panel after a direct browser upload finishes, so the
// website and the admin panel both show the new photo immediately.
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidateCloudinary();
  return NextResponse.json({ success: true });
}
