import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiGet("/contact").then(setInfo).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (!info) return <p>Đang tải thông tin…</p>;

  return (
    <div>
      <h1>Liên hệ Sweet Heaven</h1>
      <p><b>Địa chỉ:</b> {info.address}</p>
      <p><b>Điện thoại:</b> {info.phone}</p>
      <p><b>Email:</b> {info.email}</p>
      <p><b>Giờ mở cửa:</b> {info.openingHours}</p>
    </div>
  );
}
