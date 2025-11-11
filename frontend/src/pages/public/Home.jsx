export default function Home() {
  const banners = [
    'https://images.unsplash.com/photo-1541167760496-1628856ab772',
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
    'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642',
    'https://images.unsplash.com/photo-1508737804141-4c3b688e2546',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    'https://images.unsplash.com/photo-1551022370-1b2d3f5f7f2a',
  ]

  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-3xl bg-white/70 backdrop-blur p-8 shadow-soft">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Sweet Heaven Bakery
            </h1>
            <p className="mt-3 text-slate-600 text-lg">
              Bánh tươi mỗi ngày — công thức chuẩn Pháp, nguyên liệu chọn lọc.
            </p>
            <ul className="mt-4 text-slate-700 list-disc list-inside space-y-1">
              <li>Combo 3 bánh bất kỳ giảm 10%</li>
              <li>Đặt trước online nhận tại cửa hàng trong 30 phút</li>
              <li>Giao nhanh nội thành</li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {banners.map((src, i) => (
              <img
                key={i}
                src={src}
                className={`rounded-2xl shadow-soft object-cover aspect-square ${i % 5 === 0 ? 'col-span-2' : ''}`}
                alt="Bánh tiệm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          {t:'Nguyên liệu chuẩn', d:'Bơ, bột, sữa cao cấp — tốt cho sức khoẻ.'},
          {t:'Nướng theo mẻ', d:'Luôn ấm giòn, hạn chế tồn kho.'},
          {t:'Giao nhanh', d:'Ship nội thành trong 30 phút.'},
        ].map((it, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="font-semibold">{it.t}</div>
            <div className="text-sm text-slate-600">{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
