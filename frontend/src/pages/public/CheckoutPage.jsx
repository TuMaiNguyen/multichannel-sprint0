// frontend/src/pages/public/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../lib/cart";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
};

function InputField({ label, name, value, onChange, textarea, required }) {
  return (
    <label style={{ fontSize: "14px", color: "#111827" }}>
      <span style={{ display: "block", marginBottom: "4px" }}>
        {label}
        {required && <span style={{ color: "#ef4444" }}> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          style={inputStyle}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          style={inputStyle}
        />
      )}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // demo: clear cart rồi đưa về Home
    clearCart();
    navigate("/");
  };

  return (
    <main className="page page-checkout" style={{ padding: "40px 24px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          marginBottom: "24px",
        }}
      >
        Đặt hàng demo
      </h1>

      {!items.length && (
        <p style={{ marginBottom: "24px" }}>
          Giỏ hàng hiện đang trống.{" "}
          <Link to="/menu" style={{ color: "#2563eb" }}>
            ← Quay lại menu để chọn món.
          </Link>
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
          gap: "32px",
          maxWidth: "1040px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
            padding: "24px 24px 28px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Thông tin giao hàng
          </h2>

          <div style={{ display: "grid", gap: "14px" }}>
            <InputField
              label="Họ tên"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <InputField
              label="Địa chỉ"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <InputField
              label="Ghi chú"
              name="note"
              value={form.note}
              onChange={handleChange}
              textarea
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
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
            Xác nhận đặt hàng (demo)
          </button>

          <p
            style={{
              fontSize: "12px",
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            * Đây chỉ là form demo phục vụ bảo vệ đồ án, không có thanh toán
            hoặc giao hàng thật.
          </p>
        </form>

        <aside
          style={{
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
            padding: "20px 24px 24px",
            alignSelf: "flex-start",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "12px",
            }}
          >
            Tóm tắt đơn hàng
          </h2>
          {items.length ? (
            <>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: "16px",
                }}
              >
                {items.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                    </span>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                <span>Tổng cộng</span>
                <span style={{ color: "#2563eb" }}>
                  {total.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </>
          ) : (
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Chưa có món nào trong giỏ.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
