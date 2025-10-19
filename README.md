# Web App Truyền thông Đa Kênh — Sprint 0 (Demo Flow)

> Mục tiêu: có **flow demo** chạy được dù chưa tích hợp API thật** để thuyết trình.

## 1) Chạy nhanh bằng Docker
```bash
cp .env.example .env        # Windows CMD: copy .env.example .env
docker compose up -d --build
# FE: http://localhost:5173
# BE: http://localhost:3000
```

## 2) Nếu không dùng Docker
**Terminal A (Backend)**
```bash
cd backend
npm install
npm start
```
**Terminal B (Frontend)**
```bash
cd frontend
npm install
npm run dev -- --host
```

## 3) API mẫu (fake)
- `POST /schedule` — lên lịch (trả về id demo)
- `POST /messages/webhook` — nhận sự kiện giả (ok)
- `GET /kpi?channel=facebook&range=7d` — trả dữ liệu KPI giả

## 4) Thư mục
- `frontend/` Vite React skeleton (routes: /compose, /calendar, /inbox, /dashboard)
- `backend/` Express với 3 endpoint giả
- `docs/` (đặt PNG/PUML sơ đồ)
- `postman/` Postman collection sẵn import

## 5) Biến môi trường
Xem `.env.example`. Ở Sprint 0 **để trống token**.

## 6) Flow demo (dữ liệu giả)
1) **Compose** → nhấn **Schedule** (gọi `/schedule`)  
2) **Inbox** → nhấn **Simulate message** (gọi `/messages/webhook`)  
3) **Dashboard** → auto gọi `/kpi` hiển thị bảng
