import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/contact").then(setInfo).catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Lỗi: {err}</p>;
  if (info === null) return <p>Đang tải thông tin…</p>;
  if (!info || Object.keys(info).length === 0) return <p>Chưa có thông tin liên hệ.</p>;

  return (
    <>
      <h1>Liên hệ Sweet Heaven</h1>
      <p><b>Địa chỉ:</b> {info.address}</p>
      <p><b>Điện thoại:</b> {info.phone}</p>
      <p><b>Email:</b> {info.email}</p>
      <p><b>Giờ mở cửa:</b> {info.openingHours}</p>
    </>
  );
}
