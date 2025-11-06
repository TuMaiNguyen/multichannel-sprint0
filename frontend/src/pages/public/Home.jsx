
import React, { useEffect, useState } from "react";
import { API_BASE } from "../../App";
export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <section className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display text-2xl">Chào mừng đến Sweet Heaven ✨</h2>
        <p>
          Tiệm bánh thủ công hương vị nịnh vị giác – phối màu pastel “chụp là
          đẹp”. Đặt trước online, nhận tại quầy hoặc giao nhanh nội thành.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <article key={p.id} className="card overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-cocoa/70 line-clamp-2">{p.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-bold">
                  {p.price.toLocaleString()}₫
                </span>
                <span className="text-xs bg-mint/60 px-2 py-1 rounded-full">
                  {p.tags.join(" · ")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
