import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

export default function Feedback() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    apiGet('feedback').then(setItems).catch(e => setErr(e.message));
  }, []);

  if (err) return <p style={{color:'red'}}>{err}</p>;
  if (!items) return <p>Đang tải phản hồi…</p>;

  return (
    <>
      <h1>Phản hồi khách hàng</h1>
      <ul>
        {items.map((f, idx) => (
          <li key={idx}>{f.comment || f.message}</li>
        ))}
      </ul>
    </>
  );
}
