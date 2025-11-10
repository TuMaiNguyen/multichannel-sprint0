import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Menu() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/menu").then(setData).catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (data === null) return <p>Đang tải menu…</p>;
  if (data.length === 0) return <p>Chưa có món trong menu.</p>;

  return (
    <>
      <h1>Menu</h1>
      <ol>
        {data.map((x) => (
          <li key={x.id}>{x.name} — {x.price.toLocaleString("vi-VN")}đ</li>
        ))}
      </ol>
    </>
  );
}
