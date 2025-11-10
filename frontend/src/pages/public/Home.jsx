import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'

export default function Home() {
  const [menu, setMenu] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    apiGet('menu').then(setMenu).catch(e => setErr(e.message))
  }, [])

  if (err) return <p style={{color:'red'}}>{err}</p>
  if (!menu) return <p>Đang tải menu…</p>

  return (
    <div>
      <h1>Sweet Heaven</h1>
      <ul>{menu.map((it,i)=><li key={i}>{it.name} — {it.price}</li>)}</ul>
    </div>
  )
}
