// frontend/src/pages/public/ProductDetail.jsx
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById, formatPrice } from "../../lib/menuData";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(id);

  if (!product) {
    return (
      <main>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Không tìm thấy sản phẩm
        </h1>
        <Link to="/menu" style={{ color: "#2563eb", fontSize: "15px" }}>
          ← Quay lại menu
        </Link>
      </main>
    );
  }

  const handleAddAndGoCart = () => {
    addToCart(product.id, 1);
    navigate("/cart");
  };

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
        gap: "40px",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(15,23,42,0.2)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "520px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div>
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f97316",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          Sweet Heaven Bakery
        </p>
        <h1
          style={{
            fontSize: "34px",
            fontWeight: 800,
            margin: "0 0 16px",
            color: "#111827",
          }}
        >
          {product.name}
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: 1.7,
            margin: "0 0 20px",
          }}
        >
          {product.description}
        </p>
        <p
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#2563eb",
            margin: "0 0 32px",
          }}
        >
          {formatPrice(product.price)}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <button
            type="button"
            onClick={handleAddAndGoCart}
            style={{
              padding: "14px 32px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg,#2563eb 0%,#22c55e 55%,#a855f7 100%)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: "0 18px 40px rgba(37,99,235,0.35)",
            }}
          >
            Thêm vào giỏ & xem giỏ
          </button>

          <Link
            to="/menu"
            style={{ color: "#2563eb", fontSize: "15px", fontWeight: 500 }}
          >
            ← Quay lại menu
          </Link>
        </div>
      </div>
    </main>
  );
}
