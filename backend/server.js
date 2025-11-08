// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Cho phép gọi API từ local dev và từ GitHub Pages của bạn
const ALLOW_ORIGINS = [
  'http://localhost:5173',
  'https://tumainguyen.github.io' // Pages domain (repo path không cần)
];
app.use(
  cors({
    origin: (origin, cb) => {
      // Cho phép origin rỗng khi chạy curl/health check
      if (!origin) return cb(null, true);
      if (ALLOW_ORIGINS.some((o) => origin.startsWith(o))) return cb(null, true);
      return cb(null, false);
    }
  })
);

app.use(express.json());

// Đường dẫn đến data.json
const DATA_FILE = path.join(__dirname, 'data.json');

// Endpoint đơn giản để kiểm tra sống
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Sweet Heaven Bakery API' });
});

// Trả danh sách sản phẩm
app.get('/products', (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const products = Array.isArray(parsed) ? parsed : parsed.products;
    res.json(products || []);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Cannot read data.json' });
  }
});

// PORT lấy từ Render/Cloud, fallback 3001 khi chạy local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mock API on http://localhost:${PORT}`);
});
