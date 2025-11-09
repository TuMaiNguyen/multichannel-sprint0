// frontend/src/pages/admin/Inbox.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Inbox() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setStatus("loading");
        const data = await api.feedbackList(); // GET /feedback
        if (!cancelled) {
          setRows(Array.isArray(data) ? data : data?.items || []);
          setStatus("ok");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Không tải được danh sách góp ý");
          setStatus("error");
        }
      }
    })();
    return () => (cancelled = true);
  }, []);

  return (
    <section>
      <h2>Hộp thư góp ý</h2>
      {status === "loading" && <p>Đang tải…</p>}
      {status === "error" && <p>Lỗi: {error}</p>}

      {status === "ok" && rows.length === 0 && <p>Chưa có góp ý nào.</p>}
      {status === "ok" && rows.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.createdAt ? new Date(r.createdAt).toLocaleString("vi-VN") : "-"}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.rating}</td>
                <td style={{ maxWidth: 420 }}>{r.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
