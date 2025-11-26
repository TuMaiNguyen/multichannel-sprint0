// backend/server.js
// Sweet Heaven API - CommonJS + Webhook + Admin API

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// ===== Cấu hình & "database" tạm thời trong RAM =====

// Secret HMAC: lấy từ Render (WEBHOOK_SECRET=sh_dev_2025_mai)
// Nếu chạy local mà chưa set env thì dùng "dev_secret" cho dễ test.
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "dev_secret";

// Menu mẫu cho trang public
const MENU_ITEMS = [
  { id: 1, name: "Strawberry Heaven", price: 59000 },
  { id: 2, name: "Chocolate Dream", price: 62000 },
  { id: 3, name: "Matcha Cloud", price: 65000 },
];

// Lưu feedback & contact tạm thời
const FEEDBACKS = [];
const CONTACTS = [];

// 👇 NEW: Lưu lại tất cả webhook event nhận được
const WEBHOOK_EVENTS = [];

// ===== Middleware kiểm tra chữ ký HMAC cho webhook =====

function verifySignature(req, res, next) {
  const signature = req.header("x-signature");

  if (!signature) {
    return res.status(400).json({
      ok: false,
      error: "missing_signature",
    });
  }

  const payload = JSON.stringify(req.body || {});
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "utf8");
  const expBuf = Buffer.from(expected, "utf8");

  // Độ dài khác nhau thì khỏi so timingSafeEqual
  if (sigBuf.length !== expBuf.length) {
    return res.status(401).json({
      ok: false,
      error: "invalid_signature",
    });
  }

  // So sánh an toàn
  const isValid = crypto.timingSafeEqual(sigBuf, expBuf);

  if (!isValid) {
    return res.status(401).json({
      ok: false,
      error: "invalid_signature",
    });
  }

  return next();
}

// ===== Route cơ bản cho hệ thống public =====

// Health check cho Render & cho mình test
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// Menu bánh
app.get("/menu", (req, res) => {
  res.json({
    ok: true,
    items: MENU_ITEMS,
  });
});

// Gửi feedback từ khách (public)
app.post("/feedback", (req, res) => {
  const { name, email, message } = req.body || {};
  const id = FEEDBACKS.length + 1;

  const item = {
    id,
    name: name || "Anonymous",
    email: email || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  FEEDBACKS.push(item);

  res.status(201).json({
    ok: true,
    feedback: item,
  });
});

// Gửi contact form từ khách (public)
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const id = CONTACTS.length + 1;

  const item = {
    id,
    name: name || "Anonymous",
    email: email || "",
    subject: subject || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  CONTACTS.push(item);

  res.status(201).json({
    ok: true,
    contact: item,
  });
});

// ===== WEBHOOK CHÍNH TẠI ĐÂY =====
// Nhận event publish từ "bên ngoài" (ví dụ Git Bash, sau này có thể là hệ thống gửi bài)

app.post("/webhook/publish", verifySignature, (req, res) => {
  const payload = req.body || {};

  // Lưu record cho Admin xem (thêm thời gian nhận)
  const record = {
    ...payload,
    receivedAt: new Date().toISOString(),
  };

  // Đẩy lên đầu mảng cho tiện (sự kiện mới đứng đầu)
  WEBHOOK_EVENTS.unshift(record);

  console.log("✅ Webhook nhận payload:", payload);

  // Trả về đúng JSON em đang test bằng Git Bash
  res.json({
    ok: true,
    received: payload,
  });
});

// ===== ADMIN API (dùng cho Dashboard / Inbox) =====

// List toàn bộ webhook events
app.get("/admin/events", (req, res) => {
  res.json({
    ok: true,
    items: WEBHOOK_EVENTS,
  });
});

// Một số thống kê đơn giản cho Dashboard
app.get("/admin/stats", (req, res) => {
  const totalEvents = WEBHOOK_EVENTS.length;
  const publishedCount = WEBHOOK_EVENTS.filter(
    (e) => e.event === "published"
  ).length;
  const lastReceivedAt =
    totalEvents > 0 ? WEBHOOK_EVENTS[0].receivedAt : null;

  res.json({
    ok: true,
    stats: {
      totalEvents,
      publishedCount,
      lastReceivedAt,
    },
  });
});

// ===== 404 fallback =====

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "not_found",
    path: req.path,
  });
});

// ===== Start server =====

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
