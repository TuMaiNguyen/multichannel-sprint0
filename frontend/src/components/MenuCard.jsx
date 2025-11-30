// frontend/src/components/MenuCard.jsx
import React from "react";
import { formatPrice } from "../lib/menuData";

export default function MenuCard({ name, price, description, image }) {
  return (
    <article
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "32px",
        boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "28px",
          overflow: "hidden",
          margin: "12px 12px 0",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: "20px 24px 24px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            margin: "0 0 8px",
            color: "#111827",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: 1.6,
            margin: "0 0 16px",
          }}
        >
          {description}
        </p>
        <p
          style={{
            marginTop: "auto",
            fontSize: "18px",
            fontWeight: 700,
            color: "#ef4444",
          }}
        >
          {formatPrice(price)}
        </p>
      </div>
    </article>
  );
}
