// backend/server.js
// CommonJS version – chạy trên Render

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 10000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "";

// Middleware
app.use(cors());
app.use(
  express.json()
);

// In-memory store cho webhook events
const events = [];

// ------------------ PUBLIC API ------------------

// Health check cho vui
app.get("/healthz", (req, res) => {
  res.json({ ok: true, status: "healthy" });
});

// Menu tiệm bánh
app.get("/menu", (req, res) => {
  res.json({
    ok: true,
    items: [
      {
        id: 1,
        name: "Croissant bơ",
        price: 32000,
        description: "Bánh croissant bơ Pháp, lớp vỏ giòn, ruột bông."
      },
      {
        id: 2,
        name: "Tiramisu cacao",
        price: 45000,
        description: "Bánh lạnh vị cà phê & cacao, ngọt vừa."
      },
      {
        id: 3,
        name: "Trà sữa Sweet Heaven",
        price: 39000,
        description: "Trà sữa trân châu signature của tiệm."
      }
    ]
  });
});

// Nhận góp ý khách hàng
app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};
  console.log("[feedback]", { name, message });
  // Không cần lưu DB, chỉ cần trả ok để FE biết là đã gửi thành công
  res.json({ ok: true });
});

// Thông tin liên hệ chi nhánh
app.get("/contact", (req, res) => {
  res.json({
    ok: true,
    branches: [
      {
        id: 1,
        name: "Sweet Heaven – Quận 1",
        address: "123 Nguyễn Huệ, Q.1, TP.HCM",
        phone: "0900 000 001"
      },
      {
        id: 2,
        name: "Sweet Heaven – Thủ Đức",
        address: "45 Võ Văn Ngân, TP. Thủ Đức",
        phone: "0900 000 002"
      }
    ]
  });
});

// ------------------ WEBHOOK + HMAC ------------------

function verifySignature(req, res, next) {
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ ok: false, error: "missing_secret" });
  }

  const signature = req.header("x-signature");
  if (!signature) {
    return res.status(401).json({ ok: false, error: "missing_signature" });
  }

  // Dùng JSON.stringify giống chuỗi BODY bên Git Bash
  const payloadString = JSON.stringify(req.body || {});
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payloadString)
    .digest("hex");

  if (signature !== expected) {
    return res.status(401).json({ ok: false, error: "invalid_signature" });
  }

  next();
}

app.post("/webhook/publish", verifySignature, (req, res) => {
  const payload = req.body || {};

  const event = {
    id: payload.id || `evt_${Date.now()}`,
    event: payload.event || "unknown",
    message: payload.message || "",
    channel: payload.channel || "webhook",
    createdAt: new Date().toISOString()
  };

  events.push(event);

  res.json({ ok: true, received: payload });
});

// ------------------ ADMIN API ------------------

app.get("/admin/events", (req, res) => {
  res.json({
    ok: true,
    // cho dễ xem, đảo ngược cho event mới lên đầu
    items: [...events].reverse()
  });
});

app.get("/admin/stats", (req, res) => {
  const totalEvents = events.length;
  const publishedCount = events.filter((e) => e.event === "published").length;
  const lastEvent = events[events.length - 1] || null;

  res.json({
    ok: true,
    totalEvents,
    publishedCount,
    lastEvent
  });
});

// ------------------ FALLBACK 404 ------------------

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "not_found", path: req.path });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
