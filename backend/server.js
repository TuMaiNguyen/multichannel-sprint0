// backend/server.js

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware chung
app.use(cors());
app.use(express.json());

// 🔐 Secret HMAC – để đơn giản mình hard-code cho trùng 100% với Git Bash
const WEBHOOK_SECRET = "sh_dev_2_025_mai";

// ====== In-memory store đơn giản ======
const menuItems = [
  { id: 1, name: "Strawberry Heaven", price: 45000 },
  { id: 2, name: "Chocolate Dream", price: 48000 },
  { id: 3, name: "Matcha Cloud", price: 42000 },
];

const feedbackList = [];
const contactList = [];
const inboxMessages = [];

// ====== Middleware verify chữ ký HMAC ======
function verifySignature(req, res, next) {
  const signature = req.header("x-signature") || "";
  const payload = JSON.stringify(req.body || {});

  const hmac = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  if (!signature) {
    return res.status(401).json({ ok: false, error: "missing_signature" });
  }

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const hmacBuf = Buffer.from(hmac, "hex");

    if (sigBuf.length !== hmacBuf.length) {
      return res.status(401).json({ ok: false, error: "invalid_signature" });
    }

    if (crypto.timingSafeEqual(sigBuf, hmacBuf)) {
      return next();
    }

    return res.status(401).json({ ok: false, error: "invalid_signature" });
  } catch (err) {
    console.error("verifySignature error:", err);
    return res.status(401).json({ ok: false, error: "invalid_signature" });
  }
}

// ====== Route test hệ thống ======
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// ====== API public cho frontend ======

// Menu
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// Feedback
app.get("/feedback", (req, res) => {
  res.json(feedbackList);
});

app.post("/feedback", (req, res) => {
  const item = {
    id: Date.now().toString(),
    name: req.body.name || "Anonymous",
    message: req.body.message || "",
    createdAt: new Date().toISOString(),
  };
  feedbackList.push(item);
  res.status(201).json(item);
});

// Contact
app.get("/contact", (req, res) => {
  res.json(contactList);
});

app.post("/contact", (req, res) => {
  const item = {
    id: Date.now().toString(),
    name: req.body.name || "",
    email: req.body.email || "",
    message: req.body.message || "",
    createdAt: new Date().toISOString(),
  };
  contactList.push(item);
  res.status(201).json(item);
});

// ====== Webhook chính /webhook/publish ======
app.post("/webhook/publish", verifySignature, (req, res) => {
  const msg = {
    id: Date.now().toString(),
    payload: req.body,
    createdAt: new Date().toISOString(),
  };
  inboxMessages.push(msg);

  console.log("Webhook nhận payload:", req.body);

  res.json({ ok: true, received: req.body });
});

// (optional) xem inbox webhook
app.get("/admin/inbox", (req, res) => {
  res.json(inboxMessages);
});

// ====== Start server ======
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
