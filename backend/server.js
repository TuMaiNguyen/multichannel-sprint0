// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---- Health ----
app.get('/healthz', (_req, res) => res.json({ ok: true }));

// ---- Menu 12 món ----
const menu = [
  { id: 1, name: 'Croissant Bơ', price: 25000 },
  { id: 2, name: 'Pain Au Chocolat', price: 32000 },
  { id: 3, name: 'Bánh Mì Sourdough', price: 45000 },
  { id: 4, name: 'Baguette', price: 18000 },
  { id: 5, name: 'Cheesecake Dâu', price: 55000 },
  { id: 6, name: 'Tiramisu', price: 52000 },
  { id: 7, name: 'Mousse Matcha', price: 48000 },
  { id: 8, name: 'Bánh Su Kem', price: 15000 },
  { id: 9, name: 'Macaron Mix', price: 60000 },
  { id:10, name: 'Danish Táo', price: 30000 },
  { id:11, name: 'Cinnamon Roll', price: 28000 },
  { id:12, name: 'Choux Vani', price: 14000 },
];
app.get('/menu', (_req, res) => res.json(menu));

// ---- Contact ----
app.get('/contact', (_req, res) => {
  res.json({
    address: '159 Đào Duy Anh, Phường 9, Phú Nhuận, TP.HCM',
    phone: '028-1234-5678',
    open: '08:00–21:00'
  });
});

// ---- Feedback (demo) ----
const feedback = [{ name: 'Mai', message: 'Croissant ngon quá!', at: new Date().toISOString() }];
app.get('/feedback', (_req, res) => res.json(feedback));
app.post('/feedback', (req, res) => {
  const { name = 'Ẩn danh', message = '' } = req.body || {};
  const item = { name, message, at: new Date().toISOString() };
  feedback.push(item);
  res.status(201).json(item);
});

// =========================
//      ADMIN ENDPOINTS
// =========================

// Posts (soạn bài & lên lịch) — in-memory
const posts = []; // {id,title,channels,content,scheduledAt,status}
app.get('/posts', (_req, res) => res.json(posts));
app.post('/posts', (req, res) => {
  const { title, channels = [], content = '', scheduledAt = '' } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const post = {
    id: Date.now(),
    title,
    channels,
    content,
    scheduledAt,
    status: scheduledAt ? 'Scheduled' : 'Draft'
  };
  posts.push(post);
  res.status(201).json(post);
});

// Inbox (tin nhắn đa kênh) — mock
const inbox = [
  { id: 1, from: 'Facebook | Lan', message: 'Hôm nay có bánh mới không ạ?', ts: new Date().toISOString() },
  { id: 2, from: 'Zalo | Minh', message: 'Cho em xin menu tiramisu', ts: new Date().toISOString() },
];
app.get('/inbox', (_req, res) => res.json(inbox));
app.post('/inbox/:id/reply', (req, res) => {
  const { id } = req.params;
  const { message = '' } = req.body || {};
  // mock acknowledge
  res.json({ ok: true, repliedTo: Number(id), message });
});

// KPI dashboard — tính nhanh từ posts/inbox
app.get('/kpi', (_req, res) => {
  const scheduled = posts.filter(p => p.status === 'Scheduled').length;
  const draft = posts.filter(p => p.status === 'Draft').length;
  res.json({
    scheduled,
    draft,
    messagesToday: inbox.length,
    engagementRate: 4.2
  });
});

// ---- Start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
