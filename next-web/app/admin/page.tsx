"use client";
import { useEffect, useState } from 'react';

type Queued = { id: string; email: string; message: string; whenEpoch: number };

export default function AdminPage() {
  const [items, setItems] = useState<Queued[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/list', {
        headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_HEADER ?? '' }
      });
      if (!res.ok) throw new Error(`List failed: ${res.status}`);
      setItems(await res.json());
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  async function cancel(id: string) {
    if (!confirm('Cancel this scheduled message?')) return;
    const res = await fetch('/api/admin/cancel', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_HEADER ?? ''
      },
      body: JSON.stringify({ id })
    });
    if (!res.ok) alert('Cancel failed');
    await refresh();
  }

  useEffect(() => { refresh(); }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">DeadTime Admin</h1>
      <div className="flex items-center gap-2">
        <button onClick={refresh} className="px-3 py-1.5 rounded bg-black text-white">
          {loading ? 'Loading…' : 'Refresh'}
        </button>
        {error && <span className="text-red-600">{error}</span>}
      </div>
      <ul className="divide-y rounded border">
        {items.length === 0 && <li className="p-3 text-sm text-gray-500">Nothing queued.</li>}
        {items.map(i => (
          <li key={i.id} className="p-3 flex items-center justify-between gap-4">
            <div className="text-sm">
              <div className="font-medium">{i.email}</div>
              <div className="text-gray-600">{i.message}</div>
              <div className="text-gray-500">
                Sends: {new Date(i.whenEpoch * 1000).toLocaleString()}
              </div>
            </div>
            <button onClick={() => cancel(i.id)} className="px-3 py-1.5 rounded border">
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
