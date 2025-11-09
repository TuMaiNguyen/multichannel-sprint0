import { Routes, Route, NavLink } from "react-router-dom";

// PUBLIC
import Home from "./pages/public/Home.jsx";
import Menu from "./pages/public/Menu.jsx";
import Feedback from "./pages/public/Feedback.jsx";
import Contact from "./pages/public/Contact.jsx";

// ADMIN
import Compose from "./pages/admin/Compose.jsx";
import Calendar from "./pages/admin/Calendar.jsx";
import Inbox from "./pages/admin/Inbox.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";

// Ưu tiên API trên Render khi chạy trên GitHub Pages
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (location.hostname.includes("github.io")
    ? "https://sweet-heaven-api.onrender.com"
    : "http://localhost:3001");

function Navbar() {
  return (
    <header className="container" style={{ paddingTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div className="logo">SH</div>
        <div>
          <h1 className="title">Sweet Heaven Bakery — Media Hub</h1>
          <p className="sub">Cổng truyền thông số đa kênh cho chuỗi tiệm bánh</p>
        </div>
      </div>
      <nav className="navbar" style={{ marginTop: 8 }}>
        {/* Public */}
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Trang chủ
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Menu
        </NavLink>
        <NavLink to="/feedback" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Feedback
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Liên hệ
        </NavLink>
        <span style={{ opacity: 0.4, margin: "0 8px" }}>|</span>
        {/* Admin */}
        <NavLink to="/compose" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Đăng bài bánh
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Lịch xuất bản
        </NavLink>
        <NavLink to="/inbox" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Tin nhắn
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin */}
          <Route path="/compose" element={<Compose />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}
