// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS + JSON + tắt cache để không bị 304/giữ dữ liệu cũ
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

const menu = [
  { id: 1,  name: 'Bánh Mousse Dâu',            price: 79000 },
  { id: 2,  name: 'Tiramisu',                   price: 89000 },
  { id: 3,  name: 'Bông Lan Trứng Muối',       price: 99000 },
  { id: 4,  name: 'Croissant Bơ',               price: 29000 },
  { id: 5,  name: 'Pain Au Chocolat',           price: 35000 },
  { id: 6,  name: 'Bánh Su Kem',                price: 25000 },
  { id: 7,  name: 'Cheesecake Blueberry',       price: 99000 },
  { id: 8,  name: 'Bánh Flan Caramel',          price: 22000 },
  { id: 9,  name: 'Bông Lan Cuộn Matcha',       price: 65000 },
  { id: 10, name: 'Macaron Mix (6 cái)',        price: 59000 },
  { id: 11, name: 'Bánh Quy Bơ (hộp)',          price: 45000 },
  { id: 12, name: 'Bánh Mì Sourdough',          price: 65000 },
  { id: 13, name: 'Bánh Mì Bơ Tỏi',             price: 39000 },
  { id: 14, name: 'Banana Bread',               price: 55000 },
  { id: 15, name: 'Panna Cotta Dâu',            price: 49000 },
];

const contact = {
  name: 'Sweet Heaven Bakery',
  // giữ đúng câu bạn yêu cầu
  address: '159 Đào Duy Anh, phường Đức Nhuận, TP.HCM',
  phone: '090-123-4567',
  email: 'hello@sweetheaven.vn',
  openingHours: '08:00–21:00',
};

// health check
app.get('/healthz', (req, res) => res.json({ ok: true }));

// APIs
app.get('/menu', (req, res) => res.json(menu));
app.get('/contact', (req, res) => res.json(contact));

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Sweet Heaven API listening on ' + PORT);
});
