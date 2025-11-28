// frontend/src/pages/public/Home.jsx
import React from "react";

// IMPORT 6 HÌNH HOME MỚI
import img1 from "../../assets/home/home-croissant.jpg";
import img2 from "../../assets/home/home-tiramisu.jpg";
import img3 from "../../assets/home/home-tra-sua.jpg";
import img4 from "../../assets/home/home-mousse.jpg";
import img5 from "../../assets/home/home-cheesecake.jpg";
import img6 from "../../assets/home/home-matcha.jpg";

export default function Home() {
  return (
    <main
      className="page page-home"
      style={{
        animation: "fadeIn 0.8s ease-out",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          padding: "48px 28px 60px",
          alignItems: "center",
        }}
      >
        {/* TEXT BÊN TRÁI */}
        <div
          style={{
            flex: "1 1 340px",
            maxWidth: "520px",
            animation: "slideInLeft 0.9s ease",
          }}
        >
          <h1
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Sweet Heaven Bakery
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#4b5563",
              marginBottom: "18px",
              lineHeight: 1.6,
            }}
          >
            Nơi mỗi chiếc bánh đều được chăm chút tỉ mỉ — từ nguyên liệu chọn lọc,
            công thức chuẩn Pháp đến hương vị ngọt ngào khiến bạn nhớ mãi.
          </p>

          <ul
            style={{
              fontSize: "15px",
              color: "#374151",
              lineHeight: 1.8,
              paddingLeft: "20px",
            }}
          >
            <li>Giảm ngay 10% cho combo 3 bánh bất kỳ</li>
            <li>Đặt online – nhận bánh trong vòng 30 phút</li>
            <li>Giao nhanh nội thành TP.HCM</li>
          </ul>
        </div>

        {/* GRID HÌNH BÊN PHẢI */}
        <div
          style={{
            flex: "1 1 360px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
            minWidth: "360px",
          }}
        >
          {[img1, img2, img3, img4, img5, img6].map((img, index) => (
            <div
              key={index}
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                height: "140px",
                animation: `fadeUp 0.8s ease ${index * 0.1}s`,
              }}
              className="hover-zoom"
            >
              <img
                src={img}
                alt={`Bakery item ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                className="hover-zoom-img"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ANIMATION CSS INLINE */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-zoom:hover img {
          transform: scale(1.07);
        }
      `}</style>
    </main>
  );
}
