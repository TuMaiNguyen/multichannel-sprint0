// frontend/src/pages/public/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MENU_ITEMS, formatPrice, getProductById } from "../../lib/menuData";

export default function Cart({ cart, updateQuantity, removeItem, clearCart }) {
  const navigate = useNavigate();

  const items = cart
    .map((entry) => {
      const product = getProductById(entry.id);
      if (!product) return null;
      return { ...entry, product };
    })
    .filter(Boolean);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const handleGoCheckout = () => {
    if (!items.length) return;
    navigate("/checkout");
  };

  return (
    <main>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 800,
          marginBottom: "24px",
          color: "#111827",
        }}
      >
        Giỏ hàng của bạn
      </h1>

      {!items.length && (
        <div>
          <p style={{ fontSize: "15px", color: "#4b5563", marginBottom: "12px" }}>
            Giỏ hàng đang trống. Hãy chọn vài chiếc bánh ngon nhé!
          </p>
          <Link to="/menu" style={{ color: "#2563eb", fontWeight: 500 }}>
            ← Quay lại menu
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,2fr) minmax(0,1.1fr)",
            gap: "28px",
            alignItems: "flex-start",
          }}
        >
          {/* Bên trái: danh sách món */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "32px",
              boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
              padding: "20px 24px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0,1fr) auto",
                  columnGap: "20px",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(226,232,240,0.9)",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "24px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {item.product.name}
                  </p>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: "14px",
                      color: "#6b7280",
                    }}
                  >
                    {formatPrice(item.product.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "none",
                      color: "#dc2626",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "10px",
                    fontSize: "15px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    style={qtyButtonStyle}
                  >
                    −
                  </button>
                  <span
                    style={{
                      minWidth: "24px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    style={qtyButtonStyle}
                  >
                    +
                  </button>
                  <span
                    style={{
                      width: "80px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#6b7280",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={clearCart}
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Xóa hết giỏ hàng
              </button>
              <Link to="/menu" style={{ color: "#2563eb" }}>
                ← Chọn thêm sản phẩm
              </Link>
            </div>
          </div>

          {/* Bên phải: tóm tắt đơn hàng */}
          <aside
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "32px",
              boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
              padding: "24px 26px 26px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: "0 0 14px",
                color: "#111827",
              }}
            >
              Tóm tắt đơn hàng
            </h2>
            <p
              style={{
                fontSize: "15px",
                margin: "0 0 8px",
                color: "#4b5563",
              }}
            >
              Tổng số món: <strong>{totalItems}</strong>
            </p>
            <p
              style={{
                fontSize: "16px",
                margin: "4px 0 20px",
                color: "#111827",
              }}
            >
              Tạm tính:{" "}
              <span style={{ fontWeight: 700, color: "#2563eb" }}>
                {formatPrice(subtotal)}
              </span>
            </p>

            <button
              type="button"
              onClick={handleGoCheckout}
              disabled={!items.length}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "999px",
                border: "none",
                cursor: items.length ? "pointer" : "not-allowed",
                opacity: items.length ? 1 : 0.6,
                background:
                  "linear-gradient(135deg,#2563eb 0%,#4f46e5 45%,#a855f7 100%)",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              Tiếp tục đặt hàng
            </button>

            <Link
              to="/menu"
              style={{
                display: "inline-block",
                marginTop: "6px",
                fontSize: "14px",
                color: "#2563eb",
              }}
            >
              ← Chọn thêm sản phẩm
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

const qtyButtonStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "999px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: 1,
};
