export default function MenuCard({ item }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <div className="price">{item.price.toLocaleString("vi-VN")}đ</div>
    </div>
  );
}
