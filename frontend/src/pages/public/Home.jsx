import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Home() {
  const [menu, setMenu] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/menu")
      .then(setMenu)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (menu === null) return <p>Đang tải thực đơn…</p>;
  if (!Array.isArray(menu) || menu.length === 0) return <p>Chưa có món nào.</p>;

  return (
    <>
      <h1>Sweet Heaven</h1>
      <ul>
        {menu.map((m) => (
          <li key={m.id}>
            {m.name} — {m.price.toLocaleString("vi-VN")}đ
          </li>
        ))}
      </ul>
    </>
  );
}
