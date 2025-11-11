import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../../lib/api'
import Loader from '../../components/Loader'
import ErrorBanner from '../../components/ErrorBanner'

export default function Feedback() {
  const [st, setSt] = useState({ loading:true, error:'', data:[] })
  const [form, setForm] = useState({ name:'', message:'' })
  const [submitting, setSubmitting] = useState(false)

  const load = () =>
    apiGet('/feedback').then(
      data => setSt({ loading:false, error:'', data }),
      err => setSt({ loading:false, error: err.message, data: [] })
    )

  useEffect(() => { load() }, [])

  async function onSubmit(e){
    e.preventDefault()
    setSubmitting(true)
    try {
      await apiPost('/feedback', form)
      setForm({ name:'', message:'' })
      await load()
    } catch (e) {
      setSt(s => ({ ...s, error: e.message }))
    } finally {
      setSubmitting(false)
    }
  }

  if (st.loading) return <Loader />

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        {st.error && <ErrorBanner message={st.error} />}
        {st.data.map((fb, i) => (
          <div key={i} className="rounded-2xl bg-white p-3 shadow-soft">
            <div className="font-medium">{fb.name}</div>
            <div className="text-sm text-slate-600">{fb.message}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded-2xl shadow-soft">
        <div className="text-lg font-semibold">Gửi góp ý</div>
        <input className="input" placeholder="Tên của bạn" required
          value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <textarea className="input" rows="4" placeholder="Nội dung góp ý" required
          value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
        <button className="btn-primary" disabled={submitting}>
          {submitting ? 'Đang gửi…' : 'Gửi góp ý'}
        </button>
      </form>
    </div>
  )
}
