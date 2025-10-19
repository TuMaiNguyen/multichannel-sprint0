import React, { useState } from 'react'
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export default function Inbox(){
  const [resp,setResp] = useState('')
  const simulate = async ()=>{
    const res = await fetch(`${API}/messages/webhook`,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ text: 'Cho hỏi GIA bao nhiêu?' })
    })
    const data = await res.json()
    setResp(JSON.stringify(data, null, 2))
  }
  return (
    <div>
      <h2>Inbox hợp nhất (mock)</h2>
      <button onClick={simulate}>Simulate message</button>
      <pre style={{background:'#f6f6f6', padding:12, marginTop:12}}>{resp}</pre>
    </div>
  )
}
