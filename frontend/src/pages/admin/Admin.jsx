// frontend/src/pages/admin/Admin.jsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";
import { formatCurrency } from "../../lib/format";

function DashboardTab({ stats }) {
  if (!stats) {
    return (
      <p style={{ color: "#6b7280" }}>
        Đang tải thống kê từ webhook /admin/stats...
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
      }}
    >
      <DashboardCard
        label="Tổng sự kiện webhook"
        value={stats.totalEvents ?? stats.total ?? 0}
      />
      <DashboardCard
        label="Bài đăng đã gửi"
        value={stats.publishedCount ?? stats.sent ?? 0}
      />
      <DashboardCard
        label="Tin nhắn thành công"
        value={stats.deliveredCount ?? stats.success ?? 0}
      />
      <DashboardCard
        label="Tin nhắn lỗi / thất bại"
        value={stats.failedCount ?? stats.failed ?? 0}
      />
    </div>
  );
}

function DashboardCard({ label, value }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(239,246,255,0.9))",
        boxShadow: "0 14px 40px rgba(148,163,184,0.35)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#6b7280",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: "#111827",
        }}
      >
        {typeof value === "number" ? value.toLocaleString("vi-VN") : value}
      </div>
    </div>
  );
}

function EventsTab({ events }) {
  if (!events) {
    return (
      <p style={{ color: "#6b7280" }}>
        Đang tải lịch sử sự kiện từ /admin/events...
      </p>
    );
  }

  if (!events.length) {
    return (
      <p style={{ color: "#6b7280" }}>
        Chưa có sự kiện webhook nào. Hãy thử Đăng bài ở tab “Đăng bài”.
      </p>
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        boxShadow:
          "0 18px 60px rgba(148,163,184,0.4), 0 0 0 1px rgba(255,255,255,0.6)",
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 110px 1fr 150px",
          gap: "8px",
          padding: "6px 0 8px",
          borderBottom: "1px solid rgba(226,232,240,0.9)",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#6b7280",
          fontWeight: 600,
        }}
      >
        <span>Thời gian</span>
        <span>Channel</span>
        <span>Nội dung</span>
        <span>Trạng thái</span>
      </div>

      <div
        style={{
          maxHeight: 320,
          overflow: "auto",
        }}
      >
        {events.map((e, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 110px 1fr 150px",
              gap: "8px",
              padding: "8px 0",
              borderBottom:
                idx === events.length - 1
                  ? "none"
                  : "1px dashed rgba(226,232,240,0.7)",
              fontSize: "13px",
            }}
          >
            <span>{e.createdAt || e.time || ""}</span>
            <span>{e.channel || e.source || "webhook"}</span>
            <span>{e.message || e.title || e.event}</span>
            <span
              style={{
                color: e.status === "ok" || e.ok ? "#16a34a" : "#ef4444",
              }}
            >
              {e.status || (e.ok ? "ok" : "error")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComposeTab({ onPublished, busy }) {
  const [message, setMessage] = useState(
    "Chào bạn, đây là tin nhắn thử nghiệm từ Sweet Heaven Bakery – Media Hub."
  );
  const [channel, setChannel] = useState("facebook");
  const [error, setError] = useState("");
  const [previewCost] = useState(120000); // chỉ để minh họa dùng formatCurrency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onPublished({ message, channel });
      setMessage(
        "Chào bạn, đây là tin nhắn thử nghiệm từ Sweet Heaven Bakery – Media Hub."
      );
    } catch (err) {
      setError("Gửi webhook thất bại, vui lòng kiểm tra lại server Render.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "20px 22px 22px",
        boxShadow:
          "0 18px 60px rgba(148,163,184,0.4), 0 0 0 1px rgba(255,255,255,0.6)",
        display: "grid",
        gap: "14px",
      }}
    >
      <div>
        <label
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "4px",
            display: "block",
          }}
        >
          Kênh đăng thử nghiệm
        </label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "999px",
            border: "1px solid rgba(209,213,219,0.9)",
            padding: "8px 14px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f9fafb",
          }}
        >
          <option value="facebook">Facebook Page (demo)</option>
          <option value="tiktok">TikTok (demo)</option>
          <option value="zalo">Zalo OA (demo)</option>
        </select>
      </div>

      <div>
        <label
          style={{
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "4px",
            display: "block",
          }}
        >
          Nội dung bài đăng / tin nhắn
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "18px",
            border: "1px solid rgba(209,213,219,0.9)",
            padding: "10px 14px",
            fontSize: "14px",
            resize: "vertical",
            outline: "none",
            backgroundColor: "#f9fafb",
          }}
        />
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "4px",
          }}
        >
          Đây chỉ là webhook giả lập, không đăng bài thật lên các kênh.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Chi phí media dự kiến (demo):{" "}
          <strong>
            {formatCurrency(previewCost).replace("₫", "đ")} / chiến dịch
          </strong>
        </div>

        <button
          type="submit"
          disabled={busy}
          style={{
            padding: "10px 22px",
            borderRadius: "999px",
            border: "none",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #f97316, #ec4899 55%, #fb7185)",
            cursor: busy ? "wait" : "pointer",
            boxShadow: "0 16px 36px rgba(248,113,113,0.45)",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? "Đang gửi webhook..." : "Đăng bài thử (webhook)"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#ef4444", fontSize: "13px" }}>{error}</p>
      )}
    </form>
  );
}

function CalendarTab() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "18px 20px 22px",
        boxShadow:
          "0 18px 60px rgba(148,163,184,0.4), 0 0 0 1px rgba(255,255,255,0.6)",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Lịch xuất bản (demo)
      </h3>
      <p style={{ fontSize: "14px", color: "#6b7280" }}>
        Phần này mô phỏng lịch xuất bản nội dung cho các kênh Bakery. Bạn có
        thể ghi chú: livestream Noel, ra mắt bánh mới, chương trình giảm giá...
      </p>
      <ul style={{ marginTop: "10px", fontSize: "14px", color: "#4b5563" }}>
        <li>01/12 – Ra mắt combo Noel “Sweet Heaven Snow Day”.</li>
        <li>15/12 – Livestream thử bánh mới trên Facebook & TikTok.</li>
        <li>22–24/12 – Mini game Giáng sinh trên social.</li>
      </ul>
    </div>
  );
}

function InboxTab({ events }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "18px 20px 22px",
        boxShadow:
          "0 18px 60px rgba(148,163,184,0.4), 0 0 0 1px rgba(255,255,255,0.6)",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Tin nhắn khách hàng (demo)
      </h3>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}>
        Để đơn giản, mục này đọc lại dữ liệu từ `/admin/events` giống như
        “Lịch sử sự kiện”, và diễn giải như inbox hợp nhất.
      </p>
      <EventsTab events={events} />
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState(null);
  const [loadingPublish, setLoadingPublish] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [statsRes, eventsRes] = await Promise.all([
          apiGet("/admin/stats"),
          apiGet("/admin/events"),
        ]);

        if (cancelled) return;

        if (statsRes && statsRes.ok) {
          setStats(statsRes.stats || statsRes.data || statsRes);
        } else {
          setStats(statsRes);
        }

        if (eventsRes && eventsRes.ok) {
          setEvents(eventsRes.events || eventsRes.data || eventsRes);
        } else if (Array.isArray(eventsRes)) {
          setEvents(eventsRes);
        }
      } catch (err) {
        console.error("Fetch admin data failed", err);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePublish = async ({ message, channel }) => {
    setLoadingPublish(true);
    try {
      await apiPost("/webhook/publish", {
        id: "demo-" + Date.now(),
        event: "published",
        channel,
        message,
      });

      // reload events & stats sau khi publish
      const [statsRes, eventsRes] = await Promise.all([
        apiGet("/admin/stats"),
        apiGet("/admin/events"),
      ]);

      if (statsRes && statsRes.ok) {
        setStats(statsRes.stats || statsRes.data || statsRes);
      } else {
        setStats(statsRes);
      }

      if (eventsRes && eventsRes.ok) {
        setEvents(eventsRes.events || eventsRes.data || eventsRes);
      } else if (Array.isArray(eventsRes)) {
        setEvents(eventsRes);
      }
    } finally {
      setLoadingPublish(false);
    }
  };

  const tabButton = (id, label) => (
    <button
      key={id}
      type="button"
      onClick={() => setActiveTab(id)}
      style={{
        padding: "10px 22px",
        borderRadius: "999px",
        border: "none",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        background:
          activeTab === id ? "#ffffff" : "rgba(255,255,255,0.5)",
        color: activeTab === id ? "#dc2626" : "#111827",
        boxShadow:
          activeTab === id
            ? "0 10px 30px rgba(248,113,113,0.45)"
            : "0 4px 12px rgba(15,23,42,0.18)",
      }}
    >
      {label}
    </button>
  );

  return (
    <main className="page page-admin">
      {/* Hero admin – giống layout cũ */}
      <section style={{ padding: "32px 24px 24px" }}>
        <div
          style={{
            borderRadius: "40px",
            padding: "24px 26px",
            background:
              "linear-gradient(120deg, #fee2e2, #ffe4e6, #e0f2fe 70%)",
            boxShadow:
              "0 32px 80px rgba(248,113,113,0.45), 0 0 0 1px rgba(255,255,255,0.6)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at 30% 20%, #fee2e2, #fb7185)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                color: "#ffffff",
                fontSize: "20px",
                boxShadow: "0 18px 40px rgba(248,113,113,0.5)",
              }}
            >
              SH
            </div>
            <div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  marginBottom: "4px",
                  color: "#111827",
                }}
              >
                Sweet Heaven Bakery — Media Hub
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  margin: 0,
                }}
              >
                Cổng truyền thông đa kênh cho chuỗi tiệm bánh.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {tabButton("dashboard", "Dashboard")}
            {tabButton("compose", "Đăng bài")}
            {tabButton("calendar", "Lịch xuất bản")}
            {tabButton("inbox", "Tin nhắn KH")}
          </div>
        </div>
      </section>

      {/* Nội dung theo tab */}
      <section style={{ padding: "0 24px 40px" }}>
        {activeTab === "dashboard" && <DashboardTab stats={stats} />}
        {activeTab === "compose" && (
          <ComposeTab onPublished={handlePublish} busy={loadingPublish} />
        )}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "inbox" && <InboxTab events={events} />}
      </section>
    </main>
  );
}
