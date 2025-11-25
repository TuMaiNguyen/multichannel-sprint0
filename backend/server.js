// backend/server.js
// Phiên bản đơn giản: không kiểm tra chữ ký HMAC nữa,
// chỉ nhận webhook và trả lại payload để dùng cho demo / báo cáo.

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ======================
// DỮ LIỆU GIẢ LẬP TRONG RAM
// ======================

// Menu demo cho trang Menu
const menuItems = [
  {
    id: "cake_01",
    name: "Strawberry Heaven",
    description: "Bánh dâu kem tươi signature của Sweet Heaven.",
    price: 45000,
    channel: "Facebook",
  },
  {
    id: "cake_02",
    name: "Chocolate Cloud",
    description: "Bánh socola mousse mềm mịn, best-seller tại quán.",
    price: 49000,
    channel: "Instagram",
  },
  {
    id: "drink_01",
    name: "Cold Brew Caramel",
    description: "Cold brew caramel nhẹ nhàng, hợp uống cùng bánh ngọt.",
    price: 39000,
    channel: "Zalo",
  },
];

// Feedback + inbox & KPI demo cho trang Admin
const feedbackList = [];
const inboxMessages = [];
const kpiList = [];

// ======================
// ROUTES PUBLIC
// ======================

// Kiểm tra hệ thống
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// Menu cho trang /menu
app.get("/menu", (req, res) => {
  res.json({ items: menuItems });
});

// Thông tin liên hệ cho trang /contact
app.get("/contact", (req, res) => {
  res.json({
    channels: [
      {
        id: "facebook",
        type: "facebook",
        label: "Facebook Page",
        url: "https://facebook.com",
      },
      {
        id: "zalo",
        type: "zalo",
        label: "Zalo OA",
        url: "https://zalo.me",
      },
      {
        id: "hotline",
        type: "phone",
        label: "Hotline",
        value: "1900 123 456",
      },
    ],
    supportHours: "08:00 – 21:00, Thứ 2 – Chủ nhật",
  });
});

// Lấy danh sách feedback (cho report / admin)
app.get("/feedback", (req, res) => {
  res.json({ items: feedbackList });
});

// Gửi feedback từ trang /feedback
app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const fb = {
    id,
    name: name || "Ẩn danh",
    message: message || "",
    createdAt,
  };

  feedbackList.push(fb);

  // Đẩy luôn vào inbox demo cho Admin
  inboxMessages.push({
    id,
    sender: fb.name,
    message: fb.message,
    createdAt,
  });

  res.status(201).json({ ok: true, item: fb });
});

// ======================
// ROUTES ADMIN DEMO
// ======================

// Hộp thư admin
app.get("/admin/inbox", (req, res) => {
  res.json({ items: inboxMessages });
});

// KPI demo
app.get("/admin/kpi", (req, res) => {
  res.json({ items: kpiList });
});

// ======================
// WEBHOOK /publish (KHÔNG HMAC)
// ======================

app.post("/webhook/publish", (req, res) => {
  console.log("Webhook received payload:", req.body);

  // Trả về đúng format em cần cho báo cáo
  res.json({
    ok: true,
    received: req.body,
  });
});

// ======================
// 404 MẶC ĐỊNH
// ======================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "not_found",
    path: req.path,
  });
});

// ======================
// START SERVER
// ======================

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
