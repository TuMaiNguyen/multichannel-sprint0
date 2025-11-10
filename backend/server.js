import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/healthz", (req, res) => res.json({ ok: true }));

const menu = [
  { id: 1, name: "Bánh Mousse Dâu", price: 79000 },
  { id: 2, name: "Tiramisu", price: 89000 },
  { id: 3, name: "Bông Lan Trứng Muối", price: 99000 },
  { id: 4, name: "Macaron Mix (6 cái)", price: 59000 },
  { id: 5, name: "Su kem Vani", price: 39000 },
  { id: 6, name: "Croissant bơ", price: 29000 },
  { id: 7, name: "Sừng bò phô mai", price: 39000 },
  { id: 8, name: "Baguette", price: 22000 },
  { id: 9, name: "Set trà & bánh", price: 129000 },
  { id:10, name: "Cookie socola chip", price: 19000 },
  { id:11, name: "Mille-feuille", price: 79000 },
  { id:12, name: "Cheesecake việt quất", price: 99000 },
];

app.get("/menu", (req, res) => res.json(menu));

const info = {
  name: "Sweet Heaven Bakery",
  address: "159 Đào Duy Anh, phường Đức Nhuận, TP.HCM",
  phone: "090-123-4567",
  email: "hello@sweetheaven.vn",
  openingHours: "08:00–21:00",
};
app.get("/contact", (req, res) => res.json(info));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API up on " + PORT));
