import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Menu from './pages/public/Menu.jsx'
import Feedback from './pages/public/Feedback.jsx'
import Contact from './pages/public/Contact.jsx'
import NotFound from './pages/public/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <div className="text-xl font-bold text-brand-700">Sweet Heaven</div>
          <nav className="flex gap-2">
            <NavLink to="/" end className="nav-link" data-active={({isActive})=>isActive}>Home</NavLink>
            <NavLink to="/menu" className="nav-link" data-active={({isActive})=>isActive}>Menu</NavLink>
            <NavLink to="/feedback" className="nav-link" data-active={({isActive})=>isActive}>Feedback</NavLink>
            <NavLink to="/contact" className="nav-link" data-active={({isActive})=>isActive}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto max-w-6xl p-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Sweet Heaven Bakery. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
