// frontend/src/lib/format.js
export function formatCurrency(value) {
  if (typeof value !== "number") return "";
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
}
