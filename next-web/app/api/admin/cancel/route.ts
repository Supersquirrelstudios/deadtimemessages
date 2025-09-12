import { NextResponse } from "next/server";
import { cancelById } from "@/lib/redis";

function ok(req: Request) {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

export async function POST(req: Request) {
  if (!ok(req)) return new NextResponse("Unauthorized", { status: 401 });
  const { id } = await req.json();
  if (!id) return new NextResponse("Missing id", { status: 400 });
  const removed = await cancelById(id);
  return NextResponse.json({ ok: removed });
}
