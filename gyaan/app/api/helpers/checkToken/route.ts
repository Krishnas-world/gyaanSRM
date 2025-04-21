// app/api/helpers/checkToken/route.js
import { NextResponse } from 'next/server';

export async function GET(req:any) {
  const token = req.cookies.get('token') || null;
  if (token) {
    return NextResponse.json({ success: true, token });
  } else {
    return NextResponse.json({ success: false, message: 'Token not found' });
  }
}
