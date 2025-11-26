// backend/server.js — bản stable dùng CommonJS

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 Secret để verify HMAC
// Render đang để: WEBHOOK_SECRET=sh_dev_2025_mai
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "sh_dev_2025_mai";

// =========================
// Middleware kiểm tra chữ ký
// =========================
function verifySignature(req, res, next) {
  const signature = req.header("x-signature") || "";

  if (!signature) {
    return res
      .status(400)
      .json({ ok: false, error: "missing_signature" });
  }

  const payload = JSON.stringify(req.body || {});

  const hmac = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "utf8");
  const hmacBuf = Buffer.from(hmac, "utf8");

  if (sigBuf.length !== hmacBuf.length) {
    return res
      .status(401)
      .json({ ok: false, error: "invalid_signature" });
  }

  if (!crypto.timingSafeEqual(sigBuf, hmacBuf)) {
    return res
      .status(401)
      .json({ ok: false, error: "invalid_signature" });
  }

  next();
}

// ==================================
// Route test hệ thống
// ==================================
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// ==================================
// Lưu các event nhận từ webhook
// ==================================
const events = [];

// Webhook chính
app.post("/webhook/publish", verifySignature, (req, res) => {
  const evt = {
    id: req.body.id || `evt_${Date.now()}`,
    event: req.body.event || "unknown",
    message: req.body.message || "",
    createdAt: new Date().toISOString(),
  };

  events.push(evt);

  console.log("Webhook nhận payload:", req.body);

  res.json({ ok: true, received: req.body });
});

// Admin API: xem list events
app.get("/admin/events", (req, res) => {
  res.json({ ok: true, items: events });
});

// Admin API: stats đơn giản
app.get("/admin/stats", (req, res) => {
  const totalEvents = events.length;
  const publishedCount = events.filter((e) => e.event === "published").length;
  const lastEvent = events[events.length - 1] || null;

  res.json({
    ok: true,
    totalEvents,
    publishedCount,
    lastEvent,
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "not_found", path: req.path });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
