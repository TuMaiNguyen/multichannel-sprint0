import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

let menu = [
  { id: 1, name: "Bánh Mousse Dâu", price: 79000 },
  { id: 2, name: "Tiramisu", price: 89000 },
  { id: 3, name: "Bông Lan Trứng Muối", price: 99000 },
  { id: 4, name: "Cheesecake Chanh Dây", price: 89000 },
  { id: 5, name: "Caramel Flan", price: 39000 },
  { id: 6, name: "Bánh Sừng Bò Bơ", price: 29000 },
  { id: 7, name: "Bánh Quy Hạnh Nhân", price: 49000 },
  { id: 8, name: "Mochi Kem Trà Xanh", price: 59000 },
  { id: 9, name: "Cupcake Socola", price: 45000 },
  { id:10, name: "Bánh Cuộn Matcha", price: 65000 },
  { id:11, name: "Tart Trái Cây", price: 85000 },
  { id:12, name: "Choux Kem Vanilla", price: 35000 },
];

let contact = {
  name: "Sweet Heaven Bakery",
  address: "159 Đào Duy Anh, phường Đức Nhuận, TP.HCM",
  phone: "090-123-4567",
  email: "hello@sweetheaven.vn",
  openingHours: "08:00–21:00",
};

const feedbacks = []; // in-memory

app.get("/healthz", (_, res) => res.json({ ok: true }));
app.get("/menu",    (_, res) => res.json(menu));
app.get("/contact", (_, res) => res.json(contact));

app.get("/feedback", (req, res) => {
  const limit = Number(req.query.limit || 50);
  res.json(feedbacks.slice(-limit).reverse());
});

app.post("/feedback", (req, res) => {
  const { name, phone, message } = req.body || {};
  if (!name || !message) return res.status(400).json({ error: "Thiếu name hoặc message" });
  feedbacks.push({ id: Date.now(), name, phone: phone || "", message, at: new Date().toISOString() });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on :${PORT}`));
