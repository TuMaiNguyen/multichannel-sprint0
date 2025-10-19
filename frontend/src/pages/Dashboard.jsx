import React, { useEffect, useState } from 'react'
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
export default function Dashboard(){
  const [rows,setRows] = useState([])
  useEffect(()=>{
    fetch(`${API}/kpi?channel=facebook&range=7d`).then(r=>r.json()).then(d=> setRows(d.data || []))
  },[])
  return (
    <div>
      <h2>Dashboard KPI (mock)</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>Ngày</th><th>Reach</th><th>ER</th><th>Response time (h)</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(<tr key={i}><td>{r.date}</td><td>{r.reach}</td><td>{r.er}</td><td>{r.response_time}</td></tr>))}
        </tbody>
      </table>
    </div>
  )
}
