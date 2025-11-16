// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- demo dữ liệu sẵn có ---
const menu = [
  { id: 1, name: 'Croissant Bơ', price: 25000 },
  { id: 2, name: 'Baguette', price: 15000 },
  { id: 3, name: 'Tiramisu Mini', price: 38000 },
];

const contact = {
  address: '159 Đào Duy Anh, Phường 9, Phú Nhuận, TP.HCM',
  phone: '028-1234-5678',
  open: '08:00–21:00'
};

let feedback = [
  { name: 'Mai', message: 'Croissant ngon quá!', at: new Date().toISOString() }
];

// ---- NEW: dữ liệu phục vụ trang Admin ----
let posts = [
  // ví dụ: { id:'p_1731', channel:'facebook', title:'Ra mắt bánh mới', body:'…', at:'2025-11-15T02:00:00Z' }
];

let inbox = [
  // ví dụ: { id:'m_1001', from:'@tiktok', subject:'Comment mới', body:'User X khen bánh', at:'2025-11-15T02:10:00Z' }
];

// KPI tính từ dữ liệu trên (demo)
const calcKpi = () => ({
  totalPosts: posts.length,
  totalMessages: inbox.length,
  lastPostAt: posts[0]?.at || null,
  lastMsgAt: inbox[0]?.at || null
});

// --------- HEALTH ---------
app.get('/healthz', (req, res) => res.json({ ok: true }));

// --------- PUBLIC ---------
app.get('/menu', (req, res) => res.json(menu));
app.get('/contact', (req, res) => res.json(contact));
app.get('/feedback', (req, res) => res.json(feedback));
app.post('/feedback', (req, res) => {
  const { name, message } = req.body || {};
  if (!name || !message) return res.status(400).json({ error: 'name & message required' });
  const item = { name, message, at: new Date().toISOString() };
  feedback.unshift(item);
  res.status(201).json(item);
});

// --------- ADMIN: POSTS ---------
app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
  const { title, body, channel } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title required' });
  const item = {
    id: `p_${Date.now()}`,
    title,
    body: body || '',
    channel: channel || 'facebook',
    at: new Date().toISOString()
  };
  posts.unshift(item);
  res.status(201).json(item);
});
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const before = posts.length;
  posts = posts.filter(p => p.id !== id);
  if (posts.length === before) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// --------- ADMIN: INBOX ---------
app.get('/inbox', (req, res) => res.json(inbox));
app.post('/inbox', (req, res) => {
  const { from, subject, body } = req.body || {};
  if (!from || !subject) return res.status(400).json({ error: 'from & subject required' });
  const item = { id: `m_${Date.now()}`, from, subject, body: body || '', at: new Date().toISOString() };
  inbox.unshift(item);
  res.status(201).json(item);
});
app.delete('/inbox/:id', (req, res) => {
  const { id } = req.params;
  const before = inbox.length;
  inbox = inbox.filter(m => m.id !== id);
  if (inbox.length === before) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

// --------- ADMIN: KPI ---------
app.get('/kpi', (req, res) => res.json(calcKpi()));

// --------- START ---------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`API running on :${PORT}`);
});
