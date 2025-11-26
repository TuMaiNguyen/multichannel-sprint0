// frontend/src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet("/admin/stats");
      setStats(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Không tải được thống kê");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  const totalEvents = stats?.totalEvents ?? 0;
  const publishedCount = stats?.publishedCount ?? 0;
  const lastEvent = stats?.lastEvent ?? null;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard – Webhook stats</h1>
        <button onClick={loadStats}>Refresh</button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h2>Tổng số events</h2>
              <p className="stat-number">{totalEvents}</p>
            </div>
            <div className="stat-card">
              <h2>Số event “published”</h2>
              <p className="stat-number">{publishedCount}</p>
            </div>
          </div>

          <div className="stat-last">
            <h2>Last event</h2>
            {lastEvent ? (
              <pre className="last-event-json">
                {JSON.stringify(lastEvent, null, 2)}
              </pre>
            ) : (
              <p>Chưa có event nào.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
