import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'

export default function Menu() {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    apiGet('menu').then(setData).catch(e => setErr(e.message))
  }, [])

  if (err) return <p style={{color:'red'}}>{err}</p>
  if (!data) return <p>Đang tải menu…</p>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
