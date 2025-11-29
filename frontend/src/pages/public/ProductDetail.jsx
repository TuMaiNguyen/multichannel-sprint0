// frontend/src/pages/public/ProductDetail.jsx
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DEMO_MENU_ITEMS } from "./Menu";
import { formatCurrency } from "../../lib/format";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = DEMO_MENU_ITEMS.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="page page-product-detail">
        <section style={{ padding: "40px 24px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Không tìm thấy sản phẩm
          </h1>
          <Link to="/menu" style={{ color: "#2563eb", fontWeight: 500 }}>
            ← Quay lại menu
          </Link>
        </section>
      </main>
    );
  }

  const handleAddAndGoToCart = () => {
    addItem(product, 1);
    navigate("/cart");
  };

  return (
    <main className="page page-product-detail">
      <section
        style={{
          padding: "40px 24px 56px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow:
              "0 30px 80px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255,255,255,0.4)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f97316",
              marginBottom: "8px",
            }}
          >
            Sweet Heaven Bakery
          </div>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: 800,
              marginBottom: "12px",
              color: "#020617",
            }}
          >
            {product.name}
          </h1>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#2563eb",
              marginBottom: "16px",
            }}
          >
            {formatCurrency(product.price).replace("₫", "đ")}
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: "32px",
              maxWidth: "420px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <button
              type="button"
              onClick={handleAddAndGoToCart}
              style={{
                padding: "14px 32px",
                borderRadius: "999px",
                border: "none",
                outline: "none",
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, #2563eb, #22c55e 60%, #22c55e)",
                boxShadow: "0 18px 40px rgba(37, 99, 235, 0.35)",
                cursor: "pointer",
              }}
            >
              Thêm vào giỏ & xem giỏ
            </button>

            <Link
              to="/menu"
              style={{
                fontSize: "14px",
                color: "#2563eb",
                fontWeight: 500,
              }}
            >
              ← Quay lại menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
