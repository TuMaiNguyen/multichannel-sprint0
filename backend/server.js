// backend/server.js (CommonJS + webhook)

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// ===== Cấu hình secret cho webhook =====
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "dev_secret";

// ===== DỮ LIỆU GIẢ ĐƠN GIẢN CHO PROJECT =====

// Menu bánh
const menuItems = [
  {
    id: "cake_1",
    name: "Strawberry Heaven",
    price: 49000,
    description: "Bánh dâu tươi, kem béo nhẹ, vị chua ngọt dễ ăn."
  },
  {
    id: "cake_2",
    name: "Chocolate Dream",
    price: 55000,
    description: "Bánh socola phủ ganache, hợp gu ngọt đậm."
  },
  {
    id: "drink_1",
    name: "Cold Brew Caramel",
    price: 45000,
    description: "Cold brew vị caramel, ít đường."
  }
];

// Feedback & Contact lưu tạm trong RAM
const feedbacks = [];
const contacts = [];

// KPI / Inbox giả lập cho trang admin
const inboxMessages = [];
const kpis = [
  {
    id: "kpi_1",
    metric: "total_posts",
    value: 3,
    capturedAt: new Date().toISOString()
  }
];

// ===== Middleware kiểm tra chữ ký HMAC =====
function verifySignature(req, res, next) {
  try {
    const signature = req.header("x-signature") || "";
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

    if (!crypto.timingSafeEqual(hmacBuf, sigBuf)) {
      return res
        .status(401)
        .json({ ok: false, error: "invalid_signature" });
    }

    return next();
  } catch (err) {
    console.error("verifySignature error:", err);
    return res.status(400).json({ ok: false, error: "bad_request" });
  }
}

// ===== ROUTE CƠ BẢN CHO FRONTEND =====

// Health check
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// Menu
app.get("/menu", (req, res) => {
  res.json(menuItems);
});

// Feedback
app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};
  const item = {
    id: String(Date.now()),
    name: name || "Anonymous",
    message: message || "",
    createdAt: new Date().toISOString()
  };
  feedbacks.push(item);
  res.status(201).json(item);
});

// Contact
app.get("/contact", (req, res) => {
  res.json(contacts);
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  const item = {
    id: String(Date.now()),
    name: name || "",
    email: email || "",
    message: message || "",
    createdAt: new Date().toISOString()
  };
  contacts.push(item);
  res.status(201).json(item);
});

// ===== ROUTE CHO ADMIN (GIẢ LẬP) =====

app.get("/admin/inbox", (req, res) => {
  res.json(inboxMessages);
});

app.get("/admin/kpi", (req, res) => {
  res.json(kpis);
});

// ===== WEBHOOK /webhook/publish =====

app.post("/webhook/publish", verifySignature, (req, res) => {
  console.log("Webhook nhận payload:", req.body);

  // Ví dụ: nếu event = published thì đẩy message vào inbox (cho vui)
  if (req.body && req.body.event === "published") {
    inboxMessages.push({
      id: String(Date.now()),
      sender: "Webhook",
      message: `Post ${req.body.id || "unknown"} đã published`,
      createdAt: new Date().toISOString()
    });
  }

  res.json({ ok: true, received: req.body });
});

// ===== Khởi động server =====

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`API chạy cổng ${PORT}`);
});
