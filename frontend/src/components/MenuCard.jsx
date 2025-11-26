// frontend/src/components/MenuCard.jsx
import React from "react";

export default function MenuCard({ name, price, description, image }) {
  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("vi-VN") + " đ"
      : price || "";

  return (
    <article
      style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image && (
        <div
          style={{
            width: "100%",
            paddingTop: "65%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div style={{ padding: "16px 18px 18px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            margin: "0 0 8px",
            color: "#1f2933",
          }}
        >
          {name}
        </h3>
        {description && (
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.5,
              margin: "0 0 10px",
              color: "#4b5563",
            }}
          >
            {description}
          </p>
        )}
        {formattedPrice && (
          <p
            style={{
              fontWeight: 700,
              color: "#e11d48",
              fontSize: "15px",
              margin: 0,
            }}
          >
            {formattedPrice}
          </p>
        )}
      </div>
    </article>
  );
}
