import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Home() {
  const [state, setState] = useState({ loading: true, error: null, data: [] });

  useEffect(() => {
    apiGet("/menu")
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((e) => setState({ loading: false, error: e.message, data: [] }));
  }, []);

  if (state.loading) return <p>Đang tải menu…</p>;
  if (state.error) return <p style={{ color: "red" }}>Lỗi: {state.error}</p>;

  return (
    <>
      <h1>Trang chủ</h1>
      <ul>
        {state.data.map((i) => (
          <li key={i.id || i.name}>{i.name} — {i.price}</li>
        ))}
      </ul>
    </>
  );
}
