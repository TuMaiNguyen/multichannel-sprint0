#!/usr/bin/env bash

BASE_URL="http://localhost:10000"

echo "=== API SMOKE TESTS ==="

echo -e "\n[API-01] GET /healthz"
curl -i "$BASE_URL/healthz"
echo -e "\n------------"

echo -e "\n[API-02] GET /menu"
curl -i "$BASE_URL/menu"
echo -e "\n------------"

echo -e "\n[API-03] GET /contact"
curl -i "$BASE_URL/contact"
echo -e "\n------------"

echo -e "\n[API-04] POST /feedback (valid)"
curl -i -X POST "$BASE_URL/feedback" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Feedback from script"}'
echo -e "\n------------"
