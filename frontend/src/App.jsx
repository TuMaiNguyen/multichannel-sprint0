import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Compose from './pages/Compose.jsx'
import Calendar from './pages/Calendar.jsx'
import Inbox from './pages/Inbox.jsx'
import Dashboard from './pages/Dashboard.jsx'

const navStyle = { display:'flex', gap:'12px', padding:'12px', borderBottom:'1px solid #eee' }
const container = { padding:'16px', fontFamily:'Inter, system-ui, Arial' }

export default function App(){
  return (
    <div style={container}>
      <nav style={navStyle}>
        <Link to="/compose">Soạn</Link>
        <Link to="/calendar">Lịch</Link>
        <Link to="/inbox">Inbox</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Compose/>} />
        <Route path="/compose" element={<Compose/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/inbox" element={<Inbox/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}
