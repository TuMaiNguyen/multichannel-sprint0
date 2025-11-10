// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000;
app.use(cors());

// data mẫu – nếu bạn đã có backend/data.json thì giữ nguyên require đường dẫn đó
const data = require('./data.json'); // { menu: [...], contact: {...} }

// health
app.get('/healthz', (req, res) => res.send('OK'));
app.get('/', (req, res) => res.json({ name: 'Sweet Heaven API', ok: true }));

// routes có /api
app.get('/api/menu', (req, res) => res.json(data.menu || []));
app.get('/api/contact', (req, res) => res.json(data.contact || {}));

// routes không /api (để FE cũ cũng chạy được)
app.get('/menu', (req, res) => res.json(data.menu || []));
app.get('/contact', (req, res) => res.json(data.contact || {}));

app.listen(PORT, () => {
  console.log(`Mock API on http://localhost:${PORT}`);
});
