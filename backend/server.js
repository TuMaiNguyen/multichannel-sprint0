const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "data.json");
const readDB = () => {
  try { return JSON.parse(fs.readFileSync(DB_PATH, "utf8")); }
  catch { return { menu: [], contact: {}, feedback: [] }; }
};
const writeDB = (data) =>
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.get("/menu", (_req, res) => {
  const db = readDB();
  res.json(db.menu || []);
});

app.get("/contact", (_req, res) => {
  const db = readDB();
  res.json(db.contact || {});
});

app.get("/feedback", (_req, res) => {
  const db = readDB();
  res.json(db.feedback || []);
});

app.post("/feedback", (req, res) => {
  const db = readDB();
  db.feedback = db.feedback || [];
  db.feedback.push({ id: Date.now(), ...req.body });
  writeDB(db);
  res.status(201).json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API up on ${PORT}`));
