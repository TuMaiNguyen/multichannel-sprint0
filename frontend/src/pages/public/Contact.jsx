import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'
import Loader from '../../components/Loader'
import ErrorBanner from '../../components/ErrorBanner'

export default function Contact() {
  const [st, setSt] = useState({ loading:true, error:'', data:null })

  useEffect(() => {
    apiGet('/contact').then(
      data => setSt({ loading:false, error:'', data }),
      err => setSt({ loading:false, error: err.message, data: null })
    )
  }, [])

  if (st.loading) return <Loader />
  if (st.error) return <ErrorBanner message={st.error} />

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-bold">Cơ sở Sweet Heaven</h2>
      <div><span className="font-medium">Địa chỉ:</span> {st.data.address}</div>
      <div><span className="font-medium">Điện thoại:</span> {st.data.phone}</div>
      <div><span className="font-medium">Giờ mở cửa:</span> {st.data.open}</div>
    </section>
  )
}
