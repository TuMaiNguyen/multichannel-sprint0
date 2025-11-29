// frontend/src/pages/public/CartPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../lib/cart";

const qtyButtonStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "999px",
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  cursor: "pointer",
  lineHeight: 1,
};

export default function CartPage() {
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!items.length) return;
    navigate("/checkout");
  };

  if (!items.length) {
    return (
      <main className="page page-cart" style={{ padding: "40px 24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            marginBottom: "16px",
          }}
        >
          Giỏ hàng của bạn
        </h1>
        <p>Hiện chưa có món nào trong giỏ.</p>
        <p style={{ marginTop: "12px" }}>
          <Link to="/menu" style={{ color: "#2563eb" }}>
            ← Quay lại menu để chọn món
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page page-cart" style={{ padding: "40px 24px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          marginBottom: "24px",
        }}
      >
        Giỏ hàng của bạn
      </h1>

      <div
        style={{
          maxWidth: "960px",
          marginBottom: "24px",
          borderRadius: "24px",
          background: "#fff",
          boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
          padding: "20px 24px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "16px",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "4px",
                  color: "#111827",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                {item.price.toLocaleString("vi-VN")} đ
              </div>
              <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  style={qtyButtonStyle}
                >
                  –
                </button>
                <span style={{ minWidth: "32px", textAlign: "center" }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                  style={qtyButtonStyle}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  style={{
                    marginLeft: "12px",
                    fontSize: "13px",
                    color: "#ef4444",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
            <div
              style={{
                fontWeight: 700,
                color: "#111827",
                textAlign: "right",
              }}
            >
              {(item.price * item.quantity).toLocaleString("vi-VN")} đ
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "960px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          type="button"
          onClick={clearCart}
          style={{
            border: "none",
            background: "transparent",
            color: "#6b7280",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Xóa hết giỏ hàng
        </button>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "16px",
              color: "#6b7280",
              marginBottom: "4px",
            }}
          >
            Tổng cộng
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#2563eb",
              marginBottom: "12px",
            }}
          >
            {total.toLocaleString("vi-VN")} đ
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(135deg, #2563eb, #22c55e)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 12px 25px rgba(37, 99, 235, 0.45)",
            }}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </main>
  );
}
