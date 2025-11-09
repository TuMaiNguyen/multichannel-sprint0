import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

export default function Contact() {
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    apiGet('contact').then(setInfo).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{color:'red'}}>{err}</p>;
  if (!info) return <p>Đang tải thông tin…</p>;

  return (
    <>
      <h1>Liên hệ Sweet Heaven</h1>
      <p>Địa chỉ: {info.address}</p>
      <p>Điện thoại: {info.phone}</p>
      <p>Email: {info.email}</p>
    </>
  );
}
