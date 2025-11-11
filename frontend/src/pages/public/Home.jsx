export default function Home() {
  return (
    <section className="space-y-10">
      {/* HERO */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-100 via-brand-50 to-white p-8 shadow-soft">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Bánh tươi mỗi ngày — vị ngọt chuẩn thiên đường
            </h1>
            <p className="mt-3 text-slate-600">
              Nguyên liệu chọn lọc, công thức chuẩn Pháp. Đặt online — nhận ngay tại cửa hàng hoặc giao tận nơi.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#/menu" className="btn-primary">Xem Menu</a>
              <a href="#/feedback" className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 transition">
                Góp ý nhanh
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover"
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772"
              alt="Croissant"
            />
            <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-soft">
              <div className="text-sm text-slate-500">Ưu đãi tuần này</div>
              <div className="font-semibold text-brand-700">Combo 3 bánh bất kỳ -10%</div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER 3 CỘT */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {title:'Nguyên liệu chuẩn',desc:'Bơ, bột, sữa cao cấp — tốt cho sức khoẻ.',img:'https://images.unsplash.com/photo-1514511547117-f9c3d2d6f31e'},
          {title:'Nướng theo mẻ',desc:'Luôn ấm giòn, hạn chế tồn kho.',img:'https://images.unsplash.com/photo-1519682337058-a94d519337bc'},
          {title:'Giao nhanh',desc:'Đặt là có, ship nội thành trong 30 phút.',img:'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03'},
        ].map((b, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-soft">
            <img src={b.img} alt="" className="h-40 w-full object-cover"/>
            <div className="p-4">
              <div className="font-semibold">{b.title}</div>
              <p className="text-sm text-slate-600">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
