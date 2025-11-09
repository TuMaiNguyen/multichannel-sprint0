// frontend/src/pages/public/Menu.jsx
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet('/menu')
      .then(setMenu)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải menu...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Menu bánh ngọt</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            <b>{item.name}</b> — {item.category} — {item.price}₫
          </li>
        ))}
      </ul>
    </div>
  );
}
