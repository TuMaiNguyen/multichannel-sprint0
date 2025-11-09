// frontend/src/pages/public/Home.jsx
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet('/menu')
      .then(setMenu)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Sweet Heaven Bakery</h1>
      <h2>Danh sách bánh nổi bật</h2>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            <b>{item.name}</b> — {item.price}₫
          </li>
        ))}
      </ul>
    </div>
  );
}
