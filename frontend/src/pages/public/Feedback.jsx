import { useState } from "react";
import { apiPost } from "../../lib/api";

export default function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("Đang gửi…");
    try {
      await apiPost("/feedback", { name, message, rating });
      setStatus("Cảm ơn bạn! Đã ghi nhận phản hồi.");
      setName(""); setMessage(""); setRating(5);
    } catch (err) {
      setStatus("Lỗi: " + err.message);
    }
  }

  return (
    <div className="p-6">
      <h1>Feedback</h1>
      <form onSubmit={submit}>
        <p><input placeholder="Tên (tuỳ chọn)" value={name}
                 onChange={e=>setName(e.target.value)} /></p>
        <p><textarea placeholder="Nội dung" value={message}
                    onChange={e=>setMessage(e.target.value)} /></p>
        <p>Rating:
          <input type="number" min="1" max="5" value={rating}
                 onChange={e=>setRating(e.target.value)} />
        </p>
        <button type="submit">Gửi</button>
      </form>
      {status && <p style={{color:"#a00"}}>{status}</p>}
    </div>
  );
}
