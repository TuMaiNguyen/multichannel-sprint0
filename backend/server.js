// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---- mock data (in-memory) ----
const menu = [
  { id: 1, name: "Croissant bơ", price: 25000 },
  { id: 2, name: "Bánh mì sữa", price: 15000 },
  { id: 3, name: "Tiramisu", price: 42000 },
];

let feedback = [
  { name: "Mai", message: "Croissant ngon quá!", at: "2025-11-11T14:07:47.018Z" }
];

let posts = []; // bài đăng (admin/Compose)
let inbox = []; // tin nhắn khách (admin/Inbox)
let kpi = { posts: 0, messages: 0, lastUpdated: null };

// ---- helpers ----
const touchKpi = () => { kpi.lastUpdated = new Date().toISOString(); };

// ---- public endpoints (đang dùng) ----
app.get("/healthz", (req, res) => res.json({ ok: true }));

app.get("/menu", (req, res) => res.json(menu));

app.get("/contact", (req, res) => {
  res.json({
    address: "159 Đào Duy Anh, Phường 9, Phú Nhuận, TP.HCM",
    phone: "028-1234-5678",
    open: "08:00–21:00",
  });
});

app.get("/feedback", (req, res) => res.json(feedback));
app.post("/feedback", (req, res) => {
  const { name, message } = req.body || {};
  if (!name || !message) return res.status(400).json({ error: "name & message required" });
  const item = { name, message, at: new Date().toISOString() };
  feedback.unshift(item);
  touchKpi();
  res.status(201).json(item);
});

// ---- NEW: admin endpoints ----
// 1) Bài đăng
app.get("/posts", (req, res) => res.json(posts));
app.post("/posts", (req, res) => {
  const { title, body, channel = "Facebook" } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: "title & body required" });
  const item = { id: Date.now(), title, body, channel, at: new Date().toISOString() };
  posts.unshift(item);
  kpi.posts = posts.length;
  touchKpi();
  res.status(201).json(item);
});

// 2) Hộp thư khách hàng
app.get("/inbox", (req, res) => res.json(inbox));
app.post("/inbox", (req, res) => {
  const { from, message } = req.body || {};
  if (!from || !message) return res.status(400).json({ error: "from & message required" });
  const item = { id: Date.now(), from, message, at: new Date().toISOString() };
  inbox.unshift(item);
  kpi.messages = inbox.length;
  touchKpi();
  res.status(201).json(item);
});

// 3) KPI dashboard
app.get("/kpi", (req, res) => res.json(kpi));

// Trang gốc: liệt kê endpoint cho dễ test
app.get("/", (req, res) => {
  res.json({
    ok: true,
    endpoints: ["/healthz", "/menu", "/contact", "/feedback (GET|POST)", "/posts (GET|POST)", "/inbox (GET|POST)", "/kpi"]
  });
});

// ---- start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on :${PORT}`);
});
