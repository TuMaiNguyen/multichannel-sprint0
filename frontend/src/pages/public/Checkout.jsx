// frontend/src/pages/public/Checkout.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProductById, formatPrice } from "../../lib/menuData";

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  const items = cart
    .map((entry) => {
      const product = getProductById(entry.id);
      if (!product) return null;
      return { ...entry, product };
    })
    .filter(Boolean);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "card",
    coupon: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const onChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) return;

    setSubmitting(true);

    // Demo: không call backend, chỉ show banner + clear cart
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 1800);
    }, 400);
  };

  if (!items.length && !done) {
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
          Giỏ hàng đang trống
        </h1>
        <Link to="/menu" style={{ color: "#2563eb", fontWeight: 500 }}>
          ← Quay lại menu để chọn món
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 800,
          marginBottom: "18px",
          color: "#111827",
        }}
      >
        Đặt hàng & thông tin giao hàng
      </h1>

      {done && (
        <div
          style={{
            marginBottom: "18px",
            padding: "10px 14px",
            borderRadius: "12px",
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontSize: "14px",
          }}
        >
          ✅ Đặt hàng demo thành công! Hệ thống sẽ tự chuyển về trang Home trong
          giây lát.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.8fr) minmax(0,1.1fr)",
          gap: "28px",
          alignItems: "flex-start",
        }}
      >
        {/* Form bên trái */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "32px",
            boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
            padding: "22px 26px 24px",
          }}
        >
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Họ tên người nhận *
              <input
                type="text"
                required
                value={form.name}
                onChange={onChange("name")}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Số điện thoại *
              <input
                type="tel"
                required
                value={form.phone}
                onChange={onChange("phone")}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Địa chỉ giao hàng *
              <input
                type="text"
                required
                value={form.address}
                onChange={onChange("address")}
                style={inputStyle}
              />
            </label>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Ghi chú cho đơn hàng
              <textarea
                rows={3}
                value={form.note}
                onChange={onChange("note")}
                style={{ ...inputStyle, minHeight: "96px", resize: "vertical" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>
              Phương thức thanh toán
              <select
                value={form.payment}
                onChange={onChange("payment")}
                style={inputStyle}
              >
                <option value="card">Thẻ ngân hàng (demo)</option>
                <option value="cod">Thanh toán khi nhận (demo)</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>
              Mã giảm giá (nếu có)
              <input
                type="text"
                value={form.coupon}
                onChange={onChange("coupon")}
                style={inputStyle}
                placeholder="sale10, sweet20,... (demo)"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || !items.length}
            style={{
              padding: "14px 30px",
              borderRadius: "999px",
              border: "none",
              cursor:
                submitting || !items.length ? "not-allowed" : "pointer",
              opacity: submitting || !items.length ? 0.7 : 1,
              background:
                "linear-gradient(135deg,#22c55e 0%,#16a34a 40%,#0ea5e9 100%)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
              boxShadow: "0 18px 40px rgba(22,163,74,0.35)",
            }}
          >
            {submitting ? "Đang xử lý..." : "Xác nhận đặt hàng (demo)"}
          </button>

          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            * Đây chỉ là form demo phục vụ bảo vệ đồ án, không có thanh toán hoặc
            giao hàng thật.
          </p>
        </form>

        {/* Tóm tắt bên phải */}
        <aside
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "32px",
            boxShadow: "0 18px 45px rgba(15,23,42,0.15)",
            padding: "22px 26px 24px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              margin: "0 0 10px",
              color: "#111827",
            }}
          >
            Tóm tắt đơn hàng
          </h2>

          {items.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                fontSize: "15px",
              }}
            >
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span style={{ fontWeight: 600 }}>
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e5e7eb",
              margin: "12px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            <span>Tổng cộng</span>
            <span style={{ color: "#2563eb" }}>{formatPrice(total)}</span>
          </div>

          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            Phí ship (demo): Tính theo khu vực khi giao hàng.
          </p>
        </aside>
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  backgroundColor: "#eff6ff",
  outline: "none",
  fontSize: "14px",
  marginTop: "4px",
};
