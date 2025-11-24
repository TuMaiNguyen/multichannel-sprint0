// backend/server.js  (CommonJS)

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 10000;

// ----- Middlewares
app.use(cors());
app.use(express.json());

// ----- In-memory stores (demo)
const menu = [
  { id: 'm1', name: 'Croissant Bơ', price: 25000, desc: 'Bơ thơm, lớp vỏ giòn.' },
  { id: 'm2', name: 'Bánh Mì Sourdough', price: 45000, desc: 'Men tự nhiên, tốt cho tiêu hoá.' },
  { id: 'm3', name: 'Brioche Trứng', price: 38000, desc: 'Mềm ẩm, thơm sữa.' },
];

const feedback = [
  { id: 'fb1', name: 'Mai', message: 'Croissant ngon quá!', createdAt: new Date().toISOString() },
];

const posts = [];        // { id, title, content, channel, status, createdAt }
const inbox = [];        // { id, sender, message, createdAt }
const kpi = [];          // { id, metric, value, capturedAt }

// ----- Public endpoints (đã dùng ở FE)
app.get('/healthz', (req, res) => res.json({ ok: true }));
app.get('/menu',    (req, res) => res.json(menu));
app.get('/contact', (req, res) => res.json({
  address: '159 Đào Duy Anh, P.9, Phú Nhuận, TP.HCM',
  phone: '028-1234-5678',
  hours: '08:00–21:00',
}));

app.get('/feedback', (req, res) => res.json(feedback));
app.post('/feedback', (req, res) => {
  const { name, message } = req.body || {};
  const item = { id: `fb_${Date.now()}`, name, message, createdAt: new Date().toISOString() };
  feedback.unshift(item);
  res.status(201).json({ ok: true, item });
});

// ----- Admin demo endpoints
app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
  const { title, content, channel } = req.body || {};
  const item = {
    id: `post_${Date.now()}`,
    title, content, channel,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
  posts.unshift(item);
  res.status(201).json({ ok: true, item });
});

app.get('/inbox', (req, res) => res.json(inbox));
app.post('/inbox', (req, res) => {
  const { sender, message } = req.body || {};
  const item = { id: `in_${Date.now()}`, sender, message, createdAt: new Date().toISOString() };
  inbox.unshift(item);
  res.status(201).json({ ok: true, item });
});

app.get('/kpi', (req, res) => res.json(kpi));
app.post('/kpi', (req, res) => {
  const { metric, value } = req.body || {};
  const item = { id: `kpi_${Date.now()}`, metric, value: Number(value || 0), capturedAt: new Date().toISOString() };
  kpi.unshift(item);
  res.status(201).json({ ok: true, item });
});

// ===== Webhook (HMAC SHA-256) =====
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'dev_secret';

function verifySignature(req, res, next) {
  const sig = req.header('x-signature') || '';
  const payload = JSON.stringify(req.body || {});
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('hex');

  // tránh exception khi độ dài khác nhau
  if (!sig || sig.length !== hmac.length) {
    return res.status(401).json({ ok: false, error: 'invalid_signature' });
  }
  const ok = crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sig));
  if (!ok) return res.status(401).json({ ok: false, error: 'invalid_signature' });
  next();
}

// Ví dụ: publish post -> đổi status sang 'published'
app.post('/webhook/publish', verifySignature, (req, res) => {
  const { event, id } = req.body || {};
  if (event === 'published' && id) {
    const idx = posts.findIndex(p => p.id === id);
    if (idx > -1) posts[idx].status = 'published';
  }
  res.json({ ok: true });
});

// ----- Start
app.listen(PORT, () => {
  console.log(`API running on :${PORT}`);
});
