import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Home() {
  const [menu, setMenu] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiGet("/menu").then(setMenu).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (!menu) return <p>Đang tải menu...</p>;

  return (
    <div>
      <h1>Sweet Heaven</h1>
      <ul>
        {menu.slice(0, 3).map(i => (
          <li key={i.id}>
            {i.name} — {i.price.toLocaleString("vi-VN")}đ
          </li>
        ))}
      </ul>
    </div>
  );
}
