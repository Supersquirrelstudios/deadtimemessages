import { Resend } from "resend";
const resendKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL || "DeadTime <noreply@example.com>";

export async function sendEmail(to: string, subject: string, html: string) {
  if (!resendKey) {
    console.log("[email:simulate]", { to, subject });
    return { ok: true, simulated: true };
  }
  const resend = new Resend(resendKey);
  return await resend.emails.send({ from: fromEmail, to, subject, html });
}
