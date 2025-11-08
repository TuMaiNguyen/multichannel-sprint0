import React, { useEffect, useState } from "react";
import { API_BASE } from "../../App";


export default function Menu() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`).then((r) => r.json()).then(setItems);
  }, []);

  const view = items.filter((i) =>
    (i.name + i.tags.join(" ")).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="space-y-4">
      <input
        className="card px-4 py-3 w-full"
        placeholder="Tìm macaron, mousse, tiramisu…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="space-y-2">
        {view.map((i) => (
          <li key={i.id} className="card p-4 flex items-center gap-4">
            <img
              src={i.image}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div className="flex-1">
              <div className="font-semibold">{i.name}</div>
              <div className="text-sm text-cocoa/70">{i.desc}</div>
            </div>
            <div className="font-bold">{i.price.toLocaleString()}₫</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
