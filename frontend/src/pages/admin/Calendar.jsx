function loadPosts(){ try{ return JSON.parse(localStorage.getItem('sh_posts')||'[]') }catch{ return [] } }

export default function Calendar() {
  const posts = loadPosts().filter(p => p.time)

  if (posts.length === 0)
    return (
      <div className="rounded-2xl bg-white p-6 shadow-soft text-slate-600">
        Chưa có bài hẹn giờ. Vào <a href="#/admin/compose" className="text-brand-700 underline">Đăng bài</a> để thêm lịch.
      </div>
    )

  return (
    <div className="space-y-3">
      {posts.sort((a,b)=>a.time.localeCompare(b.time)).map(p=>(
        <div key={p.id} className="rounded-2xl bg-white p-4 shadow-soft">
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-slate-600">{p.channel} • {new Date(p.time).toLocaleString('vi-VN')}</div>
          <div className="mt-1">{p.content}</div>
        </div>
      ))}
    </div>
  )
}
