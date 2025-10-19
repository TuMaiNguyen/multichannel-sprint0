import React, { useState } from 'react'
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export default function Compose(){
  const [title,setTitle] = useState('Bài demo Sprint 0')
  const [channel,setChannel] = useState('facebook')
  const [msg,setMsg] = useState('')
  const [time,setTime] = useState(()=> new Date().toISOString().slice(0,16))

  const schedule = async ()=>{
    setMsg('Đang gửi...')
    const res = await fetch(`${API}/schedule`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ title, channel, scheduledAt: new Date(time).toISOString() })
    })
    const data = await res.json()
    setMsg(data.ok ? `OK: ${data.id} (${data.scheduledAt})` : 'Lỗi')
  }

  return (
    <div>
      <h2>Soạn & Lên lịch</h2>
      <div style={{display:'grid', gap:8, maxWidth:520}}>
        <label>Tiêu đề
          <input value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%'}}/>
        </label>
        <label>Kênh
          <select value={channel} onChange={e=>setChannel(e.target.value)}>
            <option value="facebook">Facebook</option>
            <option value="zalo">Zalo</option>
          </select>
        </label>
        <label>Giờ đăng
          <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)}/>
        </label>
        <button onClick={schedule}>Schedule</button>
        <div>{msg}</div>
      </div>
    </div>
  )
}
