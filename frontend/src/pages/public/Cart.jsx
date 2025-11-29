// frontend/src/pages/public/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/format";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalAmount,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!items.length) return;
    navigate("/checkout");
  };

  if (!items.length) {
    return (
      <main className="page page-cart">
        <section style={{ padding: "40px 24px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            Giỏ hàng của bạn
          </h1>
          <p style={{ marginBottom: "16px", color: "#4b5563" }}>
            Hiện chưa có sản phẩm nào trong giỏ.
          </p>
          <Link to="/menu" style={{ color: "#2563eb", fontWeight: 500 }}>
            ← Quay lại menu để chọn bánh
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page page-cart">
      <section style={{ padding: "32px 24px 24px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 800,
          }}
        >
          Giỏ hàng của bạn
        </h1>
      </section>

      <section
        style={{
          padding: "0 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(260px, 0.9fr)",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* Danh sách sản phẩm */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "32px",
              boxShadow:
                "0 24px 80px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
              overflow: "hidden",
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0, 1fr) auto",
                  alignItems: "center",
                  padding: "20px 24px",
                  borderBottom:
                    index === items.length - 1
                      ? "none"
                      : "1px solid rgba(226,232,240,0.8)",
                  columnGap: "16px",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow:
                      "0 12px 30px rgba(15,23,42,0.18), 0 0 0 1px rgba(255,255,255,0.7)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#4b5563",
                      marginBottom: "6px",
                    }}
                  >
                    {formatCurrency(item.price).replace("₫", "đ")}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      color: "#ef4444",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>

                {/* Số lượng + giá bên phải */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    justifySelf: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "999px",
                      border: "1px solid rgba(148,163,184,0.5)",
                      padding: "4px 10px",
                      gap: "8px",
                      background: "#f9fafb",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "16px",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                    >
                      –
                    </button>
                    <span
                      style={{
                        minWidth: 18,
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "16px",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(item.price * item.quantity).replace(
                      "₫",
                      "đ"
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                padding: "14px 24px 18px",
                borderTop: "1px solid rgba(226,232,240,0.9)",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <button
                type="button"
                onClick={clearCart}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  cursor: "pointer",
                  color: "#ef4444",
                }}
              >
                Xóa hết giỏ hàng
              </button>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <aside
            style={{
              background: "#ffffff",
              borderRadius: "32px",
              padding: "24px 24px 28px",
              boxShadow:
                "0 24px 80px rgba(15,23,42,0.14), 0 0 0 1px rgba(255,255,255,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "12px",
              }}
            >
              Tóm tắt đơn hàng
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Tổng số món:{" "}
              <span style={{ fontWeight: 700, color: "#111827" }}>
                {totalItems}
              </span>
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                marginBottom: "24px",
                color: "#111827",
              }}
            >
              Tạm tính:{" "}
              <span style={{ color: "#2563eb" }}>
                {formatCurrency(totalAmount).replace("₫", "đ")}
              </span>
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "999px",
                border: "none",
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, #2563eb, #4338ca 50%, #2563eb)",
                boxShadow: "0 18px 40px rgba(37,99,235,0.4)",
                marginBottom: "10px",
              }}
            >
              Tiếp tục đặt hàng
            </button>

            <Link
              to="/menu"
              style={{
                fontSize: "14px",
                color: "#2563eb",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Chọn thêm sản phẩm
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
