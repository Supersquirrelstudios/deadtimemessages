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
