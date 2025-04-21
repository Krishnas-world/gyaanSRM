import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface DecodedToken {
  id: string;
}

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT!) as DecodedToken;
    return NextResponse.json({ id: decodedToken.id });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
