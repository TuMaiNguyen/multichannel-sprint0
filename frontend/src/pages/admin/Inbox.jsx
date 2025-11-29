// frontend/src/pages/admin/Inbox.jsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";

export default function Inbox() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet("/admin/events");

      if (!data || !data.ok) {
        throw new Error("API /admin/events trả về không hợp lệ");
      }

      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
      setError(
        "Không tải được danh sách event từ webhook. Hãy kiểm tra backend Render và bấm Refresh."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
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
        Inbox – Webhook events
      </h2>

      <button
        type="button"
        onClick={loadEvents}
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

      {!loading && !items.length && !error && (
        <p style={{ marginTop: "16px" }}>Chưa có sự kiện nào được ghi nhận.</p>
      )}

      {items.length > 0 && (
        <div
          style={{
            marginTop: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "640px",
          }}
        >
          {items.map((evt) => (
            <div
              key={evt.createdAt + evt.id}
              style={{
                padding: "12px 14px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 18px rgba(148,163,184,0.35)",
              }}
            >
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                {evt.createdAt}
              </div>
              <div style={{ fontSize: "15px", fontWeight: 600 }}>
                {evt.event} – {evt.channel || "webhook"}
              </div>
              {evt.message && (
                <div
                  style={{
                    fontSize: "14px",
                    marginTop: "4px",
                    color: "#374151",
                  }}
                >
                  {evt.message}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                  color: "#9ca3af",
                }}
              >
                ID: {evt.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
