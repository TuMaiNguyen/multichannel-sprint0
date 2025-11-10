import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Contact() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    apiGet("/contact")
      .then((data) => setState({ loading: false, error: null, data }))
      .catch((e) => setState({ loading: false, error: e.message, data: null }));
  }, []);

  if (state.loading) return <p>Đang tải thông tin…</p>;
  if (state.error) return <p style={{ color: "red" }}>Lỗi: {state.error}</p>;

  return (
    <>
      <h1>Liên hệ Sweet Heaven</h1>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </>
  );
}
