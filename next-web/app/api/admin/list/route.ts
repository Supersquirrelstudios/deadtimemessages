import { NextResponse } from 'next/server';
import { listUpcoming } from '@/lib/redis';

function ok(req: Request) {
  return req.headers.get('x-admin-secret') === process.env.ADMIN_SECRET;
}

export async function GET(req: Request) {
  if (!ok(req)) return new NextResponse('Unauthorized', { status: 401 });
  const now = Math.floor(Date.now() / 1000);
  const items = await listUpcoming(now, now + 365*24*60*60, 200);
  return NextResponse.json(items);
}
