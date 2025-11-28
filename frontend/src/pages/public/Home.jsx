// frontend/src/pages/public/Home.jsx
import React from "react";

// Hero sử dụng ảnh cover Noel mới
import heroCover from "../../assets/home/cover-web.jpg";

// Sản phẩm mới (vẫn dùng 3 hình home-*)
import cheesecakeNew from "../../assets/home/home-cheesecake.jpg";
import tiramisuNew from "../../assets/home/home-tiramisu.jpg";
import matchaNew from "../../assets/home/home-matcha.jpg";

// Được nhiều khách hàng yêu thích
import mousseFav from "../../assets/home/home-mousse.jpg";
import traSuaFav from "../../assets/home/home-tra-sua.jpg";
import garlicBreadFav from "../../assets/menu/banh-mi-bo-toi.jpg";
import macaronFav from "../../assets/menu/macaron.jpg";
import donutFav from "../../assets/menu/donut.jpg";

const newProducts = [
  {
    id: 1,
    name: "Cheesecake dâu Sweet Heaven",
    description: "Bánh phô mai nướng mềm mịn, lớp dâu tây chua nhẹ, ngọt vừa.",
    price: "52.000 đ",
    image: cheesecakeNew,
  },
  {
    id: 2,
    name: "Tiramisu cacao lạnh",
    description:
      "Lớp mascarpone béo mịn, cacao phủ mặt, đậm hương cà phê Ý.",
    price: "45.000 đ",
    image: tiramisuNew,
  },
  {
    id: 3,
    name: "Matcha latte kem sữa",
    description:
      "Matcha Nhật xay lạnh, ngọt thanh, thêm kem sữa béo vừa phải.",
    price: "42.000 đ",
    image: matchaNew,
  },
];

const favoriteProducts = [
  {
    id: 1,
    name: "Mousse dâu tây",
    image: mousseFav,
    description: "Nhẹ, mát, chua ngọt cân bằng.",
    price: "49.000 đ",
  },
  {
    id: 2,
    name: "Trà sữa Sweet Heaven",
    image: traSuaFav,
    description: "Thơm trà, béo sữa, ít ngọt.",
    price: "39.000 đ",
  },
  {
    id: 3,
    name: "Bánh mì bơ tỏi phô mai",
    image: garlicBreadFav,
    description: "Kéo sợi phô mai, bơ tỏi thơm lừng.",
    price: "28.000 đ",
  },
  {
    id: 4,
    name: "Macaron mix vị",
    image: macaronFav,
    description: "Set 4 chiếc, đủ vị pastel xinh xắn.",
    price: "55.000 đ",
  },
  {
    id: 5,
    name: "Donut đường cổ điển",
    image: donutFav,
    description: "Chiên vàng giòn, phủ đường mịn.",
    price: "19.000 đ",
  },
];

export default function Home() {
  return (
    <main
      className="page page-home"
      style={{
        animation: "fadeIn 0.6s ease-out",
      }}
    >
      {/* HERO BANNER */}
      <section
        style={{
          padding: "40px 28px 36px",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #fff7f7 0%, #fdfaf5 40%, #f0fff4 100%)",
          borderRadius: "0 0 32px 32px",
        }}
      >
        {/* Text hero bên trái */}
        <div
          style={{
            flex: "1 1 340px",
            minWidth: "280px",
            maxWidth: "520px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            MÙA LỄ HỘI NGỌT NGÀO
          </p>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Merry Sweet Heaven 2025
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: "18px",
              lineHeight: 1.7,
            }}
          >
            Bộ sưu tập bánh và thức uống mùa lễ hội – được thiết kế riêng cho
            những buổi tiệc nhỏ ấm áp, cùng những chiếc hộp quà xinh xắn dành
            tặng người thương.
          </p>

          <ul
            style={{
              fontSize: "15px",
              color: "#374151",
              lineHeight: 1.8,
              paddingLeft: "20px",
            }}
          >
            <li>Combo Noel: mua 2 bánh, tặng 1 đồ uống bất kỳ.</li>
            <li>Nhận đặt bánh trang trí chữ theo yêu cầu.</li>
            <li>Giao hàng nội thành trong 30–45 phút.</li>
          </ul>
        </div>

        {/* Hình hero bên phải */}
        <div
          style={{
            flex: "1 1 360px",
            minWidth: "320px",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow:
                "0 25px 60px rgba(15, 23, 42, 0.25), 0 0 90px rgba(56, 189, 248, 0.25)",
              background:
                "radial-gradient(circle at 0% 0%, #fee2e2, transparent 55%), radial-gradient(circle at 100% 100%, #bfdbfe, transparent 55%)",
            }}
          >
            <img
              src={heroCover}
              alt="Bộ sưu tập Noel Sweet Heaven"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "18px",
                bottom: "16px",
                padding: "10px 14px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#065f46",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 0 4px rgba(34,197,94,0.35)",
                }}
              />
              Noel Special Menu 2025
            </div>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM MỚI */}
      <section
        style={{
          padding: "36px 28px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Sản phẩm mới
          </h2>
          <button
            type="button"
            style={{
              borderRadius: "999px",
              border: "1px solid #e5e7eb",
              padding: "6px 12px",
              fontSize: "13px",
              backgroundColor: "#ffffff",
              cursor: "default",
              color: "#6b7280",
            }}
          >
            Bộ sưu tập Noel 2025
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {newProducts.map((p) => (
            <article
              key={p.id}
              className="product-card"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "0 16px 40px rgba(148,163,184,0.22)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "230px",
                }}
                className="hover-zoom"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                  className="hover-zoom-img"
                />
              </div>
              <div
                style={{
                  padding: "14px 16px 16px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "6px",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4b5563",
                    lineHeight: 1.6,
                    marginBottom: "10px",
                    flex: 1,
                  }}
                >
                  {p.description}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#1d4ed8",
                    margin: 0,
                  }}
                >
                  {p.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ĐƯỢC NHIỀU KHÁCH HÀNG YÊU THÍCH */}
      <section
        style={{
          padding: "0 28px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Được nhiều khách hàng yêu thích
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {favoriteProducts.map((p) => (
            <article
              key={p.id}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "0 14px 36px rgba(148,163,184,0.2)",
                display: "flex",
                flexDirection: "column",
              }}
              className="hover-zoom"
            >
              <div
                style={{
                  height: "240px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                  className="hover-zoom-img"
                />
              </div>
              <div
                style={{
                  padding: "12px 14px 14px",
                }}
              >
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "4px",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#4b5563",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {p.description}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1d4ed8",
                    marginTop: "6px",
                  }}
                >
                  {p.price}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER THÔNG TIN CỬA HÀNG */}
      <footer
        style={{
          backgroundColor: "#020617",
          color: "#e5e7eb",
          padding: "28px",
          borderRadius: "24px 24px 0 0",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              flex: "1 1 260px",
              minWidth: "240px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Sweet Heaven Bakery
            </h3>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              123 Nguyễn Huệ, Quận 1, TP.HCM (địa chỉ minh họa cho đồ án môn học).
              <br />
              Điện thoại: 0857 346 510
              <br />
              Email: sweetheavenbakey@gmail.com
            </p>
          </div>

          <div
            style={{
              flex: "1 1 200px",
              minWidth: "200px",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              Giờ hoạt động
            </h4>
            <p
              style={{
                fontSize: "13px",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Thứ 2 – Chủ nhật: 8:00 – 21:30
              <br />
              Nhận đặt bánh theo yêu cầu trước tối thiểu 01 ngày.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(148,163,184,0.35)",
            marginTop: "18px",
            paddingTop: "10px",
            fontSize: "12px",
            color: "#9ca3af",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>© 2025 Sweet Heaven Bakery – Website đồ án NMCNPM.</span>
          <span>Team 14 – Mai (Leader/Dev), Thùy (Dev/Tester), Hân (BA/QA).</span>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-zoom:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </main>
  );
}
