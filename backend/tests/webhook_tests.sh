#!/usr/bin/env bash

# Backend local
BASE_URL="http://localhost:10000"
SECRET="sh_dev_2025_mai"

# Body JSON PHẢI GIỐNG Y HỆ THỐNG DÙNG ĐỂ TÍNH HMAC
BODY='{"event":"published","id":"test","message":"Hello from webhook","channel":"FACEBOOK"}'

# Tính chữ ký HMAC bằng Node (có sẵn trong môi trường dev)
SIG=$(node -e "const crypto=require('crypto');const s=process.argv[1];const b=process.argv[2];const h=crypto.createHmac('sha256',s).update(b).digest('hex');console.log(h);" "$SECRET" "$BODY")

echo "=== WEBHOOK TESTS ==="

echo -e "\n[WB-01] POST /webhook/publish - chữ ký HỢP LỆ"
curl -i -X POST "$BASE_URL/webhook/publish" \
  -H "Content-Type: application/json" \
  -H "x-signature: $SIG" \
  -d "$BODY"
echo -e "\n------------"

echo -e "\n[WB-02] POST /webhook/publish - THIẾU x-signature"
curl -i -X POST "$BASE_URL/webhook/publish" \
  -H "Content-Type: application/json" \
  -d "$BODY"
echo -e "\n------------"

echo -e "\n[WB-03] POST /webhook/publish - CHỮ KÝ SAI"
curl -i -X POST "$BASE_URL/webhook/publish" \
  -H "Content-Type: application/json" \
  -H "x-signature: 1234567890abcdef" \
  -d "$BODY"
echo -e "\n------------"

echo -e "\n[WB-04] GET /admin/events sau khi test"
curl -i "$BASE_URL/admin/events"
echo -e "\n------------"

echo -e "\n[WB-05] GET /admin/stats sau khi test"
curl -i "$BASE_URL/admin/stats"
echo -e "\n------------"
