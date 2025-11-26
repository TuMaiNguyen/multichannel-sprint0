// frontend/src/pages/public/Menu.jsx
import React, { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import MenuCard from "../../components/MenuCard";
import ErrorBanner from "../../components/ErrorBanner";
import Loader from "../../components/Loader";

// 12 món demo cố định (có hình minh họa bằng placeholder)
const DEMO_MENU_ITEMS = [
  {
    id: 1,
    name: "Croissant bơ",
    price: 32000,
    description: "Bánh croissant bơ Pháp, lớp vỏ giòn, ruột bông, thơm mùi bơ.",
    image: "https://placehold.co/400x260?text=Croissant+bo",
  },
  {
    id: 2,
    name: "Tiramisu cacao",
    price: 45000,
    description: "Bánh lạnh vị cà phê & cacao, ngọt vừa, ăn kèm cacao rắc.",
    image: "https://placehold.co/400x260?text=Tiramisu",
  },
  {
    id: 3,
    name: "Trà sữa Sweet Heaven",
    price: 39000,
    description: "Trà sữa với phương châm thơm trà béo sữa ít ngọt phù hợp cho những bạn thích uống ít ngọt.",
    image: "https://placehold.co/400x260?text=Tra+sua+Sweet+Heaven",
  },
  {
    id: 4,
    name: "Bánh mousse dâu",
    price: 49000,
    description: "Mousse dâu tây chua nhẹ, béo nhưng không ngấy, ai ăn cũng thích mê.",
    image: "https://placehold.co/400x260?text=Mousse+strawberry",
  },
  {
    id: 5,
    name: "Bánh phô mai nướng",
    price: 52000,
    description: "Cheesecake nướng kiểu Nhật, mềm mịn, cùng mùi thơm phô mai ngào ngạt.",
    image: "https://placehold.co/400x260?text=Cheesecake",
  },
  {
    id: 6,
    name: "Bánh su kem",
    price: 18000,
    description: "Vỏ su mềm mịn, bên trong ngập ngụa nhân kem vanilla lạnh mát.",
    image: "https://placehold.co/400x260?text=Choux+cream",
  },
  {
    id: 7,
    name: "Macaron mix vị",
    price: 55000,
    description: "Set 4 chiếc macaron đủ vị: dâu, chanh dây, trà xanh, cacao.",
    image: "https://placehold.co/400x260?text=Macaron",
  },
  {
    id: 8,
    name: "Bánh mì bơ tỏi",
    price: 28000,
    description: "Bánh mì mềm, cùng sốt bơ tỏi béo thơm, ăn cùng topping phô mai béo ngậy bên trên.",
    image: "https://placehold.co/400x260?text=Garlic+bread",
  },
  {
    id: 9,
    name: "Bánh donut đường",
    price: 19000,
    description: "Donut chiên phủ đường, không gắt dầu, thích hợp nhâm nhi cùng trà nóng.",
    image: "https://placehold.co/400x260?text=Donut",
  },
  {
    id: 10,
    name: "Trà đào cam sả",
    price: 39000,
    description: "Trà đào cam sả mát lạnh, vị trái cây tươi.",
    image: "https://placehold.co/400x260?text=Tra+dao+cam+sa",
  },
  {
    id: 11,
    name: "Cà phê sữa coldbrew",
    price: 30000,
    description: "Cà phê sữa đá kiểu Việt Nam, đậm nhưng dễ uống.",
    image: "https://placehold.co/400x260?text=Ca+phe+sua",
  },
  {
    id: 12,
    name: "Matcha latte",
    price: 42000,
    description: "Sữa matcha thơm dịu, vị ngọt thanh, béo sữa, được lòng mọi lứa tuổi.",
    image: "https://placehold.co/400x260?text=Matcha+latte",
  },
];

export default function Menu() {
  const [items, setItems] = useState(DEMO_MENU_ITEMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      try {
        setLoading(true);
        setError("");

        // Gọi API backend
        const data = await apiGet("/menu");

        if (cancelled) return;

        if (data && data.ok && Array.isArray(data.items) && data.items.length) {
          // Ghép dữ liệu từ server vào 12 món demo
          const merged = DEMO_MENU_ITEMS.map((fallback, index) => {
            const serverItem = data.items[index];
            if (!serverItem) return fallback;

            return {
              ...fallback,
              // Ưu tiên name / price / description từ server
              name: serverItem.name || fallback.name,
              price: serverItem.price ?? fallback.price,
              description: serverItem.description || fallback.description,
            };
          });

          setItems(merged);
        }
      } catch (err) {
        console.error("Fetch /menu failed:", err);
        setError("Không tải được menu từ server, đang dùng dữ liệu demo.");
        // vẫn giữ items = DEMO_MENU_ITEMS
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
          padding: "32px 24px 8px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
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
        <div style={{ padding: "0 24px 16px" }}>
          <ErrorBanner>{error}</ErrorBanner>
        </div>
      )}

      {loading && (
        <div style={{ padding: "0 24px 16px" }}>
          <Loader />
        </div>
      )}

      <section
        style={{
          padding: "0 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((item) => (
            <MenuCard
              key={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
