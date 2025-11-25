// backend/server.js - CommonJS + webhook + mock API

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// Mock data (menu, inbox, KPI)
// ==========================
const menuItems = [
  { id: "m1", name: "Strawberry Heaven", price: 45000, category: "cake" },
  { id: "m2", name: "Chocolate Cloud", price: 42000, category: "cake" },
  { id: "m3", name: "Caramel Latte", price: 39000, category: "drink" },
];

const feedbacks = [];
const inboxMessages = [];
const posts = [];

const kpis = [
  {
    id: "kpi-orders-today",
    metric: "orders_today",
    value: 23,
    capturedAt: new Date().toISOString(),
  },
  {
    id: "kpi-visits-today",
    metric: "visits_today",
    value: 145,
    capturedAt: new Date().toISOString(),
  },
];

// ==========================
// Webhook HMAC
// ==========================
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "dev_secret";

// Middleware kiểm tra chữ ký
function verifySignature(req, res, next) {
  const signature = req.header("x-signature") || "";
  const payload = JSON.stringify(req.body || {});

  const hmac = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  try {
    const sigBuf = Buffer.from(signature);
    const hmacBuf = Buffer.from(hmac);

    if (
      sigBuf.length === hmacBuf.length &&
      crypto.timingSafeEqual(hmacBuf, sigBuf)
    ) {
      return next();
    }
  } catch (err) {
    console.error("verifySignature error:", err);
  }

  return res.status(401).json({ ok: false, error: "invalid_signature" });
}

// ==========================
// Public routes
// ==========================

// Test hệ thống
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// Menu cho trang public
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// Feedback
app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};
  if (!name || !message) {
    return res.status(400).json({ ok: false, error: "name_and_message_required" });
  }

  const fb = {
    id: `fb_${Date.now()}`,
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  feedbacks.push(fb);
  // cũng đẩy vào inbox cho admin xem
  inboxMessages.unshift({
    id: fb.id,
    channel: "feedback",
    sender: name,
    message,
    createdAt: fb.createdAt,
  });

  res.json({ ok: true, feedback: fb });
});

// Contact form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "missing_fields" });
  }

  const msg = {
    id: `ct_${Date.now()}`,
    channel: "contact",
    sender: name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  inboxMessages.unshift(msg);
  res.json({ ok: true, received: msg });
});

// ==========================
// Admin routes (Inbox / KPI / Posts)
// ==========================

app.get("/admin/inbox", (req, res) => {
  res.json(inboxMessages);
});

app.get("/admin/kpi", (req, res) => {
  res.json(kpis);
});

app.get("/admin/posts", (req, res) => {
  res.json(posts);
});

app.post("/admin/posts", (req, res) => {
  const { channel, title, content, scheduledAt } = req.body || {};
  const post = {
    id: `post_${Date.now()}`,
    channel: channel || "facebook",
    title: title || "(No title)",
    content: content || "",
    scheduledAt: scheduledAt || null,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post);
  res.json({ ok: true, post });
});

// ==========================
// 📌 WEBHOOK CHÍNH Ở ĐÂY
// ==========================

app.post("/webhook/publish", verifySignature, (req, res) => {
  console.log("Webhook nhận payload:", req.body);

  // Ví dụ: nếu event = "published" thì đẩy message vào inbox
  const { event, id, channel, message } = req.body || {};
  if (event === "published" && message) {
    const msg = {
      id: id || `wh_${Date.now()}`,
      channel: channel || "webhook",
      sender: "Webhook",
      message,
      createdAt: new Date().toISOString(),
    };
    inboxMessages.unshift(msg);
  }

  res.json({ ok: true, received: req.body });
});

// ==========================
// 404 fallback
// ==========================

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ==========================
// Start server
// ==========================

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

module.exports = app;
