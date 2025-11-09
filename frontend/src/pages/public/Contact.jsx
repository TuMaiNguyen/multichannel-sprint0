// frontend/src/pages/public/Contact.jsx
import { useEffect, useState } from 'react';
import { apiGet } from '../../lib/api';

export default function Contact() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    apiGet('/contact')
      .then(setInfo)
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Liên hệ Sweet Heaven</h1>
      {info ? (
        <div>
          <p><b>Địa chỉ:</b> {info.address}</p>
          <p><b>SĐT:</b> {info.phone}</p>
          <p><b>Email:</b> {info.email}</p>
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
  );
}
