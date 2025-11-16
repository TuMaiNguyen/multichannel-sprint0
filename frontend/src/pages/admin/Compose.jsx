import { useState } from 'react'

function loadPosts(){ try{ return JSON.parse(localStorage.getItem('sh_posts')||'[]') }catch{ return [] } }
function savePosts(arr){ localStorage.setItem('sh_posts', JSON.stringify(arr)) }

export default function Compose() {
  const [form, setForm] = useState({
    title:'', channel:'Facebook', time:'', content:''
  })
  const [posts, setPosts] = useState(loadPosts())
  const [submitting, setSubmitting] = useState(false)

  function submit(e){
    e.preventDefault()
    setSubmitting(true)
    const next = [{ id: Date.now(), status:'scheduled', ...form }, ...posts]
    savePosts(next)
    setPosts(next)
    setForm({ title:'', channel:'Facebook', time:'', content:'' })
    setSubmitting(false)
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <form onSubmit={submit} className="md:col-span-1 space-y-3 bg-white p-4 rounded-2xl shadow-soft">
        <div className="text-lg font-semibold">Đăng bài bánh</div>
        <input className="input" placeholder="Tiêu đề" required
          value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <select className="input" value={form.channel} onChange={e=>setForm({...form,channel:e.target.value})}>
          <option>Facebook</option><option>Instagram</option><option>Zalo OA</option>
        </select>
        <input type="datetime-local" className="input" value={form.time}
          onChange={e=>setForm({...form,time:e.target.value})}/>
        <textarea className="input" rows="5" placeholder="Nội dung bài" required
          value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/>
        <button className="btn-primary" disabled={submitting}>
          {submitting ? 'Đang lưu…' : 'Lưu & lên lịch'}
        </button>
      </form>

      <div className="md:col-span-2 space-y-3">
        <div className="text-lg font-semibold">Bài đã soạn</div>
        {posts.length === 0 && <div className="rounded-2xl bg-white p-4 shadow-soft text-slate-500">Chưa có bài nào.</div>}
        {posts.map(p=>(
          <div key={p.id} className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs px-2 py-1 rounded bg-brand-100 text-brand-800">{p.status}</div>
            </div>
            <div className="text-slate-600 text-sm">{p.channel} • {p.time || 'Không hẹn giờ'}</div>
            <div className="mt-2">{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
