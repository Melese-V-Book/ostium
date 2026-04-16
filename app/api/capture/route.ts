import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    // Store securely – here we just log, but you can add database, email, etc.
    console.log('[Ostium Capture]', text);
    // Optional: write to a private log file or database (no visible response)
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 200 });
  }
}