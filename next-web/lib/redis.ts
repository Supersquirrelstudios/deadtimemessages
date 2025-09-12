import { kv } from "@vercel/kv";
export const QUEUE_KEY = "dtm:queue";

export async function enqueueMessage(payload: {
  id: string; email: string; message: string; whenEpoch: number;
}) {
  await kv.zadd(QUEUE_KEY, { score: payload.whenEpoch, member: JSON.stringify(payload) });
}

export async function pullDue(nowEpoch: number, limit = 25) {
  const items = await kv.zrange(QUEUE_KEY, 0, nowEpoch, { byScore: true, limit: { offset: 0, count: limit } });
  if (!items?.length) return [];
  await kv.zrem(QUEUE_KEY, ...items);
  return items.map((s: string) => JSON.parse(s));
}


export type Queued = { id: string; email: string; message: string; whenEpoch: number };

export async function listUpcoming(fromEpoch: number, toEpoch = fromEpoch + 365*24*60*60, limit = 200): Promise<Queued[]> {
  const items = await kv.zrange(QUEUE_KEY, fromEpoch, toEpoch, {
    byScore: true,
    limit: { offset: 0, count: limit }
  });
  return (items || []).map((s: sring) => JSON.parse(s));

}

export async function cancelById(id: string): Promise<boolean> {
  // fetch a reasonable window, find matching JSON payload, then remove that member
  const now = Math.floor(Date.now()/1000);
  const all = await kv.zrange(QUEUE_KEY, 0, now + 10*365*24*60*60, { byScore: true }); // up to +10y
  if (!all?.length) return false;
  const match = (all as string[]).find(s => {
    try { return JSON.parse(s).id === id; } catch { return false; }
  });
  if (!match) return false;
  const removed = await kv.zrem(QUEUE_KEY, match);
  return (removed ?? 0) > 0;
}
