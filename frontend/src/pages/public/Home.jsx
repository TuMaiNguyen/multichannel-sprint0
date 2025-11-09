// frontend/src/pages/public/Home.jsx
import { useEffect, useState } from 'react';
import { endpoints, getJSON } from '../../lib/api';

export default function Home() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading'); // 'loading' | 'ok' | 'error'

  useEffect(() => {
    getJSON(endpoints.products)
      .then(json => { setData(json); setState('ok'); })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <main style={{ padding: 16 }}>Đang tải menu…</main>;
  if (state === 'error')   return <main style={{ padding: 16, color: 'crimson' }}>Lỗi tải dữ liệu.</main>;

  return (
    <main style={{ padding: 16 }}>
      <h1>Sweet Heaven — Menu</h1>
      <pre style={{ background:'#f6f8fa', padding:12, overflow:'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
