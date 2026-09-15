import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Hardcoded fallback credentials (for development/debugging)
const FALLBACK_USERNAME = 'admin';
const FALLBACK_PASSWORD = 'admin123';

// Try environment variables first, fallback to hardcoded
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || FALLBACK_USERNAME,
  password: process.env.ADMIN_PASSWORD || FALLBACK_PASSWORD,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('=== LOGIN ATTEMPT ===');
    console.log('Received username:', username);
    console.log('Received password length:', password?.length);
    console.log('Expected username:', ADMIN_CREDENTIALS.username);
    console.log('Expected password length:', ADMIN_CREDENTIALS.password?.length);
    console.log('ENV check:', {
      hasEnvUser: !!process.env.ADMIN_USERNAME,
      hasEnvPass: !!process.env.ADMIN_PASSWORD,
      usingFallback: !process.env.ADMIN_USERNAME,
    });

    // Trim whitespace and compare
    const usernameMatch = username?.trim() === ADMIN_CREDENTIALS.username.trim();
    const passwordMatch = password?.trim() === ADMIN_CREDENTIALS.password.trim();

    console.log('Username match:', usernameMatch);
    console.log('Password match:', passwordMatch);

    if (usernameMatch && passwordMatch) {
      console.log('✅ Credentials valid! Creating token...');
      const token = await createToken(username);
      
      const cookieStore = cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      console.log('✅ Token set, login successful!');
      return NextResponse.json({ success: true });
    }

    console.log('❌ Invalid credentials');
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json({ error: 'Server error: ' + String(error) }, { status: 500 });
  }
}
