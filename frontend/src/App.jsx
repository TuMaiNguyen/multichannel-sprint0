import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() { return <h2>Trang chủ 🍰</h2>; }
function Menu() { return <h2>Menu 📋</h2>; }
function Feedback() { return <h2>Feedback 💬</h2>; }
function Contact() { return <h2>Liên hệ ☎️</h2>; }

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 24 }}>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/" style={{ marginRight: 8 }}>Trang chủ</Link>
          <Link to="/menu" style={{ marginRight: 8 }}>Menu</Link>
          <Link to="/feedback" style={{ marginRight: 8 }}>Feedback</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
