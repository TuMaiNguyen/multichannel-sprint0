// frontend/src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

export default function Dashboard() {
  const [kpi, setKpi] = useState(null);
  useEffect(()=>{ apiGet("/kpi").then(setKpi).catch(console.error); }, []);
  if (!kpi) return <div className="p-4">Đang tải KPI…</div>;

  const cards = [
    ["Bài đã lên lịch", kpi.scheduled],
    ["Bản nháp", kpi.draft],
    ["Tin nhắn hôm nay", kpi.messagesToday],
    ["Engagement rate", `${kpi.engagementRate}%`]
  ];

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      {cards.map(([label, val]) => (
        <div key={label} className="rounded-xl p-5 bg-white/70 shadow">
          <div className="text-gray-600">{label}</div>
          <div className="text-3xl font-semibold">{val}</div>
        </div>
      ))}
    </div>
  );
}
