// frontend/src/pages/admin/Compose.jsx
import React, { useState } from "react";

export default function Compose() {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("Facebook");
  const [content, setContent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Demo: chỉ lưu local, không gọi API thật
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 800,
          marginBottom: "16px",
        }}
      >
        Đăng bài bánh
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "720px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <label style={{ fontSize: "14px", fontWeight: 600 }}>
          Tiêu đề
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              marginTop: "4px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          />
        </label>

        <label style={{ fontSize: "14px", fontWeight: 600 }}>
          Nội dung
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            style={{
              marginTop: "4px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              resize: "vertical",
            }}
          />
        </label>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Kênh
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              style={{
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
            >
              <option>Facebook</option>
              <option>Zalo</option>
              <option>TikTok</option>
              <option>Instagram</option>
            </select>
          </label>

          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Lên lịch
            <input
              type="datetime-local"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              style={{
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "8px",
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: "999px",
            border: "none",
            background:
              "linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #ec4899 100%)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Lưu
        </button>

        {saved && (
          <p
            style={{
              marginTop: "4px",
              fontSize: "13px",
              color: "#16a34a",
            }}
          >
            Đã lưu nháp bài đăng (demo).
          </p>
        )}
      </form>
    </div>
  );
}
