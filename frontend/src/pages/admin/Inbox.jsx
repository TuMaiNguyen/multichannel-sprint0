// frontend/src/pages/admin/Inbox.jsx
import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Inbox() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet("/admin/events");
      setEvents(data?.items ?? []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Không tải được danh sách sự kiện");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Inbox – Webhook events</h1>
        <button onClick={loadEvents}>Refresh</button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>Chưa có sự kiện nào được ghi nhận.</p>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Event</th>
                <th>Message</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt, idx) => (
                <tr key={evt.id ?? idx}>
                  <td>{idx + 1}</td>
                  <td>{evt.id ?? "—"}</td>
                  <td>{evt.event ?? "unknown"}</td>
                  <td>{evt.message ?? evt.payload?.message ?? "—"}</td>
                  <td>
                    {evt.timestamp ||
                      evt.createdAt ||
                      evt.receivedAt ||
                      "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
