import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'
import Loader from '../../components/Loader'
import ErrorBanner from '../../components/ErrorBanner'

export default function Inbox() {
  const [st, setSt] = useState({ loading: true, error: '', data: [] })

  useEffect(() => {
    apiGet('/feedback')
      .then(d => setSt({ loading: false, error: '', data: d }))
      .catch(e => setSt({ loading: false, error: e.message, data: [] }))
  }, [])

  if (st.loading) return <Loader />
  if (st.error) return <ErrorBanner message={st.error} />

  return (
    <div className="space-y-3">
      {st.data.map((fb, i) => (
        <div key={i} className="rounded-2xl bg-white p-4 shadow-soft">
          <div className="font-semibold">{fb.name}</div>
          <div className="text-sm text-slate-600">
            {new Date(fb.at).toLocaleString('vi-VN')}
          </div>
          <div className="mt-1">{fb.message}</div>
        </div>
      ))}
    </div>
  )
}
