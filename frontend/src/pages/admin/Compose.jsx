// frontend/src/pages/admin/Compose.jsx
import { useState } from "react";
import { apiPost } from "../../lib/api";

export default function Compose() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [channels, setChannels] = useState(["Facebook"]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [ok, setOk] = useState("");

  async function submit(e) {
    e.preventDefault();
    const post = await apiPost("/posts", { title, content, channels, scheduledAt });
    setOk(`Đã lưu: #${post.id} (${post.status})`);
    setTitle(""); setContent(""); setChannels(["Facebook"]); setScheduledAt("");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Đăng bài bánh</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Tiêu đề"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={6}
          placeholder="Nội dung"
          value={content}
          onChange={e=>setContent(e.target.value)}
        />
        <div className="flex gap-3 items-center">
          <label className="text-sm">Kênh:</label>
          <select
            className="border rounded px-2 py-1"
            value={channels[0]}
            onChange={e=>setChannels([e.target.value])}
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Zalo</option>
            <option>TikTok</option>
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <label className="text-sm">Lên lịch:</label>
          <input
            type="datetime-local"
            className="border rounded px-2 py-1"
            value={scheduledAt}
            onChange={e=>setScheduledAt(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:opacity-90">
          Lưu
        </button>
      </form>
      {ok && <p className="mt-3 text-green-700">{ok}</p>}
    </div>
  );
}
