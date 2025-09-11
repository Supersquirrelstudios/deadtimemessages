"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [when, setWhen] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message, when })
    });
    const data = await res.json();
    if (data.ok) {
      alert("Message queued! (check Vercel logs if email not configured)");
      setMessage("");
      setWhen("");
    } else {
      alert(data.error || "Failed to queue message.");
    }
  }

  return (
    <main>
      <h1 className="title">DeadTime Messages</h1>
      <p className="sub">Write today. Deliver when it matters.</p>

      <form onSubmit={handleSubmit} className="grid card">
        <div>
          <div className="label">Recipient email</div>
          <input
            required
            type="email"
            className="input"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="label">Your message</div>
          <textarea
            required
            className="textarea"
            placeholder="What would you like to say?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <div className="label">Deliver at (your local time)</div>
          <input
            required
            type="datetime-local"
            className="datetime"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          />
          <div className="hint">
            We’ll convert this to UTC and schedule delivery.
          </div>
        </div>

        <button className="button">Queue Message</button>
      </form>

      <p className="footer">
        Prototype: cron runs every 5 minutes. Emails are simulated until you add a
        key.
      </p>
    </main>
  );
}
