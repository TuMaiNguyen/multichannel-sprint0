import React from "react";

export default function Contact() {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="font-display text-xl mb-2">Liên hệ & Đặt bánh</h3>
        <form className="space-y-3">
          <input
            className="card w-full px-4 py-3"
            placeholder="Tên của bạn"
          />
          <input
            className="card w-full px-4 py-3"
            placeholder="Số điện thoại"
          />
          <textarea
            className="card w-full px-4 py-3"
            rows="4"
            placeholder="Yêu cầu bánh, thời gian nhận…"
          />
          <button type="button" className="btn">
            Gửi yêu cầu
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h3 className="font-display text-xl mb-2">Cửa hàng</h3>
        <p>123 Đường Pastel, Quận 1, TP.HCM</p>
        <p className="text-cocoa/70">Mở cửa 8:00–21:00 (T2–CN)</p>
        <div className="mt-4 h-64 rounded-xl bg-mint/40 flex items-center justify-center">
          Bản đồ (sẽ nhúng sau)
        </div>
      </div>
    </section>
  );
}
