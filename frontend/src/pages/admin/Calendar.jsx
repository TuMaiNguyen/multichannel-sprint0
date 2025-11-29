// frontend/src/pages/admin/Calendar.jsx
import React from "react";

export default function Calendar() {
  return (
    <div>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        Lịch xuất bản (demo)
      </h2>
      <p style={{ fontSize: "15px", color: "#4b5563", maxWidth: "520px" }}>
        Hiện tại chưa có bài hẹn giờ. Vào{" "}
        <strong>Đăng bài</strong> để thêm lịch đăng bài cho các kênh Facebook,
        Zalo, TikTok... (demo cho đồ án).
      </p>
    </div>
  );
}
