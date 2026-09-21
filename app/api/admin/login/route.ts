import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'admin123').trim();

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-123456789'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = body.username?.trim();
    const password = body.password?.trim();

    console.log('Login attempt:', { username, passwordLength: password?.length, expectedUsername: ADMIN_USERNAME, expectedPasswordLength: ADMIN_PASSWORD.length });

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('✅ Credentials match! Creating token...');
      
      // Create JWT token
      const token = await new SignJWT({ username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET);

      console.log('✅ Token created, setting cookie...');

      // Set cookie
      const cookieStore = cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      console.log('✅ Cookie set! Login successful!');
      
      return NextResponse.json({ 
        success: true,
        message: 'Login successful'
      });
    }

    console.log('❌ Credentials do not match');
    return NextResponse.json({ 
      error: 'Invalid credentials',
      debug: { username, passwordLength: password?.length }
    }, { status: 401 });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ 
      error: 'Server error',
      details: String(error)
    }, { status: 500 });
  }
}
