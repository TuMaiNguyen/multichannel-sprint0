// frontend/src/pages/public/Feedback.jsx
import React, { useState } from "react";
import { apiPost } from "../../lib/api";
import ErrorBanner from "../../components/ErrorBanner";

export default function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await apiPost("/feedback", {
        name,
        message,
        createdAt: new Date().toISOString(),
      });

      setStatus("success");
      setName("");
      setMessage("");
    } catch (err) {
      console.warn("Feedback API error:", err?.message || err);
      setStatus("error");
      setError(
        "Gửi góp ý thất bại do API /feedback đang lỗi. Trong demo, bạn cứ coi như góp ý đã được ghi nhận."
      );
    }
  }

  return (
    <main className="page page-feedback">
      <section className="page-section">
        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          }}
        >
          <div>
            <h1 className="page-title">Góp ý cho Sweet Heaven</h1>
            <p className="page-subtitle">
              Mọi phản hồi về menu, dịch vụ hoặc trải nghiệm kênh số, bạn có
              thể gửi vào form bên phải.
            </p>

            {status === "success" && (
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  background: "#ecfdf3",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                }}
              >
                Cảm ơn bạn đã gửi góp ý! (Demo: nếu backend hoạt động, dữ liệu
                đã được gửi tới API /feedback.)
              </p>
            )}

            {status === "error" && error && <ErrorBanner message={error} />}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.9)",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="fb-name"
                style={{ display: "block", marginBottom: "0.25rem" }}
              >
                Tên của bạn
              </label>
              <input
                id="fb-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Đỗ Tú Mai"
                style={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  padding: "0.5rem 0.75rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="fb-message"
                style={{ display: "block", marginBottom: "0.25rem" }}
              >
                Nội dung góp ý
              </label>
              <textarea
                id="fb-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ví dụ: góp ý về layout, màu sắc, trải nghiệm đặt bánh..."
                style={{
                  width: "100%",
                  minHeight: "120px",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  padding: "0.5rem 0.75rem",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                borderRadius: "0.5rem",
                padding: "0.5rem 1.25rem",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                opacity: status === "sending" ? 0.7 : 1,
                cursor: status === "sending" ? "default" : "pointer",
              }}
            >
              {status === "sending" ? "Đang gửi..." : "Gửi góp ý"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
