// frontend/src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadStats() {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet("/admin/stats");

      if (!data || !data.ok) {
        throw new Error("API /admin/stats trả về không hợp lệ");
      }

      setStats(data);
    } catch (err) {
      console.error(err);
      setError(
        "Không tải được thống kê webhook. Hãy kiểm tra backend Render và bấm Refresh."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        Dashboard – Webhook stats
      </h2>

      <button
        type="button"
        onClick={loadStats}
        style={{
          padding: "8px 16px",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#1d4ed8",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Refresh
      </button>

      {error && (
        <div style={{ marginTop: "12px", maxWidth: "480px" }}>
          <ErrorBanner>{error}</ErrorBanner>
        </div>
      )}

      {loading && (
        <div style={{ marginTop: "12px" }}>
          <Loader />
        </div>
      )}

      {stats && !loading && (
        <div
          style={{
            marginTop: "18px",
            fontSize: "15px",
            lineHeight: 1.8,
          }}
        >
          <p>
            <strong>Tổng số events</strong>
            <br />
            {stats.totalEvents}
          </p>
          <p>
            <strong>Số event "published"</strong>
            <br />
            {stats.publishedCount}
          </p>

          <p>
            <strong>Last event</strong>
          </p>
          {stats.lastEvent ? (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0 8px 24px rgba(148,163,184,0.35)",
                maxWidth: "520px",
              }}
            >
              <div>
                <strong>ID:</strong> {stats.lastEvent.id}
              </div>
              <div>
                <strong>Event:</strong> {stats.lastEvent.event}
              </div>
              <div>
                <strong>Message:</strong> {stats.lastEvent.message || "—"}
              </div>
              <div>
                <strong>Channel:</strong> {stats.lastEvent.channel || "—"}
              </div>
              <div>
                <strong>Created at:</strong> {stats.lastEvent.createdAt}
              </div>
            </div>
          ) : (
            <p>Chưa có event nào.</p>
          )}
        </div>
      )}
    </div>
  );
}
