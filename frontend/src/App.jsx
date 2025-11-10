import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import Menu from "./pages/public/Menu.jsx";
import Feedback from "./pages/public/Feedback.jsx";
import Contact from "./pages/public/Contact.jsx";

export default function App() {
  return (
    <HashRouter>
      <nav style={{ padding: "12px" }}>
        <Link to="/">Home</Link>&nbsp;&nbsp;
        <Link to="/menu">Menu</Link>&nbsp;&nbsp;
        <Link to="/feedback">Feedback</Link>&nbsp;&nbsp;
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}
