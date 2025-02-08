import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { refreshToken } = await request.json();

  if (refreshToken === 'refresh_token') {
    return NextResponse.json({ message: 'Token refreshed', newToken: 'fake_token' });
  }

  return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
}
