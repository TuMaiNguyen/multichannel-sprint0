import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => res.json({ ok: true }));

// --- DATA ---
const menu = [
  { id: 1, name: "Bánh Mousse Dâu", price: 79000 },
  { id: 2, name: "Tiramisu", price: 89000 },
  { id: 3, name: "Bông Lan Trứng Muối", price: 99000 },
  { id: 4, name: "Croissant Bơ", price: 39000 },
  { id: 5, name: "Macaron Mix Vị", price: 69000 },
  { id: 6, name: "Cheesecake Chanh Dây", price: 99000 },
  { id: 7, name: "Red Velvet Cupcake", price: 45000 },
  { id: 8, name: "Bánh Flan Caramel", price: 29000 },
  { id: 9, name: "Brownie Socola", price: 49000 },
  { id:10, name: "Bánh Quy Bơ", price: 25000 },
  { id:11, name: "Mochi Kem Trà Xanh", price: 55000 },
  { id:12, name: "Tart Trái Cây", price: 85000 },
];

const contact = {
  name: "Sweet Heaven Bakery",
  address: "159 Đào Duy Anh, phường Đức Nhuận, TP.HCM",
  phone: "090-123-4567",
  email: "hello@sweetheaven.vn",
  openingHours: "08:00–21:00",
};

const feedbacks = []; // in-memory

// --- API ---
app.get("/menu", (req, res) => res.json(menu));
app.get("/contact", (req, res) => res.json(contact));

app.post("/feedback", (req, res) => {
  const fb = { id: Date.now(), ...req.body };
  feedbacks.push(fb);
  res.status(201).json({ ok: true, id: fb.id });
});
app.get("/feedback", (req, res) => res.json(feedbacks));

// --- START ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on", PORT));
