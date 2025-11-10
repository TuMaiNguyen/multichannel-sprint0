import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorBanner from "../../components/ErrorBanner";
import MenuCard from "../../components/MenuCard";

export default function Menu() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    apiGet("/menu").then(setItems).catch(e => setErr(e.message));
  }, []);

  if (err) return <ErrorBanner error={err} />;
  if (!items) return <Loader text="Đang tải menu…" />;

  return (
    <>
      <h1>Menu</h1>
      <div className="grid">
        {items.map(i => <MenuCard key={i.id} item={i} />)}
      </div>
    </>
  );
}
