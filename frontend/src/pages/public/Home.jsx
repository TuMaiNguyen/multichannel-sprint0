import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Home() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/menu").then(setItems).catch(e => setErr(e.message));
  }, []);

  if (err) return <p className="error">{err}</p>;
  if (!items) return <p>Đang tải menu…</p>;

  return (
    <>
      <h1>Sweet Heaven</h1>
      <ul>
        {items.slice(0,3).map(i => (
          <li key={i.id}>{i.name} — {i.price.toLocaleString("vi-VN")}đ</li>
        ))}
      </ul>
    </>
  );
}
