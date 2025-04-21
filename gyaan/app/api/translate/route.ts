import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@vitalets/google-translate-api';

export async function POST(req: NextRequest) {
  const { text, to } = await req.json();

  try {
    const result = await translate(text, { to });
    return NextResponse.json({ translatedText: result.text });
  } catch (err) {
    console.error('Translation error:', err);
    return NextResponse.json({ translatedText: text });
  }
}
