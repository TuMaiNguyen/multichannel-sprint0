// backend/server.js
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// ======= CONFIG =======
const PORT = process.env.PORT || 10000;

// Dùng chung 1 secret cố định để khỏi bị lệch giữa server & Git Bash
// NHỚ: chuỗi này phải trùng với chuỗi em dùng khi ký ở Git Bash
const WEBHOOK_SECRET = "sh_dev_2_025_mai";

// ======= IN-MEMORY "DB" ĐƠN GIẢN =======
const menuItems = [
  { id: 1, name: "Strawberry Heaven", price: 45000, channel: "Facebook" },
  { id: 2, name: "Chocolate Dream",   price: 48000, channel: "Instagram" },
  { id: 3, name: "Matcha Cloud",      price: 42000, channel: "Tiktok" },
];

const feedbackList = [];
const contactList = [];
const inboxMessages = []; // để dành cho admin inbox nếu cần

// ======= HELPER: KIỂM TRA CHỮ KÝ HMAC =======
function verifySignature(req, res, next) {
  const signature = req.headers["x-signature"] || "";
  const payload = JSON.stringify(req.body || {});

  const hmac = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  if (hmac === signature) {
    return next();
  }

  return res.status(401).json({ ok: false, error: "invalid_signature" });
}

// ======= ROUTES CŨ (MENU / CONTACT / FEEDBACK) =======

// Health check
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// Public menu
app.get("/menu", (req, res) => {
  res.json({ ok: true, items: menuItems });
});

// Contact form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  const item = {
    id: Date.now().toString(),
    name: name || "",
    email: email || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  contactList.push(item);
  res.status(201).json({ ok: true, contact: item });
});

// Feedback form
app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};

  const item = {
    id: Date.now().toString(),
    name: name || "",
    message: message || "",
    createdAt: new Date().toISOString(),
  };

  feedbackList.push(item);
  res.status(201).json({ ok: true, feedback: item });
});

// Optional: list feedback (cho admin xem)
app.get("/feedback", (req, res) => {
  res.json({ ok: true, items: feedbackList });
});

// ======= WEBHOOK PUBLISH =======
app.post("/webhook/publish", verifySignature, (req, res) => {
  // Lưu payload vô inbox cho vui, sau dùng admin dashboard cũng được
  const msg = {
    id: Date.now().toString(),
    payload: req.body,
    receivedAt: new Date().toISOString(),
  };
  inboxMessages.push(msg);

  console.log("Webhook nhận payload:", req.body);

  res.json({ ok: true, received: req.body });
});

// ======= START SERVER =======
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
