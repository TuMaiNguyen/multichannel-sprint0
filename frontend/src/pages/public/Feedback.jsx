import { useState } from 'react';
import { API_BASE } from '../../lib/api';

export default function Feedback() {
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);

  const submit = async e => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
    });
    setOk(res.ok);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Feedback</h1>
      <form onSubmit={submit}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Ý kiến của bạn"
        />
        <button type="submit">Gửi</button>
      </form>
      {ok && <p>Đã gửi — cảm ơn bạn!</p>}
    </main>
  );
}
