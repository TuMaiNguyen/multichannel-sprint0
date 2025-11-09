// frontend/src/App.jsx
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home.jsx';
import Menu from './pages/public/Menu.jsx';
import Contact from './pages/public/Contact.jsx';

export default function App() {
  return (
    <div>
      <nav style={{ display:'flex', gap:12, padding:16 }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
