// frontend/src/pages/public/Contact.jsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

const FALLBACK_CONTACT = {
  title: "Cơ sở Sweet Heaven",
  description:
    "Thông tin liên hệ demo cho đồ án.",
  branches: [
    {
      id: 1,
      name: "Sweet Heaven – Quận 1",
      address: "123 Nguyễn Huệ, Q.1, TP.HCM",
      phone: "0900 000 001",
      openingHours: "07:30 – 22:00",
    },
    {
      id: 2,
      name: "Sweet Heaven – Thủ Đức",
      address: "45 Võ Văn Ngân, TP. Thủ Đức",
      phone: "0900 000 002",
      openingHours: "07:30 – 22:00",
    },
  ],
  openingHours: "Mở cửa mỗi ngày 07:30 – 22:00",
  // Bạn muốn ghi thêm thông tin của chính bạn thì thêm field bên dưới
  ownerNote:
    "Liên hệ truyền thông: Nguyễn Đỗ Tú Mai - 0857346510.",
};

export default function Contact() {
  const [contact, setContact] = useState(FALLBACK_CONTACT);

  useEffect(() => {
    let cancelled = false;

    async function loadContact() {
      try {
        const data = await apiGet("/contact");
        if (!cancelled && data && Array.isArray(data.branches)) {
          setContact((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.warn("Contact API error, dùng fallback:", err?.message || err);
      }
    }

    loadContact();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page page-contact">
      <section className="page-section">
        <h1 className="page-title">{contact.title}</h1>
        {contact.description && (
          <p className="page-subtitle">{contact.description}</p>
        )}

        {contact.ownerNote && (
          <p style={{ marginTop: "1rem" }}>{contact.ownerNote}</p>
        )}

        <h2 style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
          Chi nhánh
        </h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {contact.branches?.map((b) => (
            <li
              key={b.id}
              style={{
                padding: "1rem 1.25rem",
                marginBottom: "0.75rem",
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
              }}
            >
              <div style={{ fontWeight: 600 }}>{b.name}</div>
              <div>Địa chỉ: {b.address}</div>
              {b.phone && <div>Điện thoại: {b.phone}</div>}
              {b.openingHours && <div>Giờ mở cửa: {b.openingHours}</div>}
            </li>
          ))}
        </ul>

        {contact.openingHours && (
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            Giờ mở cửa chung: {contact.openingHours}
          </p>
        )}
      </section>
    </main>
  );
}
