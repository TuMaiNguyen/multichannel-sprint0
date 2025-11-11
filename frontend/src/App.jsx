import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Menu from './pages/public/Menu.jsx'
import Feedback from './pages/public/Feedback.jsx'
import Contact from './pages/public/Contact.jsx'
import NotFound from './pages/public/NotFound.jsx'

const LinkItem = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `nav-link ${isActive ? 'nav-link-active' : 'hover:bg-slate-100'}`
    }
  >
    {label}
  </NavLink>
)

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <div className="text-xl font-extrabold text-brand-700">Sweet Heaven</div>
          <nav className="flex gap-2">
            <LinkItem to="/" label="Home" />
            <LinkItem to="/menu" label="Menu" />
            <LinkItem to="/feedback" label="Feedback" />
            <LinkItem to="/contact" label="Contact" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-6xl p-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Sweet Heaven Bakery.
        </div>
      </footer>
    </div>
  )
}
