import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const Tab = ({ to, label, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full text-sm font-medium ${
          isActive ? 'bg-pink-200/80 text-pink-900' : 'bg-white hover:bg-slate-100'
        }`
      }
    >
      {label}
    </NavLink>
  )

  return (
    <section className="space-y-6">
      {/* Header khu Admin (không ảnh hưởng nền tổng) */}
      <div className="rounded-3xl p-6 shadow-soft"
           style={{background:'linear-gradient(180deg,#ffe1eb, #ffeaf1)'}}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white grid place-items-center">SH</div>
          <div>
            <div className="text-2xl font-extrabold">Sweet Heaven Bakery — Media Hub</div>
            <div className="text-slate-600 text-sm">Cổng truyền thông đa kênh cho chuỗi tiệm bánh</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Tab to="/admin" label="Dashboard" end />
          <Tab to="/admin/compose" label="Đăng bài" />
          <Tab to="/admin/calendar" label="Lịch xuất bản" />
          <Tab to="/admin/inbox" label="Tin nhắn KH" />
        </div>
      </div>

      <Outlet />
    </section>
  )
}
