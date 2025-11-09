// frontend/src/pages/public/Feedback.jsx
import { useState } from 'react';
import { apiGet } from '../../lib/api'; // dùng để test hoặc hiển thị danh sách feedback
import { apiPost } from '../../lib/api'; // nếu bạn có hàm post trong api.js thì import thêm

export default function Feedback() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Đang gửi...');
    try {
      await apiPost('/feedback', form);
      setStatus('✅ Gửi phản hồi thành công!');
      setForm({ name: '', message: '' });
    } catch (err) {
      setStatus('❌ Gửi thất bại, thử lại!');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Góp ý & Phản hồi</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên bạn:</label><br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '300px', padding: '5px' }}
          />
        </div>
        <div>
          <label>Nội dung:</label><br />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '300px', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Gửi phản hồi</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
