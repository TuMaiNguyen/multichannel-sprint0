// frontend/src/pages/public/Promotions.jsx
import React from "react";

const PROMOTIONS = [
  {
    code: "SALE10",
    title: "Chào bạn mới",
    description: "Giảm 10% cho tổng hoá đơn",
    startDate: "26/05/2025",
    endDate: "26/06/2025",
    minQuantity: 5,
    remaining: 10,
  },
  {
    code: "SALE15",
    title: "Combo ngọt ngào",
    description: "Giảm 15% khi mua từ 3 bánh trở lên",
    startDate: "26/05/2025",
    endDate: "26/06/2025",
    minQuantity: 3,
    remaining: 10,
  },
  {
    code: "SALE5",
    title: "Happy afternoon",
    description: "Giảm 5% cho hoá đơn gọi kèm đồ uống",
    startDate: "26/05/2025",
    endDate: "26/06/2025",
    minQuantity: 1,
    remaining: 10,
  },
];

export default function Promotions() {
  return (
    <main className="page page-promotions">
      <section
        style={{
          padding: "32px 24px 24px",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 800,
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Mã khuyến mãi
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            margin: 0,
          }}
        >
          Các chương trình ưu đãi demo dành cho khách hàng Sweet Heaven.
        </p>
      </section>

      <section
        style={{
          padding: "0 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {PROMOTIONS.map((promo) => (
            <article
              key={promo.code}
              style={{
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                boxShadow: "0 16px 38px rgba(148,163,184,0.3)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg,#22c55e,#16a34a,#0d9488)",
                  color: "#f9fafb",
                  padding: "14px 16px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {promo.title}
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    marginTop: "6px",
                  }}
                >
                  CODE: <strong>{promo.code}</strong>
                </p>
              </div>
              <div
                style={{
                  padding: "12px 14px 14px",
                  fontSize: "13px",
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                <p style={{ margin: 0, marginBottom: "6px" }}>
                  Ngày bắt đầu: {promo.startDate}
                  <br />
                  Ngày kết thúc: {promo.endDate}
                </p>
                <p style={{ margin: 0, marginBottom: "6px" }}>
                  Số lượng tối thiểu: {promo.minQuantity}
                  <br />
                  Số lượng còn lại: {promo.remaining}
                </p>
                <p style={{ margin: 0 }}>
                  Mô tả:{" "}
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    {promo.description}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
