// frontend/src/pages/admin/Inbox.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGet } from "../../lib/api";

function AdminHero({ active }) {
  const tabStyle = (isActive) => ({
    padding: "10px 24px",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    color: isActive ? "#b91c1c" : "#111827",
    backgroundColor: isActive ? "#fecaca" : "#ffffff",
    boxShadow: isActive ? "0 10px 25px rgba(248,113,113,0.35)" : "none",
  });

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,#ffe4e6 0%,#fdf2f8 30%,#eff6ff 65%,#ecfeff 100%)",
        borderRadius: "40px",
        padding: "24px 28px 22px",
        boxShadow: "0 22px 60px rgba(15,23,42,0.18)",
        marginBottom: "26px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle at 30% 20%,#f97373,#fb7185 45%,#f97316 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "22px",
          }}
        >
          SH
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Sweet Heaven Bakery — Media Hub
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "14px",
              color: "#4b5563",
            }}
          >
            Cổng truyền thông đa kênh cho chuỗi tiệm bánh.
          </p>
        </div>
      </div>

      <nav
        style={{
          marginTop: "22px",
          display: "flex",
          gap: "16px",
        }}
      >
        <NavLink to="/admin" style={() => tabStyle(active === "dashboard")}>
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/compose"
          style={() => tabStyle(active === "compose")}
        >
          Đăng bài
        </NavLink>
        <NavLink
          to="/admin/calendar"
          style={() => tabStyle(active === "calendar")}
        >
          Lịch xuất bản
        </NavLink>
        <NavLink to="/admin/inbox" style={() => tabStyle(active === "inbox")}>
          Tin nhắn KH
        </NavLink>
      </nav>
    </section>
  );
}

export default function Inbox() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiGet("/admin/events");
      if (data && data.ok) {
        setEvents(data.events || []);
      } else {
        setError("Không tải được events.");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi khi gọi /admin/events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <main>
      <AdminHero active="inbox" />

      <section>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            margin: "0 0 10px",
          }}
        >
          Inbox – Webhook events
        </h2>

        <button
          type="button"
          onClick={loadEvents}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          Refresh
        </button>

        {loading && (
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Đang tải...</p>
        )}
        {error && (
          <p style={{ fontSize: "14px", color: "#b91c1c" }}>{error}</p>
        )}

        {!loading && !error && events.length === 0 && (
          <p style={{ fontSize: "15px" }}>Chưa có sự kiện nào được ghi nhận.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "28px",
              boxShadow: "0 16px 38px rgba(15,23,42,0.14)",
              padding: "18px 22px",
              fontSize: "14px",
            }}
          >
            {events.map((ev) => (
              <div
                key={ev.id + (ev.timestamp || "")}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {ev.event || "event"} – {ev.id}
                </div>
                <div style={{ color: "#6b7280" }}>
                  Message: {ev.message || "(no message)"}
                </div>
                <div style={{ color: "#6b7280" }}>
                  Channel: {ev.channel || "N/A"}
                </div>
                <div style={{ color: "#9ca3af" }}>
                  Time: {ev.timestamp || ev.received_at || "N/A"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
