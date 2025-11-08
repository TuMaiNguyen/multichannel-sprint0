import React, { useEffect, useState } from "react";
import { API_BASE } from "../../App";


export default function Feedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/feedback`).then((r) => r.json()).then(setData);
  }, []);

  return (
    <section className="space-y-4">
      <h3 className="font-display text-xl">Khách nói gì về Sweet Heaven</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((f) => (
          <blockquote key={f.id} className="card p-4">
            <p>“{f.text}”</p>
            <footer className="mt-2 text-sm text-cocoa/70">
              — {f.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
