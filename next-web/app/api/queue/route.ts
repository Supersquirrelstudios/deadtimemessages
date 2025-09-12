import { NextResponse } from "next/server";
import { z } from "zod";
import { enqueueMessage } from "@/lib/redis";
import { toUnixSeconds, fromLocalDatetime } from "@/lib/time";
import { sendEmail } from "@/lib/email";

const Body = z.object({
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  when: z.string().min(1)
});

export async function POST(req: Request) {
  try {
    const { email, message, when } = Body.parse(await req.json());
    const whenDate = fromLocalDatetime(when);
    const whenEpoch = toUnixSeconds(whenDate);
    const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    await enqueueMessage({ id, email, message, whenEpoch });

    try {
      await sendEmail(
        email,
        "Your DeadTime Message is queued",
        `<p>Your message will be delivered at <b>${whenDate.toISOString()}</b> (UTC).</p>
         <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(message)}</pre>`
      );
    } catch (e) {
      console.error("Email confirmation error", e);
    }
    return NextResponse.json({ ok: true, id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Invalid request" }, { status: 400 });
  }
}
function escapeHtml(s: string) {
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
