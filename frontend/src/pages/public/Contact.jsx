// frontend/src/pages/public/Contact.jsx
import React from "react";

const BRANCHES = [
  {
    id: 1,
    name: "Sweet Heaven – Quận 1",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    phone: "0900 000 001",
  },
  {
    id: 2,
    name: "Sweet Heaven – Thủ Đức",
    address: "45 Võ Văn Ngân, TP. Thủ Đức",
    phone: "0900 000 002",
  },
];

export default function Contact() {
  return (
    <main className="page page-contact">
      <section
        style={{
          padding: "24px 16px 8px",
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
          Cơ sở Sweet Heaven
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#4b5563",
            marginBottom: "6px",
          }}
        >
          Thông tin liên hệ demo cho đồ án.
        </p>
        <p
          style={{
            fontSize: "15px",
            color: "#111827",
          }}
        >
          Liên hệ truyền thông:{" "}
          <strong>Nguyễn Đỗ Tú Mai – 0857346510.</strong>
        </p>
      </section>

      <section
        style={{
          padding: "8px 16px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {BRANCHES.map((b) => (
          <article
            key={b.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "18px",
              padding: "16px 20px",
              boxShadow: "0 18px 45px rgba(148,163,184,0.35)",
            }}
          >
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 700,
                marginBottom: "4px",
                color: "#111827",
              }}
            >
              {b.name}
            </h2>
            <p
              style={{
                fontSize: "14px",
                margin: 0,
                color: "#4b5563",
                lineHeight: 1.6,
              }}
            >
              Địa chỉ: {b.address}
              <br />
              Điện thoại: {b.phone}
            </p>
          </article>
        ))}

        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            marginTop: "8px",
          }}
        >
          Giờ mở cửa chung: Mở cửa mỗi ngày 07:30 – 22:00
        </p>
      </section>

      <footer
        style={{
          fontSize: "12px",
          color: "#9ca3af",
          borderTop: "1px solid rgba(209,213,219,0.7)",
          paddingTop: "10px",
        }}
      >
        © 2025 Sweet Heaven Bakery – Website đồ án NMCNPM.
      </footer>
    </main>
  );
}
