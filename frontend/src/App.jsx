import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Menu from './pages/public/Menu.jsx'
import Feedback from './pages/public/Feedback.jsx'
import Contact from './pages/public/Contact.jsx'
import './index.css'

export default function App() {
  return (
    <HashRouter>
      <nav style={{display:'flex', gap:16, padding:16}}>
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
      </Routes>
    </HashRouter>
  )
}
