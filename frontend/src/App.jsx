import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import Menu from "./pages/public/Menu.jsx";
import Contact from "./pages/public/Contact.jsx";
import Feedback from "./pages/public/Feedback.jsx";
import "./index.css";

export default function App() {
  return (
    <>
      <nav className="nav" style={{ padding: "12px 16px" }}>
        <NavLink to="/" end style={{ marginRight: 12 }}>Home</NavLink>
        <NavLink to="/menu" style={{ marginRight: 12 }}>Menu</NavLink>
        <NavLink to="/feedback" style={{ marginRight: 12 }}>Feedback</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
