import { NextResponse } from "next/server";
import { pullDue } from "@/lib/redis";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  const nowEpoch = Math.floor(Date.now() / 1000);
  const batch = await pullDue(nowEpoch, 50);

  let delivered = 0;
  for (const item of batch) {
    try {
      await sendEmail(
        item.email,
        "Your DeadTime Message has arrived",
        `<p>Scheduled for ${new Date(item.whenEpoch * 1000).toISOString()} (UTC):</p>
         <hr/><pre style="white-space:pre-wrap;font-family:ui-monospace,monospace">${escapeHtml(item.message)}</pre>`
      );
      delivered++;
    } catch (e) {
      console.error("Delivery error:", e);
    }
  }
  return NextResponse.json({ ok: true, delivered });
}
function escapeHtml(s: string) {
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
