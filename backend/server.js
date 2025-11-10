// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// --- DATA ---
const menu = [
  { id: 1, name: "Bánh Mousse Dâu", price: 79000 },
  { id: 2, name: "Tiramisu", price: 89000 },
  { id: 3, name: "Bông Lan Trứng Muối", price: 99000 },
  { id: 4, name: "Bánh Su Kem", price: 29000 },
  { id: 5, name: "Bánh Mì Bơ Tỏi", price: 19000 },
  { id: 6, name: "Croissant Bơ", price: 35000 },
  { id: 7, name: "Cheesecake Chanh Dây", price: 89000 },
  { id: 8, name: "Red Velvet", price: 99000 },
  { id: 9, name: "Macaron Mix", price: 59000 },
  { id: 10, name: "Cookie Sô-cô-la", price: 25000 },
  { id: 11, name: "Bánh Flan Caramel", price: 22000 },
  { id: 12, name: "Tart Trái Cây", price: 65000 },
];

const contact = {
  name: "Sweet Heaven Bakery",
  address: "159 Đào Duy Anh, phường Đức Nhuận, TP.HCM",
  phone: "090-123-4567",
  email: "hello@sweetheaven.vn",
  openingHours: "08:00–21:00",
};

const feedbacks = []; // in-memory

// --- ROUTES ---
app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.get("/menu", (_req, res) => res.json(menu));

app.get("/contact", (_req, res) => res.json(contact));

app.get("/feedback", (_req, res) => res.json(feedbacks));

app.post("/feedback", (req, res) => {
  const { name, message, rating } = req.body || {};
  const fb = {
    id: Date.now(),
    name: name || "Ẩn danh",
    message: message || "",
    rating: rating != null ? Number(rating) : null,
    createdAt: new Date().toISOString(),
  };
  feedbacks.push(fb);
  res.status(201).json({ ok: true, feedback: fb });
});

app.listen(PORT, () => console.log(`API listening on ${PORT}`));
