// frontend/src/pages/admin/Inbox.jsx
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";

export default function Inbox() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/inbox")
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function reply(id) {
    await apiPost(`/inbox/${id}/reply`, { message: "Cảm ơn bạn! 🧁" });
    alert("Đã phản hồi (mô phỏng).");
  }

  if (loading) return <div className="p-4">Đang tải hộp thư…</div>;

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-semibold mb-2">Tin nhắn khách hàng</h1>
      {items.map(m => (
        <div key={m.id} className="border rounded p-3 bg-white/70">
          <div className="text-sm text-gray-500">{new Date(m.ts).toLocaleString()}</div>
          <div className="font-medium">{m.from}</div>
          <div>{m.message}</div>
          <button
            onClick={()=>reply(m.id)}
            className="mt-2 px-3 py-1 rounded bg-blue-600 text-white hover:opacity-90"
          >
            Trả lời
          </button>
        </div>
      ))}
      {items.length === 0 && <p className="text-gray-600">Chưa có tin nhắn.</p>}
    </div>
  );
}
