import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'

function Stat({ k, v }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <div className="text-slate-500 text-sm">{k}</div>
      <div className="text-2xl font-extrabold mt-1">{v}</div>
    </div>
  )
}

export default function Dashboard() {
  const [menuCount, setMenuCount] = useState(0)
  const [fbCount, setFbCount] = useState(0)
  const [postCount, setPostCount] = useState(0)

  useEffect(() => {
    apiGet('/menu').then(d => setMenuCount(d.length)).catch(()=>{})
    apiGet('/feedback').then(d => setFbCount(d.length)).catch(()=>{})
    const posts = JSON.parse(localStorage.getItem('sh_posts') || '[]')
    setPostCount(posts.length)
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Stat k="Số món trong menu" v={menuCount} />
      <Stat k="Tổng góp ý" v={fbCount} />
      <Stat k="Bài viết đã soạn" v={postCount} />
    </div>
  )
}
