import { NavLink, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Sweet Heaven Bakery</h1>
      <p className="text-slate-600">Bánh tươi mỗi ngày — vị ngọt chuẩn thiên đường.</p>
      <div className="flex gap-3">
        <a href="#/menu" className="px-5 py-2.5 rounded-xl bg-brand-600 text-white">Xem Menu</a>
        <a href="#/feedback" className="px-5 py-2.5 rounded-xl border">Góp ý nhanh</a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
          <div className="text-xl font-bold text-brand-700">Sweet Heaven</div>
          <nav className="flex gap-2">
            {[
              {to:'/', label:'Home', end:true},
              {to:'/menu', label:'Menu'},
              {to:'/feedback', label:'Feedback'},
              {to:'/contact', label:'Contact'},
            ].map(({to,label,end}) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({isActive}) =>
                  `nav-link ${isActive ? 'bg-brand-100 text-brand-800' : 'hover:bg-slate-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="menu" element={<div>Trang Menu</div>} />
          <Route path="feedback" element={<div>Trang Feedback</div>} />
          <Route path="contact" element={<div>Trang Contact</div>} />
          <Route path="*" element={<div className="py-10">404 - Không tìm thấy trang</div>} />
        </Routes>
      </main>
    </div>
  )
}
