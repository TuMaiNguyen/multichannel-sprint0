// frontend/src/pages/admin/Compose.jsx
import React, { useState } from "react";
import { api } from "../../lib/api";

export default function Compose() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    tags: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    setResult(null);
    try {
      const payload = {
        name: form.name.trim(),
        desc: form.desc.trim(),
        price: Number(form.price),
        image: form.image.trim(),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await api.composePost(payload); // POST /posts
      setResult(res);
      setStatus("ok");
    } catch (e) {
      setStatus("error");
      setError(e.message || "Không đăng được");
    }
  };

  return (
    <section>
      <h2>Đăng bài bánh</h2>
      {status === "ok" && <div className="alert ok">Đã đăng demo (mock) thành công!</div>}
      {status === "error" && <div className="alert error">Lỗi: {error}</div>}

      <form onSubmit={submit} className="form" style={{ maxWidth: 560 }}>
        <label>
          Tên món
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Giá (đ)
          <input type="number" name="price" value={form.price} onChange={onChange} />
        </label>
        <label>
          Link ảnh
          <input name="image" value={form.image} onChange={onChange} />
        </label>
        <label>
          Mô tả
          <textarea name="desc" rows={3} value={form.desc} onChange={onChange} />
        </label>
        <label>
          Tags (cách nhau bằng dấu phẩy)
          <input name="tags" value={form.tags} onChange={onChange} placeholder="bánh kem, signature" />
        </label>
        <button disabled={status === "sending"}>
          {status === "sending" ? "Đang đăng…" : "Đăng demo"}
        </button>
      </form>

      {result && (
        <pre style={{ marginTop: 16, background: "#f7f7f7", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </section>
  );
}
