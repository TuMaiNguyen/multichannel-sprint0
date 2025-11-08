// backend/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// CORS: cho phép tất cả hoặc giới hạn bằng biến môi trường
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// ---- Load data từ data.json (nếu có), fallback là mảng mặc định) ----
const dataFile = path.join(__dirname, "data.json");
let products = [];
try {
  if (fs.existsSync(dataFile)) {
    const raw = fs.readFileSync(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    products = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.products)
      ? parsed.products
      : [];
  }
} catch (e) {
  console.error("Không đọc được data.json, dùng dữ liệu mặc định.", e);
}

if (!Array.isArray(products) || products.length === 0) {
  products = [
    {
      id: 1,
      name: "Mousse Dâu Pastel",
      price: 69000,
      tags: ["mousse", "dâu"],
      image:
        "https://images.unsplash.com/photo-1541976076758-347942db197b?q=80&w=1200",
      desc: "Cốt chiffon ẩm, mousse dâu nhẹ, phủ kem phô mai tươi.",
    },
    {
      id: 2,
      name: "Macaron Mix 6",
      price: 99000,
      tags: ["macaron"],
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200",
      desc:
        "Set 6 vị pastel: vani, dâu, chanh, việt quất, matcha, socola.",
    },
    {
      id: 3,
      name: "Tiramisu Lạnh",
      price: 79000,
      tags: ["tiramisu", "cà phê"],
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d58afed61?q=80&w=1200",
      desc:
        "Kem mascarpone béo nhẹ, mùi cà phê thơm, rắc cacao.",
    },
    {
      id: 4,
      name: "Cheesecake Chanh Dây",
      price: 85000,
      tags: ["cheesecake", "chanh dây"],
      image:
        "https://images.unsplash.com/photo-16066313564200-e75d5e30476e?q=80&w=1200",
      desc:
        "Lớp phô mai mịn, sốt passion fruit chua dịu.",
    },
    {
      id: 5,
      name: "Croissant Bơ AOP",
      price: 45000,
      tags: ["viennoiserie"],
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200",
      desc:
        "Lớp bánh nhiều tầng giòn rụm, bơ thơm.",
    },
    {
      id: 6,
      name: "Roll Cake Trà Xanh",
      price: 59000,
      tags: ["roll", "matcha"],
      image:
        "https://images.unsplash.com/photo-1559622214-f8a9855d4f3f?q=80&w=1200",
      desc:
        "Bánh cuộn matcha kem tươi, ngọt vừa.",
    },
    {
      id: 7,
      name: "Banana Bread Hạnh Nhân",
      price: 52000,
      tags: ["quickbread"],
      image:
        "https://images.unsplash.com/photo-1599785209793-381a6a5b49df?q=80&w=1200",
      desc:
        "Chuối chín thơm, hạt bùi, ăn sáng tuyệt.",
    },
    {
      id: 8,
      name: "Panna Cotta Dâu",
      price: 49000,
      tags: ["pudding"],
      image:
        "https://images.unsplash.com/photo-1604908812743-bf5c2b9a2fd7?q=80&w=1200",
      desc:
        "Panna cotta mềm mượt, coulis dâu chua ngọt.",
    },
  ];
}

// ---- Routes ----
app.get("/", (_req, res) =>
  res.type("text").send("Sweet Heaven API is running. Try /products or /healthz")
);

app.get("/healthz", (_req, res) => res.status(200).send("OK"));

app.get("/products", (_req, res) => res.json(products));

// thêm (nếu chưa có):
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// luôn dùng PORT do Render cấp và BIND 0.0.0.0
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock API listening on 0.0.0.0:${PORT}`);
});
