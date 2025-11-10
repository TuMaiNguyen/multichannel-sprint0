import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import Menu from "./pages/public/Menu.jsx";
import Feedback from "./pages/public/Feedback.jsx";
import Contact from "./pages/public/Contact.jsx";

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/feedback">Feedback</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </main>
    </div>
  );
}
