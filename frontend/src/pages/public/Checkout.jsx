// frontend/src/pages/public/Checkout.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/format";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "card",
    coupon: "",
  });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) {
      alert("Giỏ hàng đang trống, hãy chọn sản phẩm trước khi đặt.");
      navigate("/menu");
      return;
    }

    setSuccess(
      "Đặt hàng demo thành công! Sweet Heaven sẽ liên hệ xác nhận trong thời gian sớm nhất ♡"
    );

    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  if (!items.length) {
    return (
      <main className="page page-checkout">
        <section style={{ padding: "40px 24px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            Đặt hàng demo
          </h1>
          <p style={{ marginBottom: 12, color: "#4b5563" }}>
            Giỏ hàng của bạn hiện đang trống.
          </p>
          <Link to="/menu" style={{ color: "#2563eb", fontWeight: 500 }}>
            ← Quay lại menu để chọn bánh
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page page-checkout">
      {success && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 40,
            background:
              "linear-gradient(135deg, #22c55e, #16a34a, #22c55e 70%)",
            color: "#ffffff",
            padding: "10px 18px",
            borderRadius: "999px",
            fontSize: "14px",
            boxShadow: "0 18px 40px rgba(22,163,74,0.4)",
          }}
        >
          {success}
        </div>
      )}

      <section style={{ padding: "32px 24px 24px" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 800,
          }}
        >
          Đặt hàng & thông tin giao hàng
        </h1>
      </section>

      <section style={{ padding: "0 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 0.9fr)",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#ffffff",
              borderRadius: "32px",
              padding: "24px 24px 28px",
              boxShadow:
                "0 24px 80px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 800,
                marginBottom: "18px",
              }}
            >
              Thông tin giao hàng
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div>
                <label className="checkout-label">
                  Họ tên người nhận <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className="checkout-input"
                  placeholder="Nguyễn Thị Mai"
                />
              </div>

              <div>
                <label className="checkout-label">
                  Số điện thoại <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="checkout-input"
                  placeholder="09xx xxx xxx"
                />
              </div>

              <div>
                <label className="checkout-label">
                  Địa chỉ giao hàng <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={handleChange("address")}
                  className="checkout-input"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện"
                />
              </div>

              <div>
                <label className="checkout-label">Ghi chú cho đơn hàng</label>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={handleChange("note")}
                  className="checkout-input"
                  style={{ resize: "vertical" }}
                  placeholder="Ví dụ: Giao trước 11h30, không bỏ đá..."
                />
              </div>

              <div>
                <label className="checkout-label">
                  Phương thức thanh toán 
                </label>
                <select
                  value={form.payment}
                  onChange={handleChange("payment")}
                  className="checkout-input"
                >
                  <option value="card">Thẻ ngân hàng </option>
                  <option value="cod">Thanh toán khi nhận hàng </option>
                </select>
              </div>

              <div>
                <label className="checkout-label">
                  Mã giảm giá (nếu có – demo)
                </label>
                <input
                  type="text"
                  value={form.coupon}
                  onChange={handleChange("coupon")}
                  className="checkout-input"
                  placeholder="Ví dụ: sale10"
                />
              </div>
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "16px",
              }}
            >
              * Đây chỉ là form demo phục vụ bảo vệ đồ án, không có thanh toán
              hoặc giao hàng thật.
            </p>

            <div style={{ marginTop: "20px" }}>
              <button
                type="submit"
                style={{
                  padding: "14px 32px",
                  borderRadius: "999px",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  background:
                    "linear-gradient(135deg, #2563eb, #22c55e 55%, #16a34a)",
                  cursor: "pointer",
                  boxShadow: "0 18px 40px rgba(34,197,94,0.45)",
                }}
              >
                Xác nhận đặt hàng 
              </button>
            </div>
          </form>

          {/* Tóm tắt đơn hàng */}
          <aside
            style={{
              background: "#ffffff",
              borderRadius: "32px",
              padding: "24px 24px 28px",
              boxShadow:
                "0 24px 80px rgba(15,23,42,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Tóm tắt đơn hàng
            </h2>

            <div
              style={{
                display: "grid",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {formatCurrency(item.price * item.quantity).replace(
                      "₫",
                      "đ"
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px dashed rgba(209,213,219,0.9)",
                paddingTop: "12px",
                fontSize: "15px",
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Tổng cộng</span>
              <span style={{ color: "#2563eb" }}>
                {formatCurrency(totalAmount).replace("₫", "đ")}
              </span>
            </div>

            <p
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              Phí ship: Tính theo khu vực khi giao hàng.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
