import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "dev_secret";

// Middleware kiểm tra chữ ký
function verifySignature(req, res, next) {
  const signature = req.header("x-signature") || "";
  const payload = JSON.stringify(req.body || {});
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET).update(payload).digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature))) {
    return next();
  }

  return res.status(401).json({ ok: false, error: "invalid_signature" });
}

// Route test hệ thống
app.get("/healthz", (req, res) => {
  res.json({ ok: true });
});

// ========================
// 📌 WEBHOOK CHÍNH TẠI ĐÂY
// ========================
app.post("/webhook/publish", verifySignature, (req, res) => {
  console.log("Webhook nhận payload:", req.body);

  // ví dụ payload gửi từ Git Bash:
  // { event: "published", id: "test" }

  res.json({ ok: true, received: req.body });
});

// ========================
app.listen(10000, () => {
  console.log("API chạy cổng 10000");
});
