import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'
import { vnd } from '../../lib/format'
import Loader from '../../components/Loader'
import ErrorBanner from '../../components/ErrorBanner'

function Card({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="aspect-square object-cover rounded-xl" />
      <div className="mt-3 font-semibold">{item.name}</div>
      <div className="text-slate-600 text-sm">{item.desc}</div>
      <div className="mt-auto pt-2 font-bold text-brand-700">{vnd(item.price)}</div>
    </div>
  )
}

export default function Menu() {
  const [st, setSt] = useState({ loading:true, error:'', data:[] })

  useEffect(() => {
    let ok = true
    apiGet('/menu').then(
      data => ok && setSt({ loading:false, error:'', data }),
      err => ok && setSt({ loading:false, error: err.message, data: [] })
    )
    return () => { ok = false }
  }, [])

  if (st.loading) return <Loader />
  if (st.error) return <ErrorBanner message={st.error} />

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Menu hôm nay</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {st.data.map(it => <Card key={it.id} item={it} />)}
      </div>
    </section>
  )
}
