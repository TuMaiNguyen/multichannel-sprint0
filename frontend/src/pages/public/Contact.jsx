import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/contact").then(setInfo).catch(e => setErr(e.message));
  }, []);

  if (err) return <p className="error">{err}</p>;
  if (!info) return <p>Đang tải thông tin…</p>;

  return (
    <>
      <h1>Liên hệ Sweet Heaven</h1>
      <p><strong>Địa chỉ:</strong> {info.address}</p>
      <p><strong>Điện thoại:</strong> {info.phone}</p>
      <p><strong>Email:</strong> {info.email}</p>
      <p><strong>Giờ mở cửa:</strong> {info.openingHours}</p>
    </>
  );
}
