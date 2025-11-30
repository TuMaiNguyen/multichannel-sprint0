// frontend/src/pages/public/Menu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../lib/api";
import MenuCard from "../../components/MenuCard";
import ErrorBanner from "../../components/ErrorBanner";
import Loader from "../../components/Loader";
import { MENU_ITEMS } from "../../lib/menuData";

export default function Menu() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      try {
        setLoading(true);
        setError("");

        const data = await apiGet("/menu");

        if (cancelled) return;

        if (data && data.ok && Array.isArray(data.items) && data.items.length) {
          const merged = MENU_ITEMS.map((fallback, index) => {
            const serverItem = data.items[index];
            if (!serverItem) return fallback;

            return {
              ...fallback,
              name: serverItem.name || fallback.name,
              price: serverItem.price ?? fallback.price,
              description: serverItem.description || fallback.description,
              // KHÔNG override image, giữ hình local
            };
          });

          setItems(merged);
        }
      } catch (err) {
        console.error("Fetch /menu failed:", err);
        setError("Không tải được menu từ server, đang dùng dữ liệu demo.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page page-menu">
      <section
        style={{
          padding: "0 0 8px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "8px",
            color: "#111827",
          }}
        >
          Menu signature Sweet Heaven
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#4b5563",
            margin: 0,
          }}
        >
          Gửi trọn tình cảm thông qua từng chiếc bánh và đồ uống của tiệm.
        </p>
      </section>

      {error && (
        <div style={{ padding: "0 0 16px" }}>
          <ErrorBanner>{error}</ErrorBanner>
        </div>
      )}

      {loading && (
        <div style={{ padding: "0 0 16px" }}>
          <Loader />
        </div>
      )}

      <section
        style={{
          padding: "8px 0 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/menu/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <MenuCard
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
