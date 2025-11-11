import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Menu() {
  const [menu, setMenu] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiGet("/menu").then(setMenu).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (!menu) return <p>Đang tải menu...</p>;

  return (
    <div>
      <h1>Menu</h1>
      <ol>
        {menu.map(i => (
          <li key={i.id}>
            {i.name} — {i.price.toLocaleString("vi-VN")}đ
          </li>
        ))}
      </ol>
    </div>
  );
}
