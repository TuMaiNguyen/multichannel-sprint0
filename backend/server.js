// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- middlewares
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store'); // chống cache
  next();
});

// --- dữ liệu mock (giữ đơn giản, đủ dùng cho demo)
const menu = [
  { id: 1, name: 'Croissant Bơ', price: 28000, img: 'https://picsum.photos/seed/croissant/400/280' },
  { id: 2, name: 'Baguette',     price: 18000, img: 'https://picsum.photos/seed/baguette/400/280' },
  { id: 3, name: 'Sourdough',    price: 52000, img: 'https://picsum.photos/seed/sourdough/400/280' },
  { id: 4, name: 'Brownie',      price: 32000, img: 'https://picsum.photos/seed/brownie/400/280' },
  { id: 5, name: 'Cheesecake',   price: 49000, img: 'https://picsum.photos/seed/cheesecake/400/280' },
  { id: 6, name: 'Tiramisu',     price: 56000, img: 'https://picsum.photos/seed/tiramisu/400/280' },
  { id: 7, name: 'Cupcake',      price: 25000, img: 'https://picsum.photos/seed/cupcake/400/280' },
  { id: 8, name: 'Cookie Choco', price: 15000, img: 'https://picsum.photos/seed/cookie/400/280' },
  { id: 9, name: 'Mousse Dâu',   price: 45000, img: 'https://picsum.photos/seed/mousse/400/280' },
  { id: 10, name: 'Bánh Mì Sữa', price: 12000, img: 'https://picsum.photos/seed/milk/400/280' },
  { id: 11, name: 'Bánh Flan',   price: 17000, img: 'https://picsum.photos/seed/flan/400/280' },
  { id: 12, name: 'Choux Cream', price: 22000, img: 'https://picsum.photos/seed/choux/400/280' }
];

const contact = {
  address: '159 Đào Duy Anh, Phường 9, Phú Nhuận, TP.HCM',
  phone: '028-1234-5678',
  open: '08:00–21:00'
};

const feedback = [
  { name: 'Mai', message: 'Croissant ngon quá!', at: new Date().toISOString() }
];

// Dữ liệu cho khối Admin
let postId = 1;
const posts = [
  // ví dụ:
  // { id: 1, channel: 'Facebook', content: 'Soft opening 20% OFF', scheduledAt: '2025-11-20T09:00:00Z', status: 'scheduled' }
];

let inboxId = 1;
const inbox = [
  // { id: 1, from: 'khach@example.com', message: 'Có ship nội thành ko?', at: '2025-11-14T03:21:00Z' }
];

// --- health
app.get('/healthz', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// --- public: menu/contact/feedback
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

// --- admin: posts
app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
  const { channel, content, scheduledAt } = req.body || {};
  if (!channel || !content) return res.status(400).json({ error: 'channel & content required' });
  const item = {
    id: postId++,
    channel,
    content,
    scheduledAt: scheduledAt || null,
    status: scheduledAt ? 'scheduled' : 'draft'
  };
  posts.unshift(item);
  res.status(201).json(item);
});

// --- admin: inbox
app.get('/inbox', (req, res) => res.json(inbox));
app.post('/inbox', (req, res) => {
  const { from, message } = req.body || {};
  if (!from || !message) return res.status(400).json({ error: 'from & message required' });
  const item = { id: inboxId++, from, message, at: new Date().toISOString() };
  inbox.unshift(item);
  res.status(201).json(item);
});

// --- admin: kpi (dashboard)
app.get('/kpi', (req, res) => {
  const today = new Date().toDateString();
  const totalPosts = posts.length;
  const scheduled = posts.filter(p => p.status === 'scheduled').length;
  const sent = posts.filter(p => p.status === 'sent').length;
  const inboxToday = inbox.filter(m => new Date(m.at).toDateString() === today).length;
  const feedbackCount = feedback.length;

  res.json({
    totalPosts,
    scheduled,
    sent,
    inboxToday,
    feedbackCount,
    menuItems: menu.length
  });
});

// --- root & 404
app.get('/', (req, res) => res.json({ service: 'Sweet Heaven API', ok: true }));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
