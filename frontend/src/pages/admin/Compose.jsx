// frontend/src/pages/admin/Compose.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { apiPost } from "../../lib/api";

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

export default function Compose() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState("Facebook");
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");
    setError("");

    const payload = {
      event: "published",
      id: `ui-${Date.now()}`,
      title: title || "(no title)",
      message: content || title || "(no content)",
      channel,
      scheduled_at: schedule || null,
    };

    try {
      const data = await apiPost("/webhook/publish", payload);

      if (data && data.ok) {
        setStatus("Đã gửi webhook /webhook/publish thành công.");
        setTitle("");
        setContent("");
        setSchedule("");
      } else {
        setError(
          data?.error ||
            "Webhook trả về lỗi. Kiểm tra lại backend hoặc chữ ký HMAC."
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        "Không gọi được /webhook/publish. Kiểm tra lại Render API base / CORS."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <AdminHero active="compose" />

      <section>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            margin: "0 0 18px",
          }}
        >
          Đăng bài bánh
        </h2>

        {status && (
          <p style={{ fontSize: "14px", color: "#166534", marginBottom: 10 }}>
            ✅ {status}
          </p>
        )}
        {error && (
          <p style={{ fontSize: "14px", color: "#b91c1c", marginBottom: 10 }}>
            ⚠ {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "32px",
            boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
            padding: "22px 26px 24px",
            maxWidth: "900px",
          }}
        >
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Tiêu đề
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Nội dung
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
              />
            </label>
          </div>

          <div
            style={{
              marginBottom: "14px",
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: "16px",
            }}
          >
            <label style={labelStyle}>
              Kênh
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                style={inputStyle}
              >
                <option>Facebook</option>
                <option>Instagram</option>
                <option>TikTok</option>
              </select>
            </label>

            <label style={labelStyle}>
              Lên lịch
              <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                style={inputStyle}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              background:
                "linear-gradient(135deg,#2563eb 0%,#4f46e5 45%,#a855f7 100%)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {submitting ? "Đang gửi..." : "Gửi webhook đăng bài"}
          </button>
        </form>
      </section>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
  outline: "none",
  fontSize: "14px",
  marginTop: "4px",
};
