// frontend/src/components/MenuCard.jsx
import React from "react";
import { formatCurrency } from "../lib/format";

export default function MenuCard({
  name,
  price,
  description,
  image,
  onClick,
}) {
  return (
    <article
      className="menu-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="menu-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-desc">{description}</p>
        <div className="menu-card-price">
          {formatCurrency(price).replace("₫", "đ")}
        </div>
      </div>
    </article>
  );
}
