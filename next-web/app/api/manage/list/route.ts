import { NextResponse } from "next/server";
import { listUpcoming } from "@/lib/redis";

function check(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") || "";
  return key === process.env.ADMIN_SECRET;
}

export async function GET(req: Request) {
  if (!check(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const now = Math.floor(Date.now() / 1000);
  const items = await listUpcoming(now);
  return NextResponse.json({ ok: true, items });
}
