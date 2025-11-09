import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/public/Home.jsx';
import Menu from './pages/public/Menu.jsx';
import Feedback from './pages/public/Feedback.jsx';
import Contact from './pages/public/Contact.jsx';

export default function App() {
  return (
    <div className="p-6">
      <nav className="space-x-6 text-lg">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
