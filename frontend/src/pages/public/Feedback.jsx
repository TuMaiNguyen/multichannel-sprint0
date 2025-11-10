import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";

export default function Feedback() {
  const [list, setList] = useState(null);
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", message:"" });
  const [ok, setOk] = useState("");

  const load = () => apiGet("/feedback?limit=3").then(setList).catch(e => setErr(e.message));

  useEffect(() => { load(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setOk(""); setSubmitting(true);
    try {
      if (!form.name.trim() || !form.message.trim()) throw new Error("Vui lòng nhập Tên và Nội dung");
      await apiPost("/feedback", form);
      setOk("Cảm ơn bạn! Feedback đã được ghi nhận.");
      setForm({ name:"", phone:"", message:"" });
      load();
    } catch (e) { setErr(e.message); }
    finally { setSubmitting(false); }
  }

  return (
    <>
      <h1>Feedback</h1>

      <form onSubmit={onSubmit} style={{background:"#fff8", padding:16, border:"1px solid #0001", borderRadius:12, boxShadow:"0 6px 20px #0000000d"}}>
        <div style={{display:"grid", gap:12}}>
          <label>Họ tên *<br/>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required
              style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #0002"}}/>
          </label>
          <label>Điện thoại<br/>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
              style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #0002"}}/>
          </label>
          <label>Nội dung *<br/>
            <textarea rows={4} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required
              style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #0002"}}/>
          </label>
          <button disabled={submitting} style={{padding:"10px 16px", borderRadius:10, border:"1px solid #0002", background:"#fff"}}>
            {submitting ? "Đang gửi…" : "Gửi phản hồi"}
          </button>
          {err && <ErrorBanner error={err} />}
          {ok && <p style={{color:"#0a7f2e", fontWeight:700}}>{ok}</p>}
        </div>
      </form>

      <h2 style={{marginTop:24}}>3 phản hồi gần đây</h2>
      {!list && !err && <Loader text="Đang tải feedback…" />}
      {list && list.length === 0 && <p className="muted">Chưa có phản hồi.</p>}
      {list && list.map(f => (
        <div key={f.id} className="card">
          <strong>{f.name}</strong> <span className="muted">({new Date(f.at).toLocaleString("vi-VN")})</span>
          <div>{f.message}</div>
        </div>
      ))}
    </>
  );
}
